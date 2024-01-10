<script setup>
import { ref, reactive, computed, provide, watch } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import TimerView from '@/components/TimerView.vue'
import TasksView from '@/components/TasksView.vue'
import AddTaskSection from '@/components/AddTaskSection.vue'

import { useTasksStore } from '@/stores/tasks'
const tasksStore = useTasksStore()

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

provide('currentMode', { currentModeId, setNextModeId })

/**
 * timer
 */
const duration = computed(() => timerModes[currentModeId.value].duration)

const timerStarted = ref(false)
const startTimer = () => {
  timerStarted.value = true
  timerReseted.value = false
}

const timerPaused = ref(false)
const pauseTimer = () => {
  timerResumed.value = false
  timerPaused.value = true
}

const timerResumed = ref(false)
const resumeTimer = () => {
  timerResumed.value = true
  timerPaused.value = false
}

const toggleTimer = () => {
  if (!timerStarted.value) {
    startTimer()
  } else {
    if (!timerPaused.value) {
      pauseTimer()
    } else {
      resumeTimer()
    }
  }
}

const timerReseted = ref(false)
const resetTimer = () => {
  timerStarted.value = false
  timerPaused.value = false
  timerResumed.value = false
  timerReseted.value = true
}

const onTimerFinished = () => {
  // set all timer states (started, paused, resumed, reseted) to false
  resetTimer()

  tasksStore.activeTaskIncreaseCompletedQty()

  // increases finished pomodoro status by 1
  incrementStatistic()
  setNextModeId()
}

// reset current time and timer states when current mode changes
watch(
  () => currentModeId.value,
  () => {
    resetTimer()
  },
  { immediate: true }
)

provide('timer', {
  duration,
  timerStarted,
  timerPaused,
  timerResumed,
  timerReseted,
  toggleTimer,
  resetTimer,
  onTimerFinished
})

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

provide('statistic', statistic)
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
