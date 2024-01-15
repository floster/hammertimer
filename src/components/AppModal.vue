<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

// template refs
const dialog = ref()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const confirm = () => {
  settings.instance?.close()
  emit('confirm')
}

const cancel = () => {
  settings.instance?.close()
  emit('cancel')
}

onMounted(() => {
  if (dialog.value) settings.setInstance(dialog.value)
})
</script>

<template>
  <dialog ref="dialog" class="modal modal-bottom sm:modal-middle">
    <form method="dialog" class="modal-box rounded-none p-4">
      <header class="flex items-center justify-between px-4 py-2 m-[-16px] mb-4 bg-info">
        <h2>Settings</h2>
        <button class="btn btn-sm btn-circle">✕</button>
      </header>
      <slot />

      <div class="modal-action">
        <button class="btn" @click.prevent="cancel">cancel</button>
        <button class="btn btn-primary" @click.prevent="confirm">save</button>
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
