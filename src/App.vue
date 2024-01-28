<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'

import useShortcuts from '@/composables/shortcuts'
const shortcuts = useShortcuts()

onMounted(() => {
  shortcuts.addShortcutsListeners()
})
</script>

<template>
  <div class="bg-primary min-h-screen text-white/85 text-red-300">
    <div class="container max-w-2xl mx-auto">
      <AppHeader />
      <router-view></router-view>
    </div>
  </div>
</template>
