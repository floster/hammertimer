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
      this.isShortcutsDisabled = true
    },
    enable() {
      this.isShortcutsDisabled = false
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useShortcutsStore, import.meta.hot))
}
