import { defineStore, acceptHMRUpdate } from 'pinia'
import { usePomodoroStore } from '@/stores/pomodoro'
import { useStorage } from '@vueuse/core'

import { DEFAULTS } from '@/config/app'
import { KEYS } from '@/config/localStorage'

import { AvailableModesEnum } from '@/types'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // <dialog> instance will be here, after that we can use
    // dialog's methods like .showModal() and .close() in actions
    instance: null as HTMLDialogElement | null,

    // App settings
    durations: useStorage(KEYS.DURATIONS, DEFAULTS.DURATIONS),
    autoNextMode: useStorage(KEYS.AUTO_NEXT_MODE, DEFAULTS.AUTO_NEXT_MODE),
    longBreakInterval: useStorage(KEYS.LONG_BREAK_INTERVAL, DEFAULTS.LONG_BREAK_INTERVAL),
    playSoundOnFinish: false,

    // App shortcuts
    showShortcutsTipInHeader: true
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
    },

    toggleAutoNextMode() {
      this.autoNextMode = !this.autoNextMode
    },

    setLongBreakInterval(value: number) {
      this.longBreakInterval = value
    },

    togglePlaySoundOnFinish() {
      this.playSoundOnFinish = !this.playSoundOnFinish
    },

    setShortcutsTipInHeader(value: boolean) {
      this.showShortcutsTipInHeader = value
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}
