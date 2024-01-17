import { defineStore } from 'pinia'

import type { AvailableModes } from '@/types'

interface Mode {
  id: number
  name: string
  value: AvailableModes
}

interface Streak {
  id: number
  type: AvailableModes
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

    streaks: [] as Streak[],
    short_breaks_in_row: 0,

    statistic: {
      pomodoro: 0,
      short_break: 0,
      long_break: 0
    } as Statistic
  }),
  getters: {
    _getNextModeId: (store) => {
      if (store.currentModeId === 0) {
        if (store.short_breaks_in_row === 3) {
          store.short_breaks_in_row = 0
          return 2 // 'long_break'
        }
        return 1 // 'short_break'
      }
      return 0 // 'pomodoro'
    },
    getCurrentModeValue: (store) => store.modes[store.currentModeId].value,
    currentModeName: (store) => store.modes[store.currentModeId].name,
    isCurrentModePomodoro: (store) => store.currentModeId === 0
  },
  actions: {
    setNextModeId() {
      this.currentModeId = this._getNextModeId
    },

    addStreak(type: AvailableModes) {
      this.streaks.push({ id: this.streaks.length, type })
    },

    incrementShortBreaksInRow() {
      if (this.currentModeId !== 1) return
      this.short_breaks_in_row += 1
    },

    incrementStatistic() {
      this.statistic[this.getCurrentModeValue] += 1
    }
  }
})
