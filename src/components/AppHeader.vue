<script setup>
import AppLogo from './AppLogo.vue'
import AppButton from './AppButton.vue'
</script>

<template>
  <header class="flex items-center justify-between py-4 px-2 border-b border-b-black/15">
    <AppLogo />
    <div class="flex items-center gap-x-2">
      <AppButton
        class="btn-sm btn-ghost"
        text="Report"
        :sm-no-text="true"
        icon="ph:chart-line-fill"
      />
      <AppButton class="btn-sm btn-ghost" text="Settings" :sm-no-text="true" icon="ph:gear-fill" />
    </div>
  </header>
</template>
