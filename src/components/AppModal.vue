<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import AppButton from './AppButton.vue'
const settings = useSettingsStore()

// template refs
const dialog = ref()

defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onClose = () => {
  emit('close')
}

// close dialog when clicking outside of it
const onDialogClick = (e: MouseEvent) => {
  if ((e.target as Element)?.tagName === 'DIALOG') {
    onClose()
  }
}

onMounted(() => {
  // setting instance of dialog to settings store
  // so we can open/close it from anywhere
  if (dialog.value) settings.setInstance(dialog.value)
})
</script>

<template>
  <dialog
    ref="dialog"
    class="modal modal-bottom sm:modal-middle backdrop:bg-info-content/80"
    @click="onDialogClick"
    @close="onClose">
    <div class="modal-box p-0">
      <header v-if="title" class="p-4 bg-primary text-primary-content">{{ title }}</header>
      <AppButton
        class="btn-sm btn-square btn-ghost text-lg text-primary-content absolute top-3 right-4"
        icon="ph:x-bold"
        @click="onClose" />
      <div class="p-4">
        <slot :opened="settings.isSettingsOpen" />
      </div>
    </div>
  </dialog>
</template>
