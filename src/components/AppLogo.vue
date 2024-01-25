<script setup lang="ts">
import { SITE_NAME } from '@/config/app'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isHomePage = computed(() => route.path === '/')

const onLogoClick = () => {
  !isHomePage.value && router.push('/')
}
</script>

<template>
  <h1
    class="flex items-end gap-x-1"
    :class="{ 'cursor-pointer': !isHomePage }"
    @click="onLogoClick">
    <img src="/hammertimer.svg" alt="pomofocus logo" width="24" height="24" />
    <p class="text-xl leading-5 text-center text-inherit font-bold">{{ SITE_NAME }}</p>
  </h1>
</template>
