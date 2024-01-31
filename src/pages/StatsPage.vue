<script setup lang="ts">
import MainWrapper from '@/components/MainWrapper.vue'
import TheStats from '@/components/TheStats.vue'
import TheTimelineItem from '@/components/TheTimelineItem.vue'

import { AvailableModesEnum } from '@/types'

/**
 * import pomodoro store
 */
import { useStatsStore } from '@/stores/stats'
const stats = useStatsStore()

/**
 * dynamic title
 */
import { useTitle } from '@vueuse/core'
import { SITE_NAME } from '@/config/app'
useTitle(`stats - ${SITE_NAME}`)

const formatDate = (date: string) => {
  const _date = new Date(date)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(_date)
}
</script>

<template>
  <MainWrapper class="gap-y-8">
    <TheStats />
    <ul class="grid gap-y-4">
      <li
        v-for="stat in stats.getDailyStats"
        :key="stat.date"
        class="grid grid-cols-[5rem_1fr] items-center">
        <span class="text-secondary text-xs">{{ formatDate(stat.date) }}</span>
        <ul class="timeline">
          <TheTimelineItem
            v-for="n in stat.durations.length"
            :key="n"
            :type="AvailableModesEnum.hammer"
            :start="n === 1"
            :end="n === stat.durations.length"
            :title="stat.durations[n - 1]" />
        </ul>
      </li>
    </ul>
  </MainWrapper>
</template>
