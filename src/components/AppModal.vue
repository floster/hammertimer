<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

// template refs
const dialog = ref()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'close'): void
}>()

const confirm = () => {
  settings.instance?.close()
  emit('confirm')
}

const close = () => {
  settings.instance?.close()
}

const onDialogClick = (e: MouseEvent) => {
  if ((e.target as Element)?.tagName === 'DIALOG') {
    close()
  }
}

onMounted(() => {
  if (dialog.value) settings.setInstance(dialog.value)
})
</script>

<template>
  <dialog
    ref="dialog"
    class="modal modal-bottom sm:modal-middle backdrop:bg-info-content/80"
    @click="onDialogClick"
    @close="$emit('close')"
  >
    <form method="dialog" class="modal-box rounded-none p-4">
      <header class="flex items-center justify-between px-4 py-2 m-[-16px] mb-4 bg-info">
        <h2>Settings</h2>
      </header>
      <slot />

      <div class="modal-action">
        <button class="btn" @click.prevent="close">close</button>
        <button class="btn btn-primary" @click.prevent="confirm">save</button>
      </div>
    </form>
  </dialog>
</template>
