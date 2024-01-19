<script setup lang="ts">
import RadioTab from '@/components/RadioTab.vue'

/*
  import pomodoro store
*/
import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()
</script>

<template>
  <nav class="flex items-center gap-x-2">
    <RadioTab v-for="mode in pomodoro.modes" :key="mode.id" :data="mode" />
  </nav>
</template>
