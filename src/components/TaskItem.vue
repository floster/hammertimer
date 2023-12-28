<script setup>
import { computed, inject } from 'vue'
import { Icon } from '@iconify/vue'
import AppButton from './AppButton.vue'

const deleteTask = inject('deleteTask')
const { activeTaskId, setActiveTask } = inject('activeTask')

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
  'text-sky-500': isCurrent.value,
  // completed task
  'text-emerald-500': isComplited.value,
  // default
  'text-gray-300': !isComplited.value && !isCurrent.value
}))

/**
 * set task as active if it's not already current or completed
 */
const handleTaskClick = () => {
  if (isCurrent.value || isComplited.value) return
  setActiveTask(props.task.id)
}
</script>

<template>
  <li
    class="flex items-center px-2 py-3 md:p-4 gap-x-3 font-bold text-sm md:text-base bg-gray-50 border-l-[6px] hover:border-l-gray-300 rounded transition-all"
    :class="`${isCurrent ? 'border-l-sky-500 hover:border-l-sky-500' : 'border-l-transparent'}`"
  >
    <Icon
      icon="ph:check-circle-fill"
      width="25px"
      height="25px"
      class="translate-y-[-2px] shrink-0"
      :class="iconClasses"
    />
    <span @click="handleTaskClick" class="cursor-pointer truncate text-gray-800">{{
      task.title
    }}</span>
    <span class="text-gray-400 ml-auto"
      >{{ task.completed }}/<small class="font-normal">{{ task.qty }}</small></span
    >
    <!-- task menu -->
    <div class="group flex shrink-0">
      <AppButton
        icon="ph:dots-three-outline-vertical-fill"
        class="btn-dark-semi btn-square group-hover:hidden"
      />
      <div class="flex gap-x-2 w-0 overflow-hidden group-hover:w-auto transition-all">
        <!-- button delete task -->
        <AppButton
          @click="() => deleteTask(task.id)"
          text="del"
          class="btn-dark-semi btn-square hover:text-rose-500"
        />
        <!-- button edit task -->
        <AppButton text="edit" class="btn-dark-semi btn-square hover:text-sky-500" />
      </div>
    </div>
  </li>
</template>
