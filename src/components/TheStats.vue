<script setup lang="ts">
import { computed } from 'vue'

/**
 * import stats store
 */
import { useStatsStore } from '@/stores/stats'
const stats = useStatsStore()

const avgHammersPerDay = computed(() => {
  const totalHammers = stats.getTotalHammers
  const totalDays = stats.getTotalHammerDays
  return Math.round(totalHammers / totalDays)
})

const avgHammertimesPerDay = computed(() => {
  const totalHammerTime = stats.getTotalHammerTimes
  const totalDays = stats.getTotalHammerDays
  return Math.round(totalHammerTime / totalDays)
})
</script>

<template>
  <div class="stats shadow">
    <div class="stat place-items-center">
      <div class="stat-title text-sm">Total hammers</div>
      <div class="stat-value text-accent">{{ stats.getTotalHammers }}</div>
      <div class="stat-desc">~{{ avgHammersPerDay }} avg/day</div>
    </div>

    <div class="stat place-items-center gap-y-2">
      <div class="stat-title">Total minutes</div>
      <div class="stat-value text-primary">{{ stats.getTotalHammerTimes }}</div>
      <div class="stat-desc">~{{ avgHammertimesPerDay }} avg/day</div>
    </div>
  </div>
</template>
