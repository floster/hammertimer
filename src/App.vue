<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'

import useShortcuts from '@/composables/shortcuts'
const shortcuts = useShortcuts()

import { useTasksStore } from '@/stores/tasks'
const tasksStore = useTasksStore()

import { useSettingsStore } from '@/stores/settings'
const settingsStore = useSettingsStore()

import { useStatsStore } from '@/stores/stats'
const statsStore = useStatsStore()

onMounted(() => {
  shortcuts.addShortcutsListeners()

  // Get tasks from Firebase
  tasksStore.listenerForTasksFromFirebase()

  // Get settings from Firebase
  settingsStore.getSettingsFromFirebase()

  // Get stats from Firebase
  statsStore.getStatsFromFirebase()
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
