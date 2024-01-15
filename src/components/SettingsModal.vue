<script setup lang="ts">
import AppModal from '@/components/AppModal.vue'
// import { useSettingsStore } from '@/stores/settings'
// const settings = useSettingsStore()

const onConfirm = () => {
  console.log('confirmed')
}
const onCancel = () => {
  console.log('canceled')
}
</script>

<template>
  <AppModal @confirm="onConfirm" @close="onCancel">
    <p class="text-secondary-content">Sure to delete?</p>
  </AppModal>
</template>
