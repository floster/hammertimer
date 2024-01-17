<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { AvailableModes } from '@/types'

interface Props {
  type: AvailableModes
  start?: boolean
}

const props = defineProps<Props>()

const icon = computed(() =>
  props.type === 'pomodoro'
    ? 'ph:check-circle-fill'
    : props.type === 'short_break'
      ? 'ph:clock-countdown'
      : 'ph:clock-countdown-bold'
)
</script>

<template>
  <li>
    <hr v-if="!start" class="min-w-2 max-h-[2px] bg-primary-content/15" />
    <div class="timeline-middle">
      <Icon :icon="icon" :class="{ 'text-info text-xl': type === 'pomodoro' }" />
    </div>
    <hr class="min-w-2 max-h-[2px] bg-primary-content/15" />
  </li>
</template>
