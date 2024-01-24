<script setup lang="ts">
import MainWrapper from '@/components/MainWrapper.vue'
import TimerView from '@/components/TimerView.vue'
import TasksView from '@/components/TasksView.vue'
import TheTimeline from '@/components/TheTimeline.vue'
import TaskActiveSection from '@/components/TaskActiveSection.vue'

import { computed } from 'vue'
import { useTitle } from '@vueuse/core'

import { SITE_NAME } from '@/config/app'

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
  <MainWrapper>
    <TimerView />
    <TheTimeline />
    <TaskActiveSection />
    <TasksView />
  </MainWrapper>
</template>
