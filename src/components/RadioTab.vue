<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label :class="`btn btn-ghost ${modelValue === data.value ? 'btn-ghost-active' : ''}`">
    <input
      type="radio"
      :value="data.value"
      :checked="modelValue"
      @click="$emit('update:modelValue', $event.target.value)"
      class="appearance-none"
    />{{ data.name }}</label
  >
</template>
