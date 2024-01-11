<script setup>
import { onMounted, watch, computed, ref, watchEffect, inject } from 'vue'
import { useTimer } from 'vue-timer-hook'

/*
  import timer store
*/
import { useTimerStore } from '@/stores/timer'
const timerStore = useTimerStore()

/**
 * injects
 */
const { duration } = inject('currentMode')

const currentTime = ref(null)
// time (in milliseconds) that passing to useTimer
const time = ref(0)
let timer = ref(null)

// create new timer instance (with corresponding countdown time)
const createTimer = () => {
  currentTime.value = new Date()
  time.value = currentTime.value.setSeconds(currentTime.value.getSeconds() + duration.value * 5)
  timer.value = useTimer(time.value, false)
}

// recreate timer each time when 'duration' (i.e timer mode) changes
watch(() => duration.value, createTimer, { immediate: true })

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
  watchEffect(() => {
    if (timer?.value.isExpired) {
      timerStore.onTimerFinished()
      timer?.value.restart(time.value, false)
    }
  })
})

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
