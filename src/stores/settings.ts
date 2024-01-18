import { defineStore } from 'pinia'
import { usePomodoroStore } from '@/stores/pomodoro'

/**
  Local storage
 */
import useLocalStorage from '@/composables/localStorage'
const { set, get } = useLocalStorage()
import { KEYS } from '@/config/localStorage'

import { AvailableModesEnum } from '@/types'

type Durations = {
  [key in AvailableModesEnum]: number
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // <dialog> instance will be here, after that we can use
    // dialog's methods like .showModal() and .close() in actions
    instance: null as HTMLDialogElement | null,

    // App settings
    durations: {} as Durations,
    autoNextMode: false,
    longBreakInterval: 4
  }),
  getters: {
    getDuration: (store) => (mode: AvailableModesEnum) => store.durations[mode],
    getCurrentDuration: (store) => {
      const pomodoroStore = usePomodoroStore()
      return store.durations[pomodoroStore.getCurrentModeValue]
    },
    getLongBreakInterval: (store) => store.longBreakInterval,
    getAutoNextMode: (store) => store.autoNextMode
  },
  actions: {
    /**
     settings modal dialog
    */
    setInstance(instance: HTMLDialogElement) {
      this.instance = instance
    },
    openSettings() {
      this.instance?.showModal()
    },
    closeSettings() {
      this.instance?.close()
    },

    setDuration(mode: AvailableModesEnum, duration: number) {
      this.durations[mode] = duration
      set(KEYS.DURATIONS, this.durations)
    },
    getDurationsFromLocalStorage() {
      const durations = get(KEYS.DURATIONS)
      if (durations) this.durations = durations
    },

    toggleAutoNextMode() {
      this.autoNextMode = !this.autoNextMode
      set(KEYS.AUTO_NEXT_MODE, this.autoNextMode)
    },
    getAutoNextModeFromLocalStorage() {
      const autoNextMode = get(KEYS.AUTO_NEXT_MODE)
      if (autoNextMode) this.autoNextMode = autoNextMode
    },

    setLongBreakInterval(value: number) {
      this.longBreakInterval = value
      set(KEYS.LONG_BREAK_INTERVAL, this.longBreakInterval)
    },
    getLongBreakIntervalFromLocalStorage() {
      const longBreakInterval = get(KEYS.LONG_BREAK_INTERVAL)
      if (longBreakInterval) this.longBreakInterval = longBreakInterval
    }
  }
})
