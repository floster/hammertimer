<script setup lang="ts">
import { reactive } from 'vue'
import AppModal from '@/components/AppModal.vue'
import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

import { AvailableModesEnum } from '@/types'

type DurationTemplate = {
  name: string
  value: AvailableModesEnum
  type: string
}

type Durations = {
  [key in AvailableModesEnum]: number
}

const durationsTemplate = [
  {
    name: 'Hammertime',
    value: AvailableModesEnum.hammer,
    type: 'number'
  },
  {
    name: 'Short',
    value: AvailableModesEnum.short_break,
    type: 'number'
  },
  {
    name: 'Long',
    value: AvailableModesEnum.long_break,
    type: 'number'
  }
] as DurationTemplate[]

const durations = reactive<Durations>({
  hammer: settings.getDuration(AvailableModesEnum.hammer),
  short_break: settings.getDuration(AvailableModesEnum.short_break),
  long_break: settings.getDuration(AvailableModesEnum.long_break)
})

const onConfirm = () => {
  settings.setDuration(AvailableModesEnum.hammer, durations.hammer)
  settings.setDuration(AvailableModesEnum.short_break, durations.short_break)
  settings.setDuration(AvailableModesEnum.long_break, durations.long_break)
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
