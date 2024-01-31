<script setup lang="ts">
import { watch } from 'vue'
import TimerModesTab from '@/components/TimerModesTab.vue'

import { ModeIdsEnum, AvailableModesEnum } from '@/types'

/*
  import stores
*/
import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()

import { useTimerStore } from '@/stores/timer'
const timer = useTimerStore()

const onTimerModeChanged = () => {
  timer.reset()

  switch (pomodoro.currentModeId) {
    case ModeIdsEnum.hammer:
      console.log(`current mode is ${AvailableModesEnum.hammer}`)
      break
    case ModeIdsEnum.short_break:
      console.log(`current mode is ${AvailableModesEnum.short_break}`)
      break
    case ModeIdsEnum.long_break:
      console.log(`current mode is ${AvailableModesEnum.long_break}`)
      break
  }
}

// reset current time and timer states when current mode changes
watch(
  () => pomodoro.currentModeId,
  () => {
    onTimerModeChanged()
  },
  { immediate: true }
)
</script>

<template>
  <nav class="flex items-center gap-x-2">
    <TimerModesTab v-for="mode in pomodoro.modes" :key="mode.id" :data="mode" />
  </nav>
</template>
