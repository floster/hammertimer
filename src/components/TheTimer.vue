<script setup>
import { onMounted, watch, ref, watchEffect, inject } from 'vue'
import { useTimer } from 'vue-timer-hook'

/**
 * injects
 */
const { duration, timerStarted, timerPaused, timerResumed, timerReseted, onTimerFinished } =
  inject('timer')

const currentTime = ref(null)
// time (in milliseconds) that passing to useTimer
const time = ref(0)
let timer = ref(null)

// create new timer instance (with corresponding countdown time)
const createTimer = () => {
  currentTime.value = new Date()
  time.value = currentTime.value.setSeconds(currentTime.value.getSeconds() + duration.value * 60)
  timer.value = useTimer(time.value, false)
}

// recreate timer each time when 'duration' (i.e timer mode) changes
watch(() => duration.value, createTimer, { immediate: true })

watch(
  () => timerReseted.value,
  (reseted) => {
    if (reseted) {
      createTimer()
    }
  }
)

watch(
  [() => timerStarted.value, () => timerPaused.value, () => timerResumed.value],
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
  watchEffect(() => {
    if (timer?.value.isExpired) {
      onTimerFinished()
      timer?.value.restart(time.value, false)
    }
  })
})
</script>

<template>
  <div class="flex items-center gap-x-2 text-8xl font-bold">
    <span>{{ timer.minutes }}</span>
    <span>:</span>
    <span>{{ timer.seconds }}</span>
  </div>
</template>
