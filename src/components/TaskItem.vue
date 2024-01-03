<script setup>
import { ref, computed, inject } from 'vue'
import { Icon } from '@iconify/vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskItemControls from '@/components/TaskItemControls.vue'

/**
 * injects
 */
const { timerStarted } = inject('timer')
const { deleteTask } = inject('task')
const { activeTaskId, setActiveTaskId } = inject('activeTask')

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const isCurrent = computed(() => props.task.id === activeTaskId?.value)
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
  'text-secondary/50': !isComplited.value && !isCurrent.value
}))

/**
 * edit task form
 */
const editMode = ref(false)
const hideForm = () => {
  editMode.value = false
}

/**
 * set task as active if it's not already current or completed or timer is started
 */
const handleTaskClick = () => {
  if (isCurrent.value || isComplited.value || timerStarted.value) return
  setActiveTaskId(props.task.id)
}
</script>

<template>
  <li
    v-if="!editMode"
    class="flex items-center px-2 py-3 md:p-4 gap-x-3 font-bold text-sm md:text-base bg-primary-content border-l-[6px] hover:border-l-secondary rounded transition-all"
    :class="`${isCurrent ? 'border-l-info hover:border-l-info' : 'border-l-transparent'}`"
  >
    <Icon
      icon="ph:check-circle-fill"
      width="25px"
      height="25px"
      class="translate-y-[-2px] shrink-0"
      :class="iconClasses"
    />
    <span @click="handleTaskClick" class="cursor-pointer truncate text-neutral">{{
      task.title
    }}</span>
    <span class="text-neutral/50 ml-auto"
      >{{ task.completed }}/<small class="font-normal">{{ task.qty }}</small></span
    >
    <!-- task controls -->
    <TaskItemControls @edit="editMode = true" @delete="() => deleteTask(task.id)" />
  </li>
  <TaskForm v-else :data="task" @submit="hideForm" @cancel="hideForm" />
</template>
