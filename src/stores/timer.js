import { defineStore, acceptHMRUpdate } from 'pinia'

import { useTasksStore } from '@/stores/tasks'
import { usePomodoroStore } from '@/stores/pomodoro'

export const useTimerStore = defineStore('timer', {
  state: () => ({
    timerStarted: false,
    timerPaused: false,
    timerResumed: false,
    timerReseted: false
  }),
  getters: {},
  actions: {
    _startTimer() {
      this.timerStarted = true
      this.timerReseted = false
    },
    _pauseTimer() {
      this.timerResumed = false
      this.timerPaused = true
    },
    _resumeTimer() {
      this.timerResumed = true
      this.timerPaused = false
    },
    toggleTimer() {
      if (!this.timerStarted) {
        this._startTimer()
      } else {
        if (!this.timerPaused) {
          this._pauseTimer()
        } else {
          this._resumeTimer()
        }
      }
    },
    resetTimer() {
      this.timerStarted = false
      this.timerPaused = false
      this.timerResumed = false
      this.timerReseted = true
    },
    onTimerFinished() {
      const tasksStore = useTasksStore()
      const pomodoroStore = usePomodoroStore()

      // set all timer states (started, paused, resumed, reseted) to false
      this.resetTimer()

      tasksStore.activeTaskIncreaseCompletedQty()

      // increases finished pomodoro status by 1
      pomodoroStore.incrementStatistic()
      pomodoroStore.setNextModeId()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimerStore, import.meta.hot))
}
