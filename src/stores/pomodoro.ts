import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

import { MODES } from '@/config/app'
import { KEYS } from '@/config/localStorage'

import { AvailableModesEnum, type DailyStats, type Streak } from '@/types'

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    modes: MODES,
    currentModeId: useStorage(KEYS.CURRENT_MODE_ID, 0),

    streaks: useStorage(KEYS.STREAKS, [] as Streak[]),
    short_breaks_in_row: useStorage(KEYS.SHORT_BREAKS_IN_ROW, 0),

    // daily stats
    daily_stats: useStorage(KEYS.DAILY_STATS, {} as DailyStats)
  }),
  getters: {
    getCurrentModeValue: (store) => store.modes[store.currentModeId].value,
    currentModeName: (store) => store.modes[store.currentModeId].name,
    isCurrentModePomodoro: (store) => store.currentModeId === 0,

    getAllDailyStats: (store) => store.daily_stats,
    getStatsByDate: (store) => (date: string) => {
      const dateIndex = new Date(date).toDateString()
      return store.daily_stats[dateIndex] || null
    },
    getTotalHammers: (store) => {
      return Object.values(store.daily_stats).reduce((acc, curr) => {
        return acc + curr.hammer
      }, 0)
    },
    getTotalHammerTimes: (store) => {
      let _duration = 0
      Object.values(store.daily_stats).forEach((item) => {
        item.durations?.forEach((duration) => {
          _duration += duration
        })
      })
      return _duration
    },
    getTotalHammerDays: (store) => {
      return Object.keys(store.daily_stats).length
    }
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

    incrementStats(start: Date) {
      this._incrementDailyStats(start)
    },

    _incrementDailyStats(start: Date) {
      const today = new Date().toDateString() // 'Mon Aug 09 2021'

      // if today's stats don't exist, create it
      if (!this.daily_stats[today]) {
        this.daily_stats[today] = {
          id: today,
          hammer: 0,
          short_break: 0,
          long_break: 0,
          periods: [],
          durations: []
        }
      }

      this.daily_stats[today][this.getCurrentModeValue] += 1

      // if finished mode is 'hammer', also add its period and duration
      if (this.getCurrentModeValue === AvailableModesEnum.hammer) {
        this.daily_stats[today].periods.push({
          start,
          end: new Date()
        })

        // calculate duration (in minutes) of the last period
        const duration = Math.round((new Date().getTime() - start.getTime()) / 60000)

        this.daily_stats[today].durations.push(duration)
      }
    }
  }
})
