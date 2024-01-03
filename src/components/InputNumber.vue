<script setup>
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    default: 'Qty: '
  },
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 10
  }
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
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="Qty"
      class="input input-ghost input-bordered input-lg max-w-20 text-center"
    />
    <AppButton @click.stop="dec" class="btn-primary btn-square" icon="ph:minus-bold" />
    <AppButton @click.stop="inc" class="btn-primary btn-square" icon="ph:plus-bold" />
  </label>
</template>
