<script setup>
import { ref, computed, inject, watch } from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown'

const { currentTime, timerStarted, onTimerFinished } = inject('timer')

// countdown timer instance
const timerRef = ref(null)

// countdown timer time
const time = computed(() => currentTime.value * 60 * 1000)

const start = () => {
  timerRef.value?.start()
}

const pause = () => {
  timerRef.value?.abort()
}

watch(
  () => timerStarted.value,
  (started) => {
    if (started) {
      start()
    } else {
      pause()
    }
  }
)
</script>

<template>
  <div class="flex items-center gap-x-2 text-8xl font-bold">
    <vue-countdown
      ref="timerRef"
      @end="onTimerFinished"
      :auto-start="false"
      :time="time"
      v-slot="{ minutes, seconds }"
    >
      <span>{{ minutes.toString().padStart(2, '0') }}</span>
      <span>:</span>
      <span>{{ seconds.toString().padStart(2, '0') }}</span>
    </vue-countdown>
  </div>
</template>
