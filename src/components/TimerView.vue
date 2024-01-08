<script setup>
import { inject } from 'vue'
import AppButton from '@/components/AppButton.vue'
import TheTimer from '@/components/TheTimer.vue'
import TimerModesSwitcher from '@/components/TimerModesSwitcher.vue'

/**
 * injects
 */
const { timerStarted, startTimer, resetTimer, onTimerFinished } = inject('timer')
const { activeTaskTitle } = inject('activeTask')

const startResetTimer = () => {
  if (timerStarted.value) {
    resetTimer()
  } else {
    startTimer()
  }
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
    <TheTimer />
    <div class="flex items-center gap-x-2">
      <!-- start/pause button -->
      <AppButton
        @click="startResetTimer"
        :icon="timerStarted ? 'ph:stop-fill' : 'ph:play-fill'"
        class="btn-warning btn-lg px-16"
      />
      <!-- reset button -->
      <AppButton
        v-if="timerStarted"
        @click="onTimerFinished"
        icon="ph:arrow-line-right-bold"
        class="btn-ghost"
      />
    </div>
  </section>
</template>
