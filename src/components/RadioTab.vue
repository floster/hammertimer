<script setup>
import { inject, computed } from 'vue'

const { currentModeId } = inject('currentMode')
const { timerStarted } = inject('timer')

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const isCurrent = computed(() => currentModeId.value === props.data.id)
const isDisabled = computed(() => timerStarted.value)
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
      class="appearance-none"
      type="radio"
      :value="data.id"
      v-model="currentModeId"
      :disabled="isDisabled"
    />{{ data.name }}</label
  >
</template>
