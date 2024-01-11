<script setup lang="ts">
const SECONDS_IN_MINUTE = 5

import { onMounted, watch, computed, ref, watchEffect } from 'vue'
import { useTimer } from 'vue-timer-hook'

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

const currentTime = ref(null)
// time (in milliseconds) that passing to useTimer
const time = ref(0)
let timer = ref(null)

// create new timer instance (with corresponding countdown time)
const createTimer = () => {
  currentTime.value = new Date()
  time.value = currentTime.value.setSeconds(
    currentTime.value.getSeconds() + pomodoro.currentModeDuration * SECONDS_IN_MINUTE
  )
  timer.value = useTimer(time.value, false)
}

// recreate timer each time when 'duration' (i.e timer mode) changes
watch(() => pomodoro.currentModeDuration, createTimer, { immediate: true })

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
      timer?.value.pause()
    } else if (started && resumed) {
      timer?.value.resume()
    } else if (started && !paused && !resumed) {
      timer?.value.start()
    } else {
      timer?.value.restart(time.value, false)
    }
  }
)

onMounted(() => {
  // watch for timer expiration (finished)
  watchEffect(() => {
    if (timer?.value.isExpired) {
      timerStore.onTimerFinished()
      timer?.value.restart(time.value, false)
    }
  })
})

// add leading zero for minutes and seconds
const normalizedMinutes = computed(() => timer?.value.minutes.toString().padStart(2, '0'))
const normalizedSeconds = computed(() => timer?.value.seconds.toString().padStart(2, '0'))
</script>

<template>
  <div class="flex items-center gap-x-2 text-8xl font-bold">
    <span>{{ normalizedMinutes }}</span>
    <span>:</span>
    <span>{{ normalizedSeconds }}</span>
  </div>
</template>
