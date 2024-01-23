import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Ref } from 'vue'

import { useTasksStore } from '@/stores/tasks'
import { useSettingsStore } from '@/stores/settings'
import { usePomodoroStore } from '@/stores/pomodoro'

import { useTimer } from 'vue-timer-hook'
import type { UseTimer } from 'vue-timer-hook'
import { SECONDS_IN_MINUTE } from '@/config/app'

const _getTimerDuration = (duration: number) =>
  new Date().setSeconds(new Date().getSeconds() + duration * SECONDS_IN_MINUTE)

export const useTimerStore = defineStore('timer', {
  state: () => ({
    _instance: null as Ref<UseTimer> | null,
    started: false,
    paused: false
  }),
  getters: {
    getInstance: (store) => store._instance,
    isRunning: (store) => !!store._instance?.isRunning,
    isFinished: (store) => !!store._instance?.isExpired,
    isStarted: (store) => store.started,
    isPaused: (store) => store.paused,
    isActive: (store) => store.started && !store.paused,
    minutes: (store) => store._instance?.minutes,
    seconds: (store) => store._instance?.seconds
  },
  actions: {
    _setTimer(time: number) {
      this._instance = useTimer(_getTimerDuration(time), false)
    },
    createTimer() {
      const settingsStore = useSettingsStore()
      this._setTimer(settingsStore.getCurrentDuration)
    },
    start() {
      this.getInstance?.start()
      this.started = true
      console.log('started')
    },
    pause() {
      this.getInstance?.pause()
      this.paused = true
      console.log('paused')
    },
    resume() {
      this.getInstance?.resume()
      this.paused = false
    },
    toggle() {
      if (this.isStarted) {
        if (this.isPaused) {
          this.resume()
        } else {
          this.pause()
        }
      } else {
        this.start()
      }
    },
    reset() {
      this.createTimer()
      this.started = false
      this.paused = false
    },
    onTimerFinished() {
      const tasksStore = useTasksStore()
      const pomodoroStore = usePomodoroStore()
      const settingsStore = useSettingsStore()

      tasksStore.activeTaskIncreaseCompletedQty()

      // increases finished pomodoro status by 1
      pomodoroStore.incrementStatistic()

      // if current mode is 'short_break' then increment short_breaks_in_row
      pomodoroStore.incrementShortBreaksInRow()

      pomodoroStore.addStreak(pomodoroStore.getCurrentModeValue)

      this.started = false
      this.paused = false

      // set next mode as current...
      pomodoroStore.setNextModeId()

      // ...and if autoNextMode is enabled, then immediately start timer
      if (settingsStore.autoNextMode) {
        // TODO: fix this hack and find its cause
        setTimeout(() => this.start(), 1000)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimerStore, import.meta.hot))
}
