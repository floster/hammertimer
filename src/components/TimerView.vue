<script setup>
import { ref, computed, watch, inject } from 'vue'
import AppButton from '@/components/AppButton.vue'
import RadioTab from '@/components/RadioTab.vue'
import TheTimer from '@/components/TheTimer.vue'

/**
 * injects
 */
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
 * timer's states
 */
const timerOn = ref(false)
const timerReseted = ref(true)

/**
 * timer's methods
 */
const startTimer = () => {
  timerReseted.value = false
  timerOn.value = !timerOn.value
}
const resetTimer = () => {
  timerReseted.value = true
  timerOn.value = false
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
    <h1 v-if="activeTaskTitle" class="text-center text-sm">
      {{ activeTaskTitle }}
    </h1>
    <TheTimer
      :minutes="curentMinutes"
      :start="timerOn"
      :reset="timerReseted"
      @finished="handleTimerFinished"
    />
    <div class="flex items-center gap-x-2">
      <!-- start/pause button -->
      <AppButton
        @click="startTimer"
        :icon="timerOn ? 'ph:pause-fill' : 'ph:play-fill'"
        class="btn-warning btn-lg px-16"
      />
      <!-- reset button -->
      <AppButton
        v-if="timerOn || !timerReseted"
        @click="resetTimer"
        icon="ph:arrow-counter-clockwise-bold"
        class="btn-ghost"
      />
    </div>
  </section>
</template>
