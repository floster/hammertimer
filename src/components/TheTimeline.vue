<script setup lang="ts">
import { computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import TheTimelineItem from './TheTimelineItem.vue'

import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()

const title = computed(() => pomodoro.currentModeName)
</script>

<template>
  <div class="flex items-center gap-x-2 mt-4 opacity-40 hover:opacity-100">
    <ul class="timeline">
      <TheTimelineItem
        v-for="(item, idx) in pomodoro.streaks"
        :key="item.id"
        :type="item.type"
        :start="idx === 0"
        :title="title"
      />
    </ul>
    <AppButton
      v-if="pomodoro.streaks.length > 0"
      class="btn-ghost btn-square btn-sm hover:text-error opacity-25 hover:opacity-85"
      icon="ant-design:clear-outlined"
      title="reset streaks"
      @click="pomodoro.resetStreaks"
    />
  </div>
</template>
