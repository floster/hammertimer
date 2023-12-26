<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  type: {
    type: String,
    required: false,
    default: 'button'
  },
  icon: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  }
})
</script>

<template>
  <button class="btn" :type="type">
    <Icon v-if="icon" :icon="icon" class="text-lg" />
    <span v-if="text" class="max-sm:hidden">{{ text }}</span>
  </button>
</template>
