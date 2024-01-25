<script setup lang="ts">
import { computed, watch } from 'vue'

/*
  import timer store
*/
import { useTimerStore } from '@/stores/timer'
const timer = useTimerStore()

/*
  import pomodoro store
*/
import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()

/*
  props
*/
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const isCurrent = computed(() => pomodoro.currentModeId === props.data.id)

// reset current time and timer states when current mode changes
watch(
  () => pomodoro.currentModeId,
  () => {
    timer.reset()
  },
  { immediate: true }
)
</script>

<template>
  <label
    :class="{
      'btn btn-ghost gap-0 hover:bg-neutral-content/20': true,
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
