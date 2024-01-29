<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { AvailableModesEnum } from '@/types'

interface Props {
  type: AvailableModesEnum
  start?: boolean
  end?: boolean
}

const props = defineProps<Props>()

const icon = computed(() =>
  props.type === AvailableModesEnum.hammer
    ? 'ph:check-circle-fill'
    : props.type === AvailableModesEnum.short_break
      ? 'ph:clock-countdown'
      : 'ph:clock-countdown-bold'
)
</script>

<template>
  <li class="min-w-9">
    <hr v-if="!start" class="min-w-2 max-h-[2px] bg-primary-content/15" />
    <div class="timeline-middle">
      <Icon :icon="icon" :class="{ 'text-info text-xl': type === AvailableModesEnum.hammer }" />
    </div>
    <hr v-if="!end" class="min-w-2 max-h-[2px] bg-primary-content/15" />
  </li>
</template>
