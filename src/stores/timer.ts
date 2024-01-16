import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Ref } from 'vue'

import { useTasksStore } from '@/stores/tasks'
import { useSettingsStore } from '@/stores/settings'
import { usePomodoroStore } from '@/stores/pomodoro'

import { useTimer } from 'vue-timer-hook'
import type { UseTimer } from 'vue-timer-hook'

const _getTimerDuration = (duration: number) =>
  new Date().setSeconds(new Date().getSeconds() + duration * 60)

export const useTimerStore = defineStore('timer', {
  state: () => ({
    _instance: null as Ref<UseTimer> | null,
    started: false,
    paused: false
  }),
  getters: {
    getInstance: (store) => store._instance,
    isRunning: (store) => !!store._instance?.isRunning,
    isStarted: (store) => store.started,
    isPaused: (store) => store.paused,
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
    },
    pause() {
      this.getInstance?.pause()
      this.paused = true
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

      // set all timer states (started, paused, resumed, reseted) to false
      this.reset()

      tasksStore.activeTaskIncreaseCompletedQty()

      // increases finished pomodoro status by 1
      pomodoroStore.incrementStatistic()

      // set next mode as current...
      pomodoroStore.setNextModeId()
      // ...and if autoNextMode is enabled, then immediately start timer
      // this.start()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimerStore, import.meta.hot))
}
