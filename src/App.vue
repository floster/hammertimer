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
    <div class="container w-full max-w-2xl mx-auto">
      <AppHeader />
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.1s,
    transform 0.1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
