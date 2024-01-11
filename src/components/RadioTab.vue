<script setup>
import { inject, computed } from 'vue'

import { useTimerStore } from '@/stores/timer'
const timer = useTimerStore()

const { currentModeId } = inject('currentMode')

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const isCurrent = computed(() => currentModeId.value === props.data.id)
const isDisabled = computed(() => timer.timerStarted)
</script>

<template>
  <label
    :class="{
      'btn btn-ghost hover:bg-neutral/20': true,
      'bg-neutral/20': isCurrent,
      'text-secondary hover:bg-transparent cursor-not-allowed': isDisabled
    }"
  >
    <input
      v-model="currentModeId"
      class="appearance-none"
      type="radio"
      :value="data.id"
      :disabled="isDisabled"
    />{{ data.name }}</label
  >
</template>
