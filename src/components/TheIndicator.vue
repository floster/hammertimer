<script setup lang="ts">
import { computed } from 'vue'

/**
 * import stores
 */
import { useShortcutsStore } from '@/stores/shortcuts'
const shortcuts = useShortcutsStore()

type Props = {
  label: string
}
defineProps<Props>()

const activeClasses = computed(() => ({
  ' outline-2 outline-dotted outline-accent': shortcuts.isShortcutsVisible
}))
</script>

<template>
  <div class="indicator" :class="activeClasses">
    <span
      v-if="shortcuts.isShortcutsVisible"
      class="indicator-item indicator-start badge badge-accent badge-sm opacity-85"
      >{{ label }}</span
    >
    <slot />
  </div>
</template>
