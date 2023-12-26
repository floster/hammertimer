<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import AppButton from './AppButton.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  active: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['setActiveTask'])

const isComplited = computed(() => props.task.completed === props.task.qty)

const iconClasses = computed(() => ({
  'text-sky-500 dark:text-sky-400': props.active,
  'text-emerald-500 dark:text-emerald-400': isComplited,
  'text-gray-300 dark:text-white/25': props.task.completed < props.task.qty && !props.active
}))

const handleTaskClick = () => {
  if (props.active || isComplited.value) return
  emit('setActiveTask', props.task.id)
}
</script>

<template>
  <li
    class="flex items-center p-4 gap-x-3 font-bold bg-gray-50 dark:bg-black/25 border-l-[6px] border-l-transparent hover:border-l-gray-300 dark:hover:border-l-black/40 rounded transition-all"
    :class="`${active ? 'border-l-gray-300 dark:border-l-black/40' : ''}`"
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
    <AppButton icon="ph:dots-three-bold" class="btn-semi btn-square shrink-0" />
  </li>
</template>
