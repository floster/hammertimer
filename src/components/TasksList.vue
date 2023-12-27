<script setup>
import { inject } from 'vue'
import TaskItem from './TaskItem.vue'

const tasks = inject('tasks')

defineEmits(['set-active-task'])
</script>

<template>
  <ul class="mt-5 empty:pt-0 flex flex-col gap-y-2">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @set-active-task="(id) => $emit('set-active-task', id)"
    />
  </ul>
</template>
