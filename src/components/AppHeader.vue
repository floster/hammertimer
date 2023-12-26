<script setup>
import AppLogo from './AppLogo.vue'
import AppButton from './AppButton.vue'
</script>

<template>
  <header class="flex items-center justify-between py-4 border-b border-b-black/15 text-slate-200">
    <AppLogo />
    <div class="flex items-center gap-x-2">
      <AppButton text="Report" icon="ph:chart-line-fill" />
      <AppButton text="Settings" icon="ph:gear-fill" />
    </div>
  </header>
</template>
