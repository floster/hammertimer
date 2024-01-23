import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

import { MODES } from '@/config/app'
import { KEYS } from '@/config/localStorage'

import { AvailableModesEnum, type Statistic, type Streak } from '@/types'

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    modes: MODES,
    currentModeId: useStorage(KEYS.CURRENT_MODE_ID, 0),

    streaks: useStorage(KEYS.STREAKS, [] as Streak[]),
    short_breaks_in_row: useStorage(KEYS.SHORT_BREAKS_IN_ROW, 0),

    statistic: useStorage(KEYS.STATISTIC, {
      hammer: 0,
      short_break: 0,
      long_break: 0
    } as Statistic)
  }),
  getters: {
    getCurrentModeValue: (store) => store.modes[store.currentModeId].value,
    currentModeName: (store) => store.modes[store.currentModeId].name,
    isCurrentModePomodoro: (store) => store.currentModeId === 0
  },
  actions: {
    setNextModeId() {
      if (this.currentModeId === 0) {
        if (this.short_breaks_in_row === 3) {
          this._resetShortBreaksInRow()
          this.currentModeId = 2 // 'long_break'
        } else {
          this.currentModeId = 1 // 'short_break'
        }
      } else {
        this.currentModeId = 0 // 'hammer'
      }
    },

    addStreak(type: AvailableModesEnum) {
      this.streaks.push({ id: this.streaks.length, type })
    },
    resetStreaks() {
      this.streaks = []
    },

    incrementShortBreaksInRow() {
      if (this.currentModeId !== 1) return
      this.short_breaks_in_row += 1
    },
    _resetShortBreaksInRow() {
      this.short_breaks_in_row = 0
    },

    incrementStatistic() {
      this.statistic[this.getCurrentModeValue] += 1
    }
  }
})
