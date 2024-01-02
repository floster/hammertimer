<script setup>
import { ref } from 'vue'
import AppLogo from '@/components/AppLogo.vue'
import AppButton from '@/components/AppButton.vue'
import AppModal from '@/components/AppModal.vue'

/**
 * modal
 */
const modal = ref()
console.log('modal', modal)
const showModal = () => modal.value?.show()
</script>

<template>
  <header class="flex items-center justify-between py-4 px-2 border-b border-b-black/15">
    <AppLogo />
    <div class="flex items-center gap-x-2">
      <AppButton
        class="btn-light-semi"
        text="Report"
        :sm-no-text="true"
        icon="ph:chart-line-fill"
      />
      <AppButton
        @click="showModal"
        class="btn-light-semi"
        text="Settings"
        :sm-no-text="true"
        icon="ph:gear-fill"
      />
    </div>
    <AppModal ref="modal">
      <p class="text-slate-900">Sure to delete {{ activeTaskTitle || 'default task' }}?</p>
    </AppModal>
  </header>
</template>
