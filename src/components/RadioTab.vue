<script setup>
import { computed } from 'vue'

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
      v-model="pomodoro.currentModeId"
      class="appearance-none"
      type="radio"
      :value="data.id"
      :disabled="isDisabled"
    />{{ data.name }}</label
  >
</template>
