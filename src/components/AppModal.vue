<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref()

const emit = defineEmits(['confirm', 'cancel'])

const cancel = () => {
  dialog.value?.close()
  emit('cancel')
}

const confirm = () => {
  dialog.value?.close()
  emit('confirm')
}

const visible = ref(false)

const showModal = () => {
  dialog.value?.showModal()
  visible.value = true
}

defineExpose({
  show: showModal,
  close: () => dialog.value?.close(),
  visible
})
</script>

<template>
  <dialog ref="dialog" class="modal modal-bottom sm:modal-middle" @close="visible = false">
    <form v-if="visible" method="dialog" class="modal-box rounded-none p-4">
      <button class="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
      <slot />

      <div class="modal-action">
        <button class="btn" @click.prevent="cancel">cancel</button>
        <button class="btn btn-primary" @click.prevent="confirm">confirm</button>
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
