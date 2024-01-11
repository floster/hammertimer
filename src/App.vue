<script setup>
import { watch } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import TimerView from '@/components/TimerView.vue'
import TasksView from '@/components/TasksView.vue'
import AddTaskSection from '@/components/AddTaskSection.vue'

/*
  import timer store
*/
import { useTimerStore } from '@/stores/timer'
const timer = useTimerStore()

/*
  import pomodoro store
*/
import { usePomodoroStore } from '@/stores/pomodoro'
const pomodoro = usePomodoroStore()

// reset current time and timer states when current mode changes
watch(
  () => pomodoro.currentModeId,
  () => {
    timer.resetTimer()
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
