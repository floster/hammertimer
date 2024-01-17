<script setup lang="ts">
import { computed, watchEffect, watch } from 'vue'
import { Icon } from '@iconify/vue'

/*
  import stores
*/
import { useTimerStore } from '@/stores/timer'
const timerStore = useTimerStore()

import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()

import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

// recreate timer each time when 'duration' (i.e timer mode) changes
watch(
  () => settings.getCurrentDuration,
  () => timerStore.createTimer(),
  { immediate: true }
)

// add leading zero for minutes and seconds
const normalizedMinutes = computed(() => timerStore.minutes?.toString().padStart(2, '0'))
const normalizedSeconds = computed(() => timerStore.seconds?.toString().padStart(2, '0'))

// update document title with timer value if timer is started or paused
watchEffect(() => {
  if (timerStore.isRunning) {
    document.title = `${normalizedMinutes.value}:${normalizedSeconds.value} - ${pomodoro.currentModeName}`
  } else {
    document.title = 'Pomofocus'
  }
})

watchEffect(() => {
  if (timerStore.isFinished) {
    timerStore.onTimerFinished()
  }
})
</script>

<template>
  <div class="relative flex items-center gap-x-2 text-9xl font-bold">
    <!-- with daisy animation -->
    <!-- <span class="countdown font-mono">
      <span :style="{ '--value': normalizedMinutes }"></span>
    </span>
    <span>:</span>
    <span class="countdown font-mono">
      <span :style="{ '--value': normalizedSeconds }"></span>
    </span> -->
    <!-- /with daisy animation -->
    <span>{{ normalizedMinutes }}</span>
    <span>:</span>
    <span>{{ normalizedSeconds }}</span>
    <button
      class="btn btn-ghost btn-square btn-sm absolute right-[-30px] top-0"
      :title="settings.getAutoNextMode ? 'auto-next mode is enabled' : 'auto-next mode is disabled'"
      @click="settings.toggleAutoNextMode()"
    >
      <Icon
        icon="mdi:auto-start"
        class="text-xl"
        :class="settings.getAutoNextMode ? 'text-green-400' : 'text-secondary'"
      />
    </button>
  </div>
</template>
