import { defineStore } from 'pinia'

import type { AvailableModes } from '@/types'

interface Mode {
  id: number
  name: string
  value: AvailableModes
}

type Statistic = {
  [key in AvailableModes]: number
}

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    modes: [
      { id: 0, name: 'Pomodoro', value: 'pomodoro' },
      { id: 1, name: 'Break', value: 'short_break' },
      { id: 2, name: 'Long Break', value: 'long_break' }
    ] as Mode[],
    currentModeId: 0,

    statistic: {
      pomodoro: 0,
      short_break: 0,
      long_break: 0
    } as Statistic
  }),
  getters: {
    _getNextModeId: (store) => {
      if (store.currentModeId === 0) return 1
      if (store.currentModeId === 1) return 2
      return 0
    },
    getCurrentModeValue: (store) => store.modes[store.currentModeId].value,
    currentModeName: (store) => store.modes[store.currentModeId].name
  },
  actions: {
    setNextModeId() {
      this.currentModeId = this._getNextModeId
    },

    incrementStatistic() {
      this.statistic[this.getCurrentModeValue] += 1
    }
  }
})
