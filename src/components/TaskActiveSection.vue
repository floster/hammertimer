<script setup lang="ts">
/*
  import tasks store
*/
import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()

/*
  import timer store
*/
import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()
</script>

<template>
  <h2 v-if="tasks.activeTaskTitle && pomodoro.isCurrentModePomodoro" class="text-center text-sm">
    {{ tasks.activeTaskTitle }}
  </h2>
</template>
