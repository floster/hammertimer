<script setup lang="ts">
import AppModal from '@/components/AppModal.vue'
import SettingsForm from '@/components/SettingsForm.vue'

import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

const closeDialog = () => {
  settings.closeSettings()
}
</script>

<template>
  <AppModal v-slot="slotProps" title="Settings" @close="closeDialog">
    <SettingsForm v-if="slotProps.opened" @submit="closeDialog" />
  </AppModal>
</template>
