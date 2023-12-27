<script setup>
import { computed, inject } from 'vue'
import { Icon } from '@iconify/vue'
import AppButton from './AppButton.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const { activeTaskId, setActiveTask } = inject('activeTask')

const isCurrent = computed(() => props.task.id === activeTaskId?.value)
const isComplited = computed(() => props.task.completed === props.task.qty)

/**
 * compute icon classes - active, completed, default
 */
const iconClasses = computed(() => ({
  'text-sky-500 dark:text-sky-400': isCurrent.value,
  'text-emerald-500 dark:text-emerald-400': isComplited.value,
  'text-gray-300 dark:text-white/25': !isComplited.value && !isCurrent.value
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
    class="flex items-center p-4 gap-x-3 font-bold text-sm md:text-base bg-gray-50 dark:bg-black/25 border-l-[6px] hover:border-l-gray-300 dark:hover:border-l-black/40 rounded transition-all"
    :class="`${
      isCurrent
        ? 'border-l-sky-500 dark:border-l-sky-400 hover:border-l-sky-500 dark:hover:border-l-sky-400'
        : 'border-l-transparent'
    }`"
  >
    <Icon
      icon="ph:check-circle-fill"
      width="25px"
      height="25px"
      class="translate-y-[-2px] shrink-0"
      :class="iconClasses"
    />
    <span @click="handleTaskClick" class="cursor-pointer text-gray-800 dark:text-inherit">{{
      task.title
    }}</span>
    <span class="text-gray-400 ml-auto"
      >{{ task.completed }}/<small class="font-normal">{{ task.qty }}</small></span
    >
    <AppButton
      icon="ph:dots-three-bold"
      class="btn-dark-semi dark:btn-light-semi btn-square shrink-0"
    />
  </li>
</template>
