<script setup>
import { Icon } from '@iconify/vue'
import AppButton from './AppButton.vue'

defineProps({
  task: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <li
    class="flex items-center p-4 gap-x-3 font-bold bg-gray-50 dark:bg-black/25 border-l-[6px] border-l-transparent hover:border-l-gray-300 rounded transition-all"
  >
    <Icon
      icon="ph:check-circle-fill"
      width="25px"
      height="25px"
      class="text-gray-300 dark:text-white/25 translate-y-[-2px]"
    />
    <span class="text-gray-800 dark:text-inherit">{{ task.title }}</span>
    <span class="text-gray-400 ml-auto"
      >{{ task.completed }}/<small class="font-normal">{{ task.qty }}</small></span
    >
    <AppButton
      icon="ph:dots-three-bold"
      class="btn-square border-gray-300 dark:border-white/15 dark:bg-white/10 text-inherit"
    />
  </li>
</template>
