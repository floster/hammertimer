<script setup lang="ts">
import { computed } from 'vue'
import { useTitle } from '@vueuse/core'

import { SITE_NAME } from '@/config/app'

import AppHeader from '@/components/AppHeader.vue'
import TimerView from '@/components/TimerView.vue'
import TasksView from '@/components/TasksView.vue'
import TheTimeline from './components/TheTimeline.vue'
import TaskActiveSection from '@/components/TaskActiveSection.vue'

/**
  import stores
 */
import { useTimerStore } from '@/stores/timer'
import { usePomodoroStore } from '@/stores/pomodoro'

/**
  init stores
 */
const timer = useTimerStore()
const pomodoro = usePomodoroStore()

// set page title dynamically
const title = computed(() => {
  if (timer.isStarted) {
    return `${timer.getNormalizedMinutes}:${timer.getNormalizedSeconds} - ${pomodoro.getCurrentModeValue}`
  } else {
    return SITE_NAME
  }
})
useTitle(title)
</script>

<template>
  <div class="bg-primary min-h-screen text-white/85 text-red-300">
    <div class="container max-w-2xl mx-auto">
      <AppHeader />
      <main class="flex flex-col items-center px-2 md:px-16">
        <TimerView />
        <TheTimeline />
        <TaskActiveSection />
        <TasksView />
      </main>
    </div>
  </div>
</template>
