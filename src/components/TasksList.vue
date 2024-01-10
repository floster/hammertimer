<script setup>
import { inject, computed } from 'vue'
import TaskItem from '@/components/TaskItem.vue'

const { tasks, completedHidden, completedInTheEnd, hideCompleted, completedToTheEnd } =
  inject('tasks')

const filteredTasks = computed(() => {
  let _tasks = [...tasks.value]
  if (completedHidden.value) {
    _tasks = hideCompleted(_tasks)
  }
  if (completedInTheEnd.value) {
    _tasks = completedToTheEnd(_tasks)
  }
  return _tasks
})

defineEmits(['set-active-task'])
</script>

<template>
  <ul class="mt-5 empty:pt-0 flex flex-col gap-y-2">
    <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
  </ul>
</template>
