<script setup lang="ts">
import { computed } from 'vue'
import TaskItem from '@/components/TaskItem.vue'

import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()

const filteredTasks = computed(() => {
  if (tasks.isCompletedHidden) {
    return tasks.getOnlyUncompletedTasks
  } else if (tasks.isCompletedInTheEnd) {
    return tasks.getWithCompletedInTheEnd
  } else {
    return tasks.getTasks
  }
})
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
