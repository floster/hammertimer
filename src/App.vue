<script setup>
import AppHeader from './components/AppHeader.vue'
import TimerView from './components/TimerView.vue'
</script>

<template>
  <div class="bg-cyan-700 min-h-screen">
    <div class="container max-w-2xl mx-auto">
      <AppHeader />
      <main class="flex flex-col items-center px-16">
        <TimerView />
      </main>
    </div>
  </div>
</template>
