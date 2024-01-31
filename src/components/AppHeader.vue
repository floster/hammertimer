<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import AppButton from '@/components/AppButton.vue'
import TheIndicator from '@/components/TheIndicator.vue'
import SettingsModal from '@/components/SettingsModal.vue'

import { ShortcutsEnum } from '@/types/shortcuts'

import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()
</script>

<template>
  <header class="flex items-center justify-between py-1 px-2 border-b border-b-neutral/50">
    <AppLogo />
    <div class="flex items-center gap-x-4">
      <TheIndicator :label="ShortcutsEnum.REPORT">
        <AppButton
          class="btn-square btn-ghost text-2xl"
          :sm-no-text="true"
          icon="ph:chart-line-fill"
          @click="() => $router.push('/stats')" />
      </TheIndicator>
      <TheIndicator :label="ShortcutsEnum.SETTINGS">
        <AppButton
          class="btn-square btn-ghost text-2xl"
          :sm-no-text="true"
          icon="ph:gear-fill"
          @click="() => settings.openSettings()" />
      </TheIndicator>
    </div>
  </header>
  <SettingsModal />
</template>
