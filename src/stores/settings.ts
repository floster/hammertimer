import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    instance: null as HTMLDialogElement | null,
    isOpen: false
  }),
  actions: {
    setInstance(instance: HTMLDialogElement) {
      this.instance = instance
    },
    openSettings() {
      console.log('open settings', this.instance)

      this.instance?.showModal()
    },
    closeSettings() {
      this.instance?.close()
    }
  }
})
