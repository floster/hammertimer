<script setup>
import { inject } from 'vue'
import TasksMenu from '@/components/TasksMenu.vue'

const { totalTasksQty, totalCompletedTasksQty } = inject('tasksQty')
</script>

<template>
  <header class="flex flex-col gap-y-8">
    <div class="flex items-center justify-between py-3 border-b-2 border-b-neutral-content/40">
      <h2 class="text-sm md:text-base">
        Tasks
        <span class="text-neutral-content/50"
          >({{ totalCompletedTasksQty }}/<small>{{ totalTasksQty }}</small
          >)</span
        >
      </h2>
      <TasksMenu />
    </div>
  </header>
</template>
