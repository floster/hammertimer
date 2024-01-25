<script setup lang="ts">
import { watchEffect, watch } from 'vue'
import { Icon } from '@iconify/vue'

/*
  import stores
*/
import { useTimerStore } from '@/stores/timer'
const timerStore = useTimerStore()

import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

// recreate timer each time when 'duration' (i.e timer mode) changes
watch(
  () => settings.getCurrentDuration,
  () => timerStore.createTimer(),
  { immediate: true }
)

watchEffect(() => {
  if (timerStore.isFinished) {
    timerStore.onTimerFinished()
  }
})
</script>

<template>
  <div class="relative flex items-center gap-x-2 text-8xl md:text-9xl font-bold tracking-tighter">
    <span>{{ timerStore.getNormalizedMinutes }}</span>
    <span>:</span>
    <span>{{ timerStore.getNormalizedSeconds }}</span>
    <button
      class="btn btn-ghost btn-square btn-sm absolute right-[-30px] top-0"
      :title="settings.getAutoNextMode ? 'auto-next mode is enabled' : 'auto-next mode is disabled'"
      @click="settings.toggleAutoNextMode()">
      <Icon
        icon="mdi:auto-start"
        class="text-xl"
        :class="settings.getAutoNextMode ? 'text-primary-content' : 'text-secondary'" />
    </button>
  </div>
</template>
