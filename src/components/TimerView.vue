<script setup>
import { inject } from 'vue'
import AppButton from '@/components/AppButton.vue'
import TheTimer from '@/components/TheTimer.vue'
import TimerModesSwitcher from '@/components/TimerModesSwitcher.vue'

import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()

/**
 * injects
 */
const { timerStarted, timerPaused, toggleTimer, onTimerFinished, resetTimer } = inject('timer')
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-y-10 w-full mt-10 px-2 pt-4 pb-6 md:p-6 md:pb-8 bg-primary-content/20 rounded-lg"
  >
    <TimerModesSwitcher />
    <h2 v-if="tasks.activeTaskTitle" class="text-center text-sm">
      {{ tasks.activeTaskTitle }}
    </h2>
    <TheTimer />
    <div class="flex items-center gap-x-2">
      <!-- reset current button -->
      <AppButton
        v-if="timerStarted"
        icon="ph:stop-fill"
        class="btn-ghost opacity-20 hover:opacity-80"
        @click="resetTimer"
      />
      <!-- start/pause button -->
      <AppButton
        :icon="timerStarted && !timerPaused ? 'ph:pause-fill' : 'ph:play-fill'"
        class="btn-warning btn-lg px-16"
        @click="toggleTimer"
      />
      <!-- force finish current button -->
      <AppButton
        v-if="timerStarted"
        icon="ph:arrow-line-right-bold"
        class="btn-ghost opacity-20 hover:opacity-80"
        @click="onTimerFinished"
      />
    </div>
  </section>
</template>
