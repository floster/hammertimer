import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, reactive } from 'vue'
import { useStorage } from '@vueuse/core'

import { usePomodoroStore } from '@/stores/pomodoro'

import type { SettingsData } from '@/types/firebase'

import { DEFAULTS } from '@/config/app'
import { KEYS } from '@/config/localStorage'
import { SETTINGS_REF, TIMER_DOC_REF } from '@/config/firebase'

import { db } from '@/api/firebase'
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'

const TIMER_SETTINGS_DOC_REF = doc(db, SETTINGS_REF, TIMER_DOC_REF)

import { AvailableModesEnum } from '@/types'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // <dialog> instance will be here, after that we can use
    // dialog's methods like .showModal() and .close() in actions
    instance: null as HTMLDialogElement | null,

    // App settings
    durations: reactive(DEFAULTS.DURATIONS),
    autoNextMode: useStorage(KEYS.AUTO_NEXT_MODE, DEFAULTS.AUTO_NEXT_MODE),
    longBreakInterval: ref(DEFAULTS.LONG_BREAK_INTERVAL),
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

    async setDuration(mode: AvailableModesEnum, duration: number) {
      await updateDoc(TIMER_SETTINGS_DOC_REF, {
        [mode]: duration
      })
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
    },

    /**
     * Firebase
     */
    async getSettingsFromFirebase() {
      // listen for changes on firebase
      onSnapshot(TIMER_SETTINGS_DOC_REF, (settingsSnapshot) => {
        const _settings = settingsSnapshot.data() as SettingsData

        this.durations[AvailableModesEnum.hammer] = _settings.hammer
        this.durations[AvailableModesEnum.short_break] = _settings.short_break
        this.durations[AvailableModesEnum.long_break] = _settings.long_break
        this.autoNextMode = _settings.autoNextMode
        this.longBreakInterval = _settings.longBreakInterval
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}
