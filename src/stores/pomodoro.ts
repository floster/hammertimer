import { defineStore, acceptHMRUpdate } from 'pinia'
import { useStorage } from '@vueuse/core'

import { MODES } from '@/config/app'
import { KEYS } from '@/config/localStorage'
import { ModeIdsEnum, AvailableModesEnum, type Streak } from '@/types'

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    modes: MODES,
    currentModeId: useStorage<ModeIdsEnum>(KEYS.CURRENT_MODE_ID, ModeIdsEnum.hammer),

    streaks: useStorage(KEYS.STREAKS, [] as Streak[]),
    short_breaks_in_row: useStorage(KEYS.SHORT_BREAKS_IN_ROW, 0)
  }),
  getters: {
    getCurrentModeValue: (store) => store.modes[store.currentModeId].value,
    currentModeName: (store) => store.modes[store.currentModeId].name,
    isCurrentModePomodoro: (store) => store.currentModeId === 0
  },
  actions: {
    setModeId(id: number) {
      this.currentModeId = id
    },
    setNextModeId() {
      if (this.isCurrentModePomodoro) {
        if (this.short_breaks_in_row === 3) {
          this._resetShortBreaksInRow()
          this.setModeId(ModeIdsEnum.long_break) // 'long_break'
        } else {
          this.setModeId(ModeIdsEnum.short_break) // 'short_break'
        }
      } else {
        this.setModeId(ModeIdsEnum.hammer) // 'hammer'
      }
    },

    /**
     * Streaks
     */
    addStreak(type: AvailableModesEnum) {
      this.streaks.push({ id: this.streaks.length, type })
    },
    resetStreaks() {
      this.streaks = []
    },

    /**
     * Short breaks in row
     */
    incrementShortBreaksInRow() {
      if (this.currentModeId !== 1) return
      this.short_breaks_in_row += 1
    },
    _resetShortBreaksInRow() {
      this.short_breaks_in_row = 0
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePomodoroStore, import.meta.hot))
}
