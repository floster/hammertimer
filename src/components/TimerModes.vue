<script setup lang="ts">
import TimerModesTab from '@/components/TimerModesTab.vue'

/*
  import pomodoro store
*/
import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()
</script>

<template>
  <nav class="flex items-center gap-x-2">
    <TimerModesTab v-for="mode in pomodoro.modes" :key="mode.id" :data="mode" />
  </nav>
</template>
