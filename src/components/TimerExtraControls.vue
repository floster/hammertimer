<script setup lang="ts">
import { Icon } from '@iconify/vue'

/*
  import stores
*/
import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()
</script>

<template>
  <div class="flex flex-col gap-y-5 md:gap-y-12">
    <button
      class="btn btn-ghost btn-square btn-sm"
      :title="settings.getAutoNextMode ? 'auto-next mode is enabled' : 'auto-next mode is disabled'"
      @click="settings.toggleAutoNextMode()">
      <Icon
        icon="mdi:auto-start"
        class="text-xl"
        :class="settings.getAutoNextMode ? 'text-warning' : 'text-secondary'" />
    </button>
    <button
      class="btn btn-ghost btn-square btn-sm"
      :title="
        settings.playSoundOnFinish
          ? 'play sound on timer finished'
          : 'do not play sound on timer finished'
      "
      @click="settings.togglePlaySoundOnFinish()">
      <Icon
        :icon="settings.playSoundOnFinish ? 'ph:speaker-high' : 'ph:speaker-simple-x'"
        class="text-xl"
        :class="settings.playSoundOnFinish ? 'text-warning' : 'text-secondary'" />
    </button>
  </div>
</template>
