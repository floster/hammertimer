<script setup>
import { ref } from 'vue'
import AppLogo from '@/components/AppLogo.vue'
import AppButton from '@/components/AppButton.vue'
import AppModal from '@/components/AppModal.vue'

/**
 * modal
 */
const modal = ref()
const showModal = () => modal.value?.show()
</script>

<template>
  <header class="flex items-center justify-between py-4 px-2 border-b border-b-neutral/50">
    <AppLogo />
    <div class="flex items-center gap-x-2">
      <AppButton
        class="btn-sm btn-ghost"
        text="Report"
        :sm-no-text="true"
        icon="ph:chart-line-fill"
      />
      <AppButton
        @click="showModal"
        class="btn-sm btn-ghost"
        text="Settings"
        :sm-no-text="true"
        icon="ph:gear-fill"
      />
    </div>
    <AppModal ref="modal">
      <p class="text-secondary-content">Sure to delete {{ activeTaskTitle || 'default task' }}?</p>
    </AppModal>
  </header>
</template>
