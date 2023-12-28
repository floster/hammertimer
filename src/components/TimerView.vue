<script setup>
import { ref, computed, watch } from 'vue'
import AppButton from './AppButton.vue'
import RadioTab from './RadioTab.vue'
import TheTimer from './TheTimer.vue'

const modes = [
  { name: 'Pomodoro', value: 'pomodoro', duration: 25 },
  { name: 'Break', value: 'short_break', duration: 5 },
  { name: 'Long Break', value: 'long_break', duration: 15 }
]

/**
 * current mode values
 */
const currentModeId = ref(modes[0].value)
const currentMode = computed(() => modes.find((mode) => mode.value === currentModeId.value))
const curentMinutes = computed(() => currentMode.value.duration)

/**
 * timer's states
 */
const timerOn = ref(false)
const timerReseted = ref(true)

const startTimer = () => {
  timerReseted.value = false
  timerOn.value = !timerOn.value
}
const resetTimer = () => {
  timerReseted.value = true
  timerOn.value = false
}

watch(
  () => currentModeId.value,
  () => resetTimer()
)
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-y-10 w-full mt-10 px-2 pt-4 pb-6 md:p-6 md:pb-8 bg-white/10 rounded-lg"
  >
    <nav class="flex items-center gap-x-2">
      <RadioTab v-for="mode in modes" :key="mode.value" v-model="currentModeId" :data="mode" />
    </nav>
    <TheTimer :minutes="curentMinutes" :start="timerOn" :reset="timerReseted" />
    <div class="flex items-center gap-x-2">
      <!-- start/pause button -->
      <AppButton
        @click="startTimer"
        :icon="timerOn ? 'ph:pause-fill' : 'ph:play-fill'"
        class="btn-solid btn-xl"
      />
      <!-- reset button -->
      <AppButton
        v-if="timerOn || !timerReseted"
        @click="resetTimer"
        icon="ph:arrow-counter-clockwise-bold"
        class="btn-solid"
      />
    </div>
  </section>
</template>
