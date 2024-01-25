<script setup lang="ts">
import { computed } from 'vue'

/**
 * import pomodoro store
 */
import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()

const avgHammersPerDay = computed(() => {
  const totalHammers = pomodoro.getTotalHammers
  const totalDays = pomodoro.getTotalHammerDays
  return Math.round(totalHammers / totalDays)
})

const avgHammertimesPerDay = computed(() => {
  const totalHammerTime = pomodoro.getTotalHammerTimes
  const totalDays = pomodoro.getTotalHammerDays
  return Math.round(totalHammerTime / totalDays)
})
</script>

<template>
  <div class="stats shadow">
    <div class="stat place-items-center">
      <div class="stat-title text-sm">Total hammers</div>
      <div class="stat-value text-accent">{{ pomodoro.getTotalHammers }}</div>
      <div class="stat-desc">~{{ avgHammersPerDay }} avg/day</div>
    </div>

    <div class="stat place-items-center gap-y-2">
      <div class="stat-title">Total minutes</div>
      <div class="stat-value text-primary">{{ pomodoro.getTotalHammerTimes }}</div>
      <div class="stat-desc">~{{ avgHammertimesPerDay }} avg/day</div>
    </div>
  </div>
</template>
