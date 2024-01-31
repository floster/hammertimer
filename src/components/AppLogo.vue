<script setup lang="ts">
import { SITE_NAME } from '@/config/app'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

import { ShortcutsEnum } from '@/types/shortcuts'

import TheIndicator from '@/components/TheIndicator.vue'

const router = useRouter()
const route = useRoute()

const isHomePage = computed(() => route.path === '/')

const onLogoClick = () => {
  !isHomePage.value && router.push('/')
}
</script>

<template>
  <TheIndicator :label="ShortcutsEnum.HOME">
    <section class="flex flex-col">
      <h1
        class="flex items-end gap-x-1"
        :class="{ 'cursor-pointer': !isHomePage }"
        @click="onLogoClick">
        <img src="/hammertimer.svg" alt="pomofocus logo" width="24" height="24" />
        <p class="text-xl leading-5 text-center text-inherit font-bold">{{ SITE_NAME }}</p>
      </h1>
      <p v-if="settings.showShortcutsTipInHeader" class="text-xs text-right opacity-35">
        press <kbd class="kbd kbd-sm">h</kbd> for help
      </p>
    </section>
  </TheIndicator>
</template>
