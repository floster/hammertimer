<script setup>
import { ref, computed } from 'vue'
import AppButton from './AppButton.vue'

const modes = [
  { name: 'Pomodoro', value: 'pomodoro', duration: 25_000 },
  { name: 'Short Break', value: 'short_break', duration: 5_000 },
  { name: 'Long Break', value: 'long_break', duration: 15_000 }
]

const selectedMode = ref(modes[0].value)
const timerMinutes = ref(25)
const timerSeconds = ref(0)

const normalizedSeconds = computed(() =>
  timerSeconds.value < 10 ? `0${timerSeconds.value}` : timerSeconds.value
)
const normalizedMinutes = computed(() =>
  timerMinutes.value < 10 ? `0${timerMinutes.value}` : timerMinutes.value
)
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-y-10 w-full mt-10 p-6 pb-8 bg-white/10 rounded-lg"
  >
    <nav class="flex items-center gap-x-1">
      <label
        v-for="mode in modes"
        :key="mode.value"
        :class="`btn btn-ghost ${selectedMode === mode.value ? 'btn-ghost-active' : ''}`"
      >
        <input type="radio" :value="mode.value" v-model="selectedMode" class="appearance-none" />{{
          mode.name
        }}</label
      >
    </nav>
    <div class="flex items-center gap-x-2 text-8xl font-bold">
      <span>{{ normalizedMinutes }}</span>
      <span>:</span>
      <span>{{ normalizedSeconds }}</span>
    </div>
    <AppButton text="Start" class="btn-solid btn-xl" />
  </section>
</template>
