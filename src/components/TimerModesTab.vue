<script setup lang="ts">
import { computed } from 'vue'

/*
  import stores
*/
import { useTimerStore } from '@/stores/timer'
const timer = useTimerStore()

import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()

import type { Mode } from '@/types'

/*
  props
*/
interface Props {
  data: Mode
}
const props = defineProps<Props>()

const isCurrent = computed(() => pomodoro.currentModeId === props.data.id)
</script>

<template>
  <label
    :class="{
      'btn btn-ghost gap-0 hover:bg-neutral/20': true,
      'bg-neutral/20 text-white': isCurrent,
      'text-secondary hover:bg-transparent pointer-events-none': timer.isActive
    }">
    <input
      v-model="pomodoro.currentModeId"
      class="appearance-none"
      type="radio"
      :value="data.id"
      :disabled="timer.isStarted" />{{ data.name }}</label
  >
</template>
