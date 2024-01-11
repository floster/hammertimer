<script setup>
import { ref, reactive, computed, provide, watch } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import TimerView from '@/components/TimerView.vue'
import TasksView from '@/components/TasksView.vue'
import AddTaskSection from '@/components/AddTaskSection.vue'

import { useTimerStore } from '@/stores/timer'
const timerStore = useTimerStore()

/**
 * timer modes
 */
const timerModes = [
  { id: 0, name: 'Pomodoro', value: 'pomodoro', duration: 1 },
  { id: 1, name: 'Break', value: 'short_break', duration: 5 },
  { id: 2, name: 'Long Break', value: 'long_break', duration: 15 }
]
provide('timerModes', timerModes)

const _calcNextModeId = () => {
  if (currentModeId.value === 0) return 1
  if (currentModeId.value === 1) return 2
  if (currentModeId.value === 2) return 0
}

const currentModeId = ref(0)
const setNextModeId = () => {
  currentModeId.value = _calcNextModeId()
}

const getCurrentModeValue = () => {
  return timerModes[currentModeId.value].value
}
const duration = computed(() => timerModes[currentModeId.value].duration)

provide('currentMode', { currentModeId, duration, setNextModeId })

/**
 * pomodoro statistics
 */
const statistic = reactive({
  pomodoro: 0,
  short_break: 0,
  long_break: 0
})

// increases finished pomodoro status by 1
const incrementStatistic = (mode = getCurrentModeValue()) => {
  statistic[mode]++
}

provide('statistic', statistic, incrementStatistic)

// reset current time and timer states when current mode changes
watch(
  () => currentModeId.value,
  () => {
    timerStore.resetTimer()
  },
  { immediate: true }
)
</script>

<template>
  <div class="bg-primary min-h-screen text-white/85 text-red-300">
    <div class="container max-w-2xl mx-auto">
      <AppHeader />
      <main class="flex flex-col items-center px-2 md:px-16">
        <TimerView />
        <TasksView />
        <AddTaskSection />
      </main>
    </div>
  </div>
</template>
