<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul class="py-5 empty:pt-0 flex flex-col gap-y-2">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
  </ul>
</template>
