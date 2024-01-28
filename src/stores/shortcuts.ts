import { defineStore, acceptHMRUpdate } from 'pinia'

export const useShortcutsStore = defineStore('shortcuts', {
  state: () => ({
    isShortcutsVisible: true,
    isShortcutsDisabled: false
  }),
  actions: {
    toggleVisibility() {
      this.isShortcutsVisible = !this.isShortcutsVisible
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
