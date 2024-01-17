<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import TheTimer from '@/components/TheTimer.vue'
import TimerModesSwitcher from '@/components/TimerModesSwitcher.vue'

/*
  import tasks store
*/
import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()

/*
  import timer store
*/
import { useTimerStore } from '@/stores/timer'
const timer = useTimerStore()

/*
  import timer store
*/
import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-y-10 w-full mt-10 px-2 pt-4 pb-6 md:p-6 md:pb-8 bg-white/10 rounded-lg shadow-md"
  >
    <TimerModesSwitcher />
    <h2 v-if="tasks.activeTaskTitle && pomodoro.isCurrentModePomodoro" class="text-center text-sm">
      {{ tasks.activeTaskTitle }}
    </h2>
    <TheTimer />
    <div class="flex items-center gap-x-2">
      <!-- reset current button -->
      <AppButton
        v-if="timer.isStarted"
        icon="ph:stop-fill"
        class="btn-ghost opacity-20 hover:opacity-80"
        @click="timer.reset()"
      />
      <!-- start/pause button -->
      <AppButton
        :icon="timer.isStarted ? 'ph:pause-fill' : 'ph:play-fill'"
        class="btn-warning btn-lg px-16"
        @click="timer.toggle()"
      />
      <!-- force finish current button -->
      <AppButton
        v-if="timer.isStarted"
        icon="ph:arrow-line-right-bold"
        class="btn-ghost opacity-20 hover:opacity-80"
        @click="timer.onTimerFinished"
      />
    </div>
  </section>
</template>
