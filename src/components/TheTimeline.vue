<script setup lang="ts">
import TheTimelineItem from './TheTimelineItem.vue'

import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()
</script>

<template>
  <div class="tooltip mt-4" data-tip="click to clear streaks">
    <div class="flex items-center gap-x-2 opacity-30" @click="pomodoro.resetStreaks">
      <ul class="timeline">
        <TheTimelineItem
          v-for="(item, idx) in pomodoro.streaks"
          :key="item.id"
          :type="item.type"
          :start="idx === 0"
          :end="idx === pomodoro.streaks.length - 1" />
      </ul>
    </div>
  </div>
</template>
