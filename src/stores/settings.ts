import { defineStore } from 'pinia'
import { usePomodoroStore } from '@/stores/pomodoro'

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
    durations: {
      hammer: 3,
      short_break: 1,
      long_break: 2
    } as Durations,
    autoNextMode: true,
    qtyShortBreaksForLong: 3
  }),
  getters: {
    getDuration: (store) => (mode: AvailableModesEnum) => store.durations[mode],
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

    setDuration(mode: AvailableModesEnum, duration: number) {
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
