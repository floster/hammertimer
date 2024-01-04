<script setup>
import { inject } from 'vue'
import RadioTab from '@/components/RadioTab.vue'

const timerModes = inject('timerModes')
</script>

<template>
  <nav class="flex items-center gap-x-2">
    <RadioTab v-for="mode in timerModes" :key="mode.id" :data="mode" />
  </nav>
</template>
