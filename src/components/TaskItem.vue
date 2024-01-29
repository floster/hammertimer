<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskItemControls from '@/components/TaskItemControls.vue'

import type { Task } from '@/types'

/*
  import stores
*/
import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()

import { useTimerStore } from '@/stores/timer'
const timer = useTimerStore()

import { useShortcutsStore } from '@/stores/shortcuts'
const shortcuts = useShortcutsStore()

interface Props {
  task: Task
}

const props = defineProps<Props>()

const isCurrent = computed(() => props.task.id === tasks.activeTaskId)
const isComplited = computed(() => props.task.completed === props.task.qty)

/**
 * compute icon classes - active, completed, default
 */
const iconClasses = computed(() => ({
  // active task
  'text-info': isCurrent.value,
  // completed task
  'text-success': isComplited.value,
  // default
  'text-neutral/20': !isComplited.value && !isCurrent.value
}))

/**
 * show/hide edit task form
 */
const editMode = ref(false)
const showForm = () => {
  editMode.value = true
  shortcuts.disable()
}

const hideForm = () => {
  editMode.value = false
  shortcuts.enable()
}

/**
 * set task as active if it's not already current or completed or if timer isn't started
 */
const handleTaskClick = () => {
  if (isComplited.value || timer.isStarted) return
  else if (isCurrent.value) tasks.setActiveTaskId(null)
  else tasks.setActiveTaskId(props.task.id)
}
</script>

<template>
  <li
    v-if="!editMode"
    class="flex items-center px-2 py-3 md:p-4 gap-x-3 font-bold text-sm md:text-base bg-primary-content border-l-[6px] hover:border-l-secondary rounded transition-all"
    :class="`${isCurrent ? 'border-l-info hover:border-l-info' : 'border-l-transparent'}`">
    <Icon
      icon="ph:check-circle-fill"
      width="25px"
      height="25px"
      class="translate-y-[-2px] shrink-0"
      :class="iconClasses" />
    <span class="cursor-pointer truncate text-primary" @click="handleTaskClick">{{
      task.title
    }}</span>
    <span class="text-neutral/50 ml-auto"
      >{{ task.completed }}/<small class="font-normal">{{ task.qty }}</small></span
    >
    <!-- task controls -->
    <TaskItemControls @edit="showForm" @delete="() => tasks.removeTask(task.id)" />
  </li>
  <TaskForm v-else :data="task" @submit="hideForm" @cancel="hideForm" />
</template>
