import { defineStore } from 'pinia'

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    modes: [
      { id: 0, name: 'Pomodoro', value: 'pomodoro', duration: 1 },
      { id: 1, name: 'Break', value: 'short_break', duration: 5 },
      { id: 2, name: 'Long Break', value: 'long_break', duration: 15 }
    ],
    currentModeId: 0,

    statistic: {
      pomodoro: 0,
      short_break: 0,
      long_break: 0
    }
  }),
  getters: {
    _getNextModeId: (store) => {
      if (store.currentModeId === 0) return 1
      if (store.currentModeId === 1) return 2
      if (store.currentModeId === 2) return 0
    },
    _getCurrentModeValue: (store) => store.modes[store.currentModeId].value,
    currentModeDuration: (store) => store.modes[store.currentModeId].duration
  },
  actions: {
    setNextModeId() {
      this.currentModeId = this._getNextModeId
    },

    incrementStatistic() {
      this.statistic[this._getCurrentModeValue]++
    }
  }
})
