<script setup lang="ts">
type Props = {
  label: string
}
defineProps<Props>()
</script>

<template>
  <div class="indicator border-2 border-accent border-dotted rounded">
    <span class="indicator-item indicator-start badge badge-accent badge-sm opacity-85">{{
      label
    }}</span>
    <slot />
  </div>
</template>
