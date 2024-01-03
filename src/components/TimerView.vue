<script setup>
import { ref, computed, watch, inject } from 'vue'
import AppButton from '@/components/AppButton.vue'
import RadioTab from '@/components/RadioTab.vue'
import TheTimer from '@/components/TheTimer.vue'

/**
 * injects
 */
const { timerStarted, setTimerStarted, timerReseted, setTimerReseted } = inject('timer')
const { activeTaskIncreaseCompleted } = inject('activeTask')
const { activeTaskTitle } = inject('activeTask')

const modes = [
  { name: 'Pomodoro', value: 'pomodoro', duration: 1 },
  { name: 'Break', value: 'short_break', duration: 5 },
  { name: 'Long Break', value: 'long_break', duration: 15 }
]

/**
 * current mode values
 */
const currentModeId = ref(modes[0].value)
const currentMode = computed(() => modes.find((mode) => mode.value === currentModeId.value))
const curentMinutes = computed(() => currentMode.value.duration)

/**
 * timer's methods
 */
const playPauseTimer = () => {
  setTimerStarted(!timerStarted.value)
  setTimerReseted(false)
}
const resetTimer = () => {
  setTimerStarted(false)
  setTimerReseted(true)
}

const handleTimerFinished = () => {
  resetTimer()
  activeTaskIncreaseCompleted()
}

watch(
  () => currentModeId.value,
  () => resetTimer()
)
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-y-10 w-full mt-10 px-2 pt-4 pb-6 md:p-6 md:pb-8 bg-primary-content/20 rounded-lg"
  >
    <nav class="flex items-center gap-x-2">
      <RadioTab v-for="mode in modes" :key="mode.value" v-model="currentModeId" :data="mode" />
    </nav>
    <h2 v-if="activeTaskTitle" class="text-center text-sm">
      {{ activeTaskTitle }}
    </h2>
    <TheTimer
      :minutes="curentMinutes"
      :start="timerStarted"
      :reset="timerReseted"
      @finished="handleTimerFinished"
    />
    <div class="flex items-center gap-x-2">
      <!-- start/pause button -->
      <AppButton
        @click="playPauseTimer"
        :icon="timerStarted ? 'ph:pause-fill' : 'ph:play-fill'"
        class="btn-warning btn-lg px-16"
      />
      <!-- reset button -->
      <AppButton
        v-if="timerStarted || !timerReseted"
        @click="resetTimer"
        icon="ph:arrow-counter-clockwise-bold"
        class="btn-ghost"
      />
    </div>
  </section>
</template>
