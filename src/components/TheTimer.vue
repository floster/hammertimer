<script setup lang="ts">
import { watchEffect, watch } from 'vue'

import TimerExtraControls from './TimerExtraControls.vue'

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
  <div class="grid grid-cols-[1fr_min-content]">
    <div class="relative flex items-center gap-x-2 text-8xl md:text-9xl font-bold tracking-tighter">
      <span>{{ timerStore.getNormalizedMinutes }}</span>
      <span>:</span>
      <span>{{ timerStore.getNormalizedSeconds }}</span>
    </div>
    <TimerExtraControls />
  </div>
</template>
