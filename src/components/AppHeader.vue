<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import AppButton from '@/components/AppButton.vue'
import SettingsModal from './SettingsModal.vue'

import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()
</script>

<template>
  <header class="flex items-center justify-between py-4 px-2 border-b border-b-neutral/50">
    <AppLogo />
    <div class="flex items-center gap-x-2">
      <AppButton
        class="btn-sm btn-ghost"
        text="Report"
        :sm-no-text="true"
        icon="ph:chart-line-fill"
        @click="() => $router.push('/stats')" />
      <AppButton
        class="btn-sm btn-ghost"
        text="Settings"
        :sm-no-text="true"
        icon="ph:gear-fill"
        @click="() => settings.openSettings()" />
    </div>
  </header>
  <SettingsModal />
</template>
