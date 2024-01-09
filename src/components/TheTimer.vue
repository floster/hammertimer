<script setup>
import { onMounted, watch, ref, watchEffect, inject } from 'vue'
import { useTimer } from 'vue-timer-hook'

/**
 * injects
 */
const { currentCountdown, timerStarted, timerPaused, timerResumed, onTimerFinished } =
  inject('timer')

const currentTime = ref(null)
// time (in milliseconds) that passing to useTimer
const time = ref(0)
let timer = ref(null)

// create new timer instance (with corresponding countdown time)
// when currentCountdown (i.e timer mode) changes
watch(
  () => currentCountdown.value,
  () => {
    currentTime.value = new Date()
    time.value = currentTime.value.setSeconds(
      currentTime.value.getSeconds() + currentCountdown.value * 60
    )
    timer.value = useTimer(time.value, false)
  },
  { immediate: true }
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
