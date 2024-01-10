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
  <TransitionGroup name="list" tag="ul" class="mt-5 empty:pt-0 flex flex-col gap-y-2">
    <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
