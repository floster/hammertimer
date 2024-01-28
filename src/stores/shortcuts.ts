import { defineStore, acceptHMRUpdate } from 'pinia'

export const useShortcutsStore = defineStore('shortcuts', {
  state: () => ({
    isShortcutsVisible: true,
    disableShortcuts: false
  }),
  actions: {
    toggleVisibility() {
      this.isShortcutsVisible = !this.isShortcutsVisible
    },
    disable() {
      this.disableShortcuts = true
    },
    enable() {
      this.disableShortcuts = false
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useShortcutsStore, import.meta.hot))
}
