<script setup>
import AppHeader from './components/AppHeader.vue'
import TimerView from './components/TimerView.vue'
import TasksView from './components/TasksView.vue'
</script>

<template>
  <div class="bg-cyan-800 min-h-screen text-white/85 text-red-300 dark:text-white/80">
    <div class="container max-w-2xl mx-auto">
      <AppHeader />
      <main class="flex flex-col items-center px-16">
        <TimerView />
        <TasksView />
      </main>
    </div>
  </div>
</template>
