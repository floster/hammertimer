<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  type: {
    validator: (value) => ['semi', 'solid'].includes(value),
    default: 'semi',
    required: true
  },
  icon: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <button :class="`${type === 'semi' ? 'btn-semi' : 'btn'}`">
    <Icon v-if="icon" :icon="icon" class="text-lg md:text-base" />
    <span v-if="text" class="max-sm:hidden">{{ text }}</span>
  </button>
</template>
