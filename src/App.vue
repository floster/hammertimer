<script setup lang="ts">
import { onBeforeMount } from 'vue'

import AppHeader from '@/components/AppHeader.vue'
import TimerView from '@/components/TimerView.vue'
import TasksView from '@/components/TasksView.vue'
import TheTimeline from './components/TheTimeline.vue'

/**
  import stores
 */
import { useTasksStore } from '@/stores/tasks'
import { useSettingsStore } from '@/stores/settings'

/**
  init stores
 */
const tasks = useTasksStore()
const settings = useSettingsStore()

onBeforeMount(() => {
  tasks.getTasksFromLocalStorage()

  settings.getDurationsFromLocalStorage()
  settings.getAutoNextModeFromLocalStorage()
  settings.getLongBreakIntervalFromLocalStorage()
})
</script>

<template>
  <div
    class="bg-primary bg-gradient-to-br from-success-content via-primary to-info-content min-h-screen text-white/85 text-red-300"
  >
    <div class="container max-w-2xl mx-auto">
      <AppHeader />
      <main class="flex flex-col items-center px-2 md:px-16">
        <TimerView />
        <TheTimeline />
        <TasksView />
      </main>
    </div>
  </div>
</template>
