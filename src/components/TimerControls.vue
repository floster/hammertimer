<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'

/*
  import timer store
*/
import { useTimerStore } from '@/stores/timer'
const timer = useTimerStore()
</script>

<template>
  <div class="flex items-center gap-x-2">
    <!-- reset current button -->
    <AppButton
      v-if="timer.isStarted"
      icon="ph:stop-fill"
      class="btn-ghost"
      :class="{
        'opacity-0 pointer-events-none': !timer.isPaused,
        'opacity-20 hover:opacity-80': timer.isPaused
      }"
      @click="timer.reset()" />
    <!-- start/pause button -->
    <AppButton
      :icon="timer.isActive ? 'ph:pause-fill' : 'ph:play-fill'"
      class="btn-warning btn-lg px-16"
      @click="timer.toggle()" />
    <!-- force finish current button -->
    <AppButton
      v-if="timer.isStarted"
      icon="ph:arrow-line-right-bold"
      class="btn-ghost opacity-20 hover:opacity-80"
      @click="timer.onTimerFinished" />
  </div>
</template>
