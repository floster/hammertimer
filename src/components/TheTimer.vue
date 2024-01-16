<script setup lang="ts">
import { computed, watchEffect, watch } from 'vue'

/*
  import timer store
*/
import { useTimerStore } from '@/stores/timer'
const timerStore = useTimerStore()

/*
  import pomodoro store
*/
import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()

/*
  import settings store
*/
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
</script>

<template>
  <div class="flex items-center gap-x-2 text-8xl font-bold">
    <span>{{ normalizedMinutes }}</span>
    <span>:</span>
    <span>{{ normalizedSeconds }}</span>
  </div>
</template>
