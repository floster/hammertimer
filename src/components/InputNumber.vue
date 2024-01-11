<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'

interface Props {
  modelValue: number
  label?: string
  min?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Qty',
  min: 1,
  max: 10
})

const emit = defineEmits(['update:modelValue'])

const inc = () => {
  if (props.modelValue >= props.max) return
  emit('update:modelValue', props.modelValue + 1)
}

const dec = () => {
  if (props.modelValue <= props.min) return
  emit('update:modelValue', props.modelValue === 1 ? 1 : props.modelValue - 1)
}
</script>

<template>
  <label class="flex items-center justify-end gap-x-2">
    {{ label }}
    <input
      :value="modelValue"
      type="text"
      placeholder="Qty"
      class="input input-ghost input-bordered input-lg max-w-20 text-center"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <AppButton class="btn-primary btn-square" icon="ph:minus-bold" @click.stop="dec" />
    <AppButton class="btn-primary btn-square" icon="ph:plus-bold" @click.stop="inc" />
  </label>
</template>
