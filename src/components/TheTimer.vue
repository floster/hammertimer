<script setup lang="ts">
const SECONDS_IN_MINUTE = 60

import { onMounted, watch, computed, ref, watchEffect } from 'vue'
import { useTimer } from 'vue-timer-hook'
import type { UseTimer } from 'vue-timer-hook'

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
  import pomodoro store
*/
import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

const currentTime = ref<Date>()
// time (in milliseconds) that passing to useTimer
const time = ref(0)
let timer = ref<UseTimer>()

// create new timer instance (with corresponding countdown time)
const createTimer = () => {
  currentTime.value = new Date()
  time.value = currentTime.value.setSeconds(
    currentTime.value.getSeconds() + settings.getCurrentDuration * SECONDS_IN_MINUTE
  )
  timer.value = useTimer(time.value, false)
}

// recreate timer each time when 'duration' (i.e timer mode) changes
watch(() => settings.getCurrentDuration, createTimer, { immediate: true })

// recreate timer (with corresponding time) each time when 'timerReseted' changes
watch(
  () => timerStore.timerReseted,
  (reseted) => {
    if (reseted) {
      createTimer()
    }
  }
)

watch(
  [() => timerStore.timerStarted, () => timerStore.timerPaused, () => timerStore.timerResumed],
  ([started, paused, resumed]) => {
    if (started && paused) {
      timer?.value?.pause()
    } else if (started && resumed) {
      timer?.value?.resume()
    } else if (started && !paused && !resumed) {
      timer?.value?.start()
    } else {
      timer?.value?.restart(time.value, false)
    }
  }
)

onMounted(() => {
  // watch for timer expiration (finished)
  watchEffect(() => {
    if (timer?.value?.isExpired) {
      timerStore.onTimerFinished()
      timer?.value.restart(time.value, false)
    }
  })
})

// add leading zero for minutes and seconds
const normalizedMinutes = computed(() => timer?.value?.minutes.toString().padStart(2, '0'))
const normalizedSeconds = computed(() => timer?.value?.seconds.toString().padStart(2, '0'))

// update document title with timer value if timer is started or paused
watchEffect(() => {
  if (timerStore.timerStarted || timerStore.timerPaused) {
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
