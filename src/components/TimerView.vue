<script setup lang="ts">
import TheTimer from '@/components/TheTimer.vue'
import TimerControls from '@/components/TimerControls.vue'
import TimerModes from '@/components/TimerModes.vue'

/*
  import stores
*/
import { useTimerStore } from '@/stores/timer'
const timerStore = useTimerStore()
</script>

<template>
  <section
    class="relative z-30 flex flex-col items-center justify-center gap-y-10 w-full mt-10 px-2 pt-4 pb-6 md:p-6 md:pb-8 bg-white/10 rounded-lg shadow-md">
    <TimerModes />
    <TheTimer />
    <TimerControls />
  </section>
  <div
    v-if="timerStore.isActive"
    class="absolute z-20 top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur"></div>
</template>
