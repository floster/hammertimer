import { defineStore, acceptHMRUpdate } from 'pinia'

import { useTasksStore } from '@/stores/tasks'

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

      // set all timer states (started, paused, resumed, reseted) to false
      this.resetTimer()

      tasksStore.activeTaskIncreaseCompletedQty()

      // FIXME:
      // increases finished pomodoro status by 1
      // incrementStatistic()
      // setNextModeId()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimerStore, import.meta.hot))
}
