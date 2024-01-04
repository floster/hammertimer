<script setup>
import { inject } from 'vue'
import AppButton from '@/components/AppButton.vue'
import TheTimer from '@/components/TheTimer.vue'
import TimerModesSwitcher from '@/components/TimerModesSwitcher.vue'

/**
 * injects
 */
const { setCurrentModeId } = inject('currentMode')
const { timerStarted, setTimerStarted, timerReseted, setTimerReseted } = inject('timer')
const { activeTaskTitle, activeTaskIncreaseCompleted } = inject('activeTask')

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

const onTimerFinished = () => {
  resetTimer()
  activeTaskIncreaseCompleted()
  setCurrentModeId()
}
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-y-10 w-full mt-10 px-2 pt-4 pb-6 md:p-6 md:pb-8 bg-primary-content/20 rounded-lg"
  >
    <TimerModesSwitcher />
    <h2 v-if="activeTaskTitle" class="text-center text-sm">
      {{ activeTaskTitle }}
    </h2>
    <TheTimer @finished="onTimerFinished" />
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
