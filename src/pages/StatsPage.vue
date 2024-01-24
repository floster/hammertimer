<script setup lang="ts">
import MainWrapper from '@/components/MainWrapper.vue'

import { useTitle } from '@vueuse/core'

import { SITE_NAME } from '@/config/app'

useTitle(`stats - ${SITE_NAME}`)
</script>

<template>
  <MainWrapper>statistic page</MainWrapper>
</template>
