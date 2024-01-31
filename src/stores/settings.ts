import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, reactive } from 'vue'

import { usePomodoroStore } from '@/stores/pomodoro'

import type { TimerSettingsData, AppSettingsData } from '@/types/firebase'

import { DEFAULTS } from '@/config/app'
import { SETTINGS_REF, TIMER_SETTINGS_DOC_REF, APP_SETTINGS_DOC_REF } from '@/config/firebase'

import { db } from '@/api/firebase'
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'

const app_settings_doc_ref = doc(db, SETTINGS_REF, APP_SETTINGS_DOC_REF)
const timer_settings_doc_ref = doc(db, SETTINGS_REF, TIMER_SETTINGS_DOC_REF)

import { AvailableModesEnum } from '@/types'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // <dialog> instance will be here, after that we can use
    // dialog's methods like .showModal() and .close() in actions
    instance: null as HTMLDialogElement | null,

    // App settings
    durations: reactive(DEFAULTS.DURATIONS),
    autoNextMode: ref(DEFAULTS.AUTO_NEXT_MODE),
    longBreakInterval: ref(DEFAULTS.LONG_BREAK_INTERVAL),
    playSoundOnFinish: ref(false),

    // App shortcuts
    showShortcutsTipInHeader: ref(false)
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
      await updateDoc(timer_settings_doc_ref, {
        [mode]: duration
      })
    },

    async toggleAutoNextMode() {
      await updateDoc(app_settings_doc_ref, {
        autoNextMode: !this.autoNextMode
      })
    },

    setLongBreakInterval(value: number) {
      this.longBreakInterval = value
    },

    async togglePlaySoundOnFinish() {
      await updateDoc(app_settings_doc_ref, {
        playSoundOnFinish: !this.playSoundOnFinish
      })
    },

    async setShortcutsTipInHeader(value: boolean) {
      await updateDoc(app_settings_doc_ref, {
        showShortcutsTipInHeader: value
      })
    },

    /**
     * Firebase
     */
    async getSettingsFromFirebase() {
      // listen for changes on firebase
      // ...in 'settings/timer' document
      onSnapshot(timer_settings_doc_ref, (settingsSnapshot) => {
        const _settings = settingsSnapshot.data() as TimerSettingsData

        this.durations[AvailableModesEnum.hammer] = _settings.hammer
        this.durations[AvailableModesEnum.short_break] = _settings.short_break
        this.durations[AvailableModesEnum.long_break] = _settings.long_break
        this.longBreakInterval = _settings.longBreakInterval
      })

      // ...in 'settings/app' document
      onSnapshot(app_settings_doc_ref, (settingsSnapshot) => {
        const _settings = settingsSnapshot.data() as AppSettingsData

        this.autoNextMode = _settings.autoNextMode
        this.playSoundOnFinish = _settings.playSoundOnFinish
        this.showShortcutsTipInHeader = _settings.showShortcutsTipInHeader
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}
