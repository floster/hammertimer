<script setup lang="ts">
import { computed } from 'vue'
import TheTimelineItem from './TheTimelineItem.vue'

import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()

const title = computed(() => pomodoro.currentModeName)
</script>

<template>
  <ul class="timeline mt-4 opacity-40 hover:opacity-100">
    <TheTimelineItem
      v-for="(item, idx) in pomodoro.streaks"
      :key="item.id"
      :type="item.type"
      :start="idx === 0"
      :title="title"
    />
  </ul>
</template>
