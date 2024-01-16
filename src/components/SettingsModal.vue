<script setup lang="ts">
import { reactive } from 'vue'
import AppModal from '@/components/AppModal.vue'
import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

import type { AvailableModes } from '@/types'

type DurationTemplate = {
  name: string
  value: AvailableModes
  type: string
}

type Durations = {
  [key in AvailableModes]: number
}

const durationsTemplate = [
  {
    name: 'Pomodoro',
    value: 'pomodoro',
    type: 'number'
  },
  {
    name: 'Short Break',
    value: 'short_break',
    type: 'number'
  },
  {
    name: 'Long Break',
    value: 'long_break',
    type: 'number'
  }
] as DurationTemplate[]

const durations = reactive<Durations>({
  pomodoro: settings.getDuration('pomodoro'),
  short_break: settings.getDuration('short_break'),
  long_break: settings.getDuration('long_break')
})

const onConfirm = () => {
  settings.setDuration('pomodoro', durations.pomodoro)
  settings.setDuration('short_break', durations.short_break)
  settings.setDuration('long_break', durations.long_break)
}
</script>

<template>
  <AppModal @confirm="onConfirm">
    <div class="divider divider-neutral">Durations:</div>
    <div class="grid grid-cols-3 gap-x-4">
      <label
        v-for="label in durationsTemplate"
        :key="label.value"
        class="text-sm text-neutral-content mb-1"
        :for="label.value"
        >{{ label.name }}</label
      >
      <input
        v-for="input in durationsTemplate"
        :id="input.value"
        :key="input.value"
        v-model="durations[input.value]"
        :type="input.type"
        class="input input-bordered w-full"
      />
    </div>
  </AppModal>
</template>
