import { defineStore } from 'pinia'
import { usePomodoroStore } from '@/stores/pomodoro'

import type { AvailableModes } from '@/types'

type Durations = {
  [key in AvailableModes]: number
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // <dialog> instance will be here, after that we can use
    // dialog's methods like .showModal() and .close() in actions
    instance: null as HTMLDialogElement | null,

    // App settings
    durations: {
      pomodoro: 1,
      short_break: 5,
      long_break: 15
    } as Durations,
    autoNextMode: true
  }),
  getters: {
    getDuration: (store) => (mode: AvailableModes) => store.durations[mode],
    getCurrentDuration: (store) => {
      const pomodoroStore = usePomodoroStore()
      return store.durations[pomodoroStore.getCurrentModeValue]
    },
    getAutoNextMode: (store) => store.autoNextMode
  },
  actions: {
    setInstance(instance: HTMLDialogElement) {
      this.instance = instance
    },
    openSettings() {
      this.instance?.showModal()
    },
    closeSettings() {
      this.instance?.close()
    },

    setDuration(mode: AvailableModes, duration: number) {
      this.durations[mode] = duration
    },
    setAutoNextMode(value: boolean) {
      this.autoNextMode = value
    },
    toggleAutoNextMode() {
      this.autoNextMode = !this.autoNextMode
    }
  }
})
