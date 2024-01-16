<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/AppButton.vue'

/**
 * emits
 */
defineEmits({
  delete: null,
  edit: null
})

/**
 * edit menu
 */
const editMenu = ref(false)
const toggleEditMenu = () => {
  editMenu.value = !editMenu.value
}
</script>

<template>
  <!-- task item controls -->
  <div class="flex gap-x-2 shrink-0 group">
    <div
      class="flex gap-x-2 max-w-0 overflow-hidden transition-all group-hover:max-w-fit group-hover:overflow-auto"
    >
      <!-- button delete task -->
      <AppButton text="del" class="btn-sm btn-error" @click="$emit('delete')" />
      <!-- button edit task -->
      <AppButton text="edit" class="btn-sm btn-primary" @click="$emit('edit')" />
    </div>
    <!-- button toggle edit menu -->
    <AppButton
      :icon="`${editMenu ? 'ph:x-bold' : 'ph:dots-three-outline-vertical-fill'}`"
      :class="{
        'btn-sm btn-square btn-primary opacity-30 hover:opacity-70': true,
        'opacity-70': editMenu
      }"
    />
  </div>
</template>
