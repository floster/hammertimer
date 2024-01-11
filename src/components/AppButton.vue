<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  type?: 'button' | 'submit'
  icon?: string | null
  text?: string | null
  smNoText?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  icon: null,
  text: null,
  smNoText: false
})
</script>

<template>
  <button class="btn" :type="type">
    <Icon v-if="icon" :icon="icon" class="text-lg" />
    <span v-if="text" :class="smNoText ? 'max-sm:hidden' : ''">{{ text }}</span>
    <slot />
  </button>
</template>
