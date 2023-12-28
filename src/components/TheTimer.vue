<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  minutes: {
    type: Number,
    required: true
  },
  start: {
    type: Boolean,
    required: true
  },
  reset: {
    type: Boolean,
    required: true
  }
})

const mins = ref(props.minutes)
const secs = ref(0)

/**
 * reset timer on timer mode ('pomodoro', 'break', 'long break') changes
 */
watch(
  () => props.minutes,
  () => {
    resetTimer()
    secs.value = 0
  }
)

/**
 * start/pause timer on 'start' event recieved from parent
 */
watch(
  () => props.start,
  (newVal) => {
    if (newVal) {
      startTimer()
    } else {
      pauseTimer()
    }
  }
)

/**
 * reset timer on 'reset' event recieved from parent
 */
watch(
  () => props.reset,
  (newVal) => {
    if (newVal) {
      resetTimer()
    }
  }
)

/**
 * endless ticker
 */
const _ticker = () => {
  secs.value--
  if (secs.value === -1) {
    secs.value = 59
    mins.value--
  }

  if (mins.value === -1) {
    mins.value = 59
  }
}

let timer = null
const startTimer = () => {
  timer = setInterval(_ticker, 1_000)
}

const pauseTimer = () => {
  clearInterval(timer)
}

const resetTimer = () => {
  pauseTimer()
  mins.value = props.minutes
  secs.value = 0
}

onMounted(() => {
  if (props.start) {
    startTimer()
  }
})

onBeforeUnmount(() => {
  pauseTimer()
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
