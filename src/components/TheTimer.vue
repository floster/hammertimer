<script setup>
const TIMER_SPEED = 250

import { ref, computed, onBeforeUnmount, inject, watch } from 'vue'

const { curentMinutes } = inject('currentMode')
const { timerStarted, timerReseted } = inject('timer')

const emit = defineEmits(['finished'])

const mins = ref(curentMinutes.value)
const secs = ref(0)

/**
 * start/pause timer on 'start' event recieved from parent
 */
watch(
  () => timerStarted.value,
  (newVal) => {
    if (newVal) {
      startTimer()
    } else {
      clearTimer()
    }
  }
)

/**
 * reset timer on 'reset' event recieved from parent
 */
watch(
  () => timerReseted.value,
  (newVal) => {
    if (newVal) {
      resetTimer()
    }
  }
)

watch(
  () => curentMinutes.value,
  (minutes) => {
    mins.value = minutes
  }
)

/**
 * ticker
 */
const _ticker = () => {
  secs.value--
  if (secs.value === -1) {
    secs.value = 59
    mins.value--
  }

  if (mins.value === -1) {
    resetTimer()
    emit('finished')
  }
}

/**
 * timer methods
 */
let timer = null
const startTimer = () => {
  timer = setInterval(_ticker, TIMER_SPEED)
}

const clearTimer = () => {
  clearInterval(timer)
}

const resetTimer = () => {
  clearTimer()
  mins.value = curentMinutes.value
  secs.value = 0
}

onBeforeUnmount(() => {
  clearTimer()
})

const normalizedSecs = computed(() => (secs.value < 10 ? `0${secs.value}` : secs.value))
const normalizedMins = computed(() => (mins.value < 10 ? `0${mins.value}` : mins.value))
</script>

<template>
  <div class="flex items-center gap-x-2 text-8xl font-bold">
    <span>{{ normalizedMins }}</span>
    <span>:</span>
    <span>{{ normalizedSecs }}</span>
  </div>
</template>
