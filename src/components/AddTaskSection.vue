<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'

import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()
</script>

<template>
  <div class="w-full my-6">
    <TaskForm
      :is-visible="tasks.isAddTaskFormVisible"
      :data="null"
      @submit="tasks.closeAddTaskForm"
      @cancel="tasks.closeAddTaskForm" />
  </div>
</template>
