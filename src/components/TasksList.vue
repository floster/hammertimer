<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    required: true
  },
  currentTaskId: {
    type: Number,
    required: false,
    default: null
  }
})

defineEmits(['setActiveTask'])
</script>

<template>
  <ul class="mt-5 empty:pt-0 flex flex-col gap-y-2">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :active="task.id === currentTaskId"
      @setActiveTask="(id) => $emit('setActiveTask', id)"
    />
  </ul>
</template>
