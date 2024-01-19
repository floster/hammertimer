<script setup lang="ts">
import { SITE_NAME } from '@/config/app'
</script>

<template>
  <h1 class="flex items-end gap-x-1">
    <img src="/pomofocus-logo.svg" alt="pomofocus logo" width="24" height="24" />
    <p class="text-xl leading-5 text-center text-inherit font-bold">{{ SITE_NAME }}</p>
  </h1>
</template>
