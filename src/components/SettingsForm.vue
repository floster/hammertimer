<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { AvailableModesEnum } from '@/types'

import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

// used to generate inputs for durations
type DurationTemplate = {
  name: string
  value: AvailableModesEnum
  type: string
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

type Durations = {
  [key in AvailableModesEnum]: number
}

const durations = reactive<Durations>({
  hammer: 0,
  short_break: 0,
  long_break: 0
})

const longBreakInterval = ref(0)

const shortcutsTip = ref(false)

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const onSubmit = () => {
  settings.setLongBreakInterval(longBreakInterval.value)
  settings.setShortcutsTipInHeader(shortcutsTip.value)
  settings.setDuration(AvailableModesEnum.hammer, durations.hammer)
  settings.setDuration(AvailableModesEnum.short_break, durations.short_break)
  settings.setDuration(AvailableModesEnum.long_break, durations.long_break)

  emit('submit')
}

onMounted(() => {
  durations.hammer = settings.durations[AvailableModesEnum.hammer]
  durations.short_break = settings.durations[AvailableModesEnum.short_break]
  durations.long_break = settings.durations[AvailableModesEnum.long_break]

  longBreakInterval.value = settings.getLongBreakInterval
  shortcutsTip.value = settings.showShortcutsTipInHeader
})
</script>

<template>
  <form method="dialog" class="flex flex-col gap-y-4 md:gap-y-6" @submit="onSubmit">
    <div class="grid grid-cols-3 gap-x-4">
      <label
        v-for="label in durationsTemplate"
        :key="label.value"
        class="text-sm label-text mb-1"
        :for="label.value"
        >{{ label.name }}</label
      >
      <input
        v-for="input in durationsTemplate"
        :id="input.value"
        :key="input.value"
        v-model="durations[input.value]"
        :type="input.type"
        class="input input-bordered w-full" />
    </div>
    <label class="flex items-center justify-end gap-x-3 text-sm">
      <span class="label-text">pomodoros to long break:</span>
      <input v-model="longBreakInterval" type="number" class="input input-bordered w-20"
    /></label>
    <div class="form-control">
      <label class="flex items-center justify-end gap-3 cursor-pointer">
        <span class="label-text">show shortcuts tip in header</span>
        <input v-model="shortcutsTip" type="checkbox" class="checkbox checkbox-primary" />
      </label>
    </div>

    <div class="divider m-0"></div>

    <div class="flex justify-end">
      <button type="submit" class="btn btn-success min-w-32">save</button>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
