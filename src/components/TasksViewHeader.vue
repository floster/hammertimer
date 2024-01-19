<script setup lang="ts">
import TasksMenu from '@/components/TasksMenu.vue'
import AppButton from '@/components/AppButton.vue'

import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()
</script>

<template>
  <header class="flex flex-col gap-y-8">
    <div
      class="relative flex items-center justify-between py-3 border-b-2 border-b-neutral-content/40">
      <AppButton
        text="Add Task"
        icon="ph:plus-circle-fill"
        class="btn-sm btn-primary"
        @click="tasks.openAddTaskForm" />
      <h2 class="absolute left-1/2 -translate-x-1/2 text-sm md:text-base">
        Tasks
        <span class="text-neutral-content/50"
          >({{ tasks.getCompletedTasksQty }}/<small>{{ tasks.getTotalTasksQty }}</small
          >)</span
        >
      </h2>

      <TasksMenu />
    </div>
  </header>
</template>
