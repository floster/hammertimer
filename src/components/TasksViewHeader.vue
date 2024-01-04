<script setup>
import { inject } from 'vue'
import AppButton from '@/components/AppButton.vue'

const { totalTasksQty, totalCompletedTasksQty } = inject('tasksQty')
</script>

<template>
  <header class="flex flex-col gap-y-8">
    <div class="flex items-center justify-between py-3 border-b-2 border-b-neutral-content/40">
      <h2 class="text-sm md:text-base">
        Tasks
        <span class="text-neutral-content/50"
          >({{ totalCompletedTasksQty }}/<small>{{ totalTasksQty }}</small
          >)</span
        >
      </h2>
      <AppButton icon="ph:dots-three-outline-vertical-fill" class="btn-sm btn-square btn-primary" />
    </div>
  </header>
</template>
