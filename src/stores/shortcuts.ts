import { defineStore, acceptHMRUpdate } from 'pinia'

export const useShortcutsStore = defineStore('shortcuts', {
  state: () => ({
    isShortcutsTipsVisible: false,
    isShortcutsDisabled: false
  }),
  actions: {
    toggleVisibility() {
      this.isShortcutsTipsVisible = !this.isShortcutsTipsVisible
    },
    disable() {
      console.log('disable')
      this.isShortcutsDisabled = true
    },
    enable() {
      console.log('enable')
      this.isShortcutsDisabled = false
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useShortcutsStore, import.meta.hot))
}
