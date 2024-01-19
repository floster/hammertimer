<script setup lang="ts">
import TheTimer from '@/components/TheTimer.vue'
import TimerControls from './TimerControls.vue'
import TimerModes from '@/components/TimerModes.vue'
import TaskActiveSection from '@/components/TaskActiveSection.vue'
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-y-10 w-full mt-10 px-2 pt-4 pb-6 md:p-6 md:pb-8 bg-white/10 rounded-lg shadow-md">
    <TimerModes />
    <TaskActiveSection />
    <TheTimer />
    <TimerControls />
  </section>
</template>
