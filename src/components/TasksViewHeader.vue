<script setup>
import { inject } from 'vue'
import AppButton from './AppButton.vue'

const { activeTask } = inject('activeTask')
const totalCompletedTasksQty = inject('totalCompletedTasksQty')
const totalTasksQty = inject('totalTasksQty')
</script>

<template>
  <header>
    <h1 v-if="activeTask" class="text-center">
      <span class="text-slate-400">#1</span> {{ activeTask.title }}
    </h1>
    <div class="flex items-center justify-between py-3 border-b-2 border-b-white/60">
      <h2 class="text-sm md:text-base">
        Tasks
        <span class="text-white/60"
          >({{ totalCompletedTasksQty }}/<small>{{ totalTasksQty }}</small
          >)</span
        >
      </h2>
      <AppButton icon="ph:dots-three-outline-vertical-fill" class="btn-light-semi btn-square" />
    </div>
  </header>
</template>
