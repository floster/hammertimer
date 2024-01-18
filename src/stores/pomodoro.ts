import { defineStore } from 'pinia'

/**
  Local storage
 */
import useLocalStorage from '@/composables/localStorage'
const { set, get } = useLocalStorage()
import { KEYS } from '@/config/localStorage'

import { AvailableModesEnum } from '@/types'

import { MODES } from '@/config/app'

interface Streak {
  id: number
  type: AvailableModesEnum
}

type Statistic = {
  [key in AvailableModesEnum]: number
}

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    modes: MODES,
    currentModeId: 0,

    streaks: [] as Streak[],
    short_breaks_in_row: 0,

    statistic: {
      hammer: 0,
      short_break: 0,
      long_break: 0
    } as Statistic
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
      set(KEYS.CURRENT_MODE_ID, this.currentModeId)
    },
    getCurrentModeIdFromLocalStorage() {
      const currentModeId = get(KEYS.CURRENT_MODE_ID)
      if (currentModeId) this.currentModeId = currentModeId
    },

    addStreak(type: AvailableModesEnum) {
      this.streaks.push({ id: this.streaks.length, type })
      set(KEYS.STREAKS, this.streaks)
    },
    resetStreaks() {
      this.streaks = []
      set(KEYS.STREAKS, this.streaks)
    },
    getStreaksFromLocalStorage() {
      const streaks = get(KEYS.STREAKS)
      if (streaks) this.streaks = streaks
    },

    incrementShortBreaksInRow() {
      if (this.currentModeId !== 1) return
      this.short_breaks_in_row += 1
      set(KEYS.SHORT_BREAKS_IN_ROW, this.short_breaks_in_row)
    },
    _resetShortBreaksInRow() {
      this.short_breaks_in_row = 0
      set(KEYS.SHORT_BREAKS_IN_ROW, this.short_breaks_in_row)
    },
    getShortBreaksInRowFromLocalStorage() {
      const short_breaks_in_row = get(KEYS.SHORT_BREAKS_IN_ROW)
      if (short_breaks_in_row) this.short_breaks_in_row = short_breaks_in_row
    },

    incrementStatistic() {
      this.statistic[this.getCurrentModeValue] += 1
      set(KEYS.STATISTIC, this.statistic)
    },
    getStatisticFromLocalStorage() {
      const statistic = get(KEYS.STATISTIC)
      if (statistic) this.statistic = statistic
    }
  }
})
