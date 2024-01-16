<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'

import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()
</script>

<template>
  <div class="tasks-menu relative group">
    <AppButton icon="ph:dots-three-outline-vertical-fill" class="btn-sm btn-square btn-primary" />
    <ul
      class="absolute z-10 right-0 flex flex-col gap-3 bg-secondary-content/80 rounded-box max-h-0 overflow-hidden p-0 group-hover:max-h-max group-hover:p-3 group-hover:overflow-auto transition-all"
    >
      <li class="flex items-center gap-x-1 hover:text-info cursor-pointer">
        <div class="form-control">
          <label class="label cursor-pointer gap-x-4">
            <input
              v-model="tasks.isCompletedHidden"
              type="checkbox"
              class="checkbox checkbox-primary"
            />
            <span class="label-text whitespace-nowrap">hide completed</span>
          </label>
        </div>
      </li>
      <li class="flex items-center gap-x-1 hover:text-info cursor-pointer">
        <label class="label cursor-pointer gap-x-4">
          <input
            v-model="tasks.isCompletedInTheEnd"
            type="checkbox"
            class="checkbox checkbox-primary"
          />
          <span class="label-text whitespace-nowrap">down completed</span>
        </label>
      </li>
    </ul>
  </div>
</template>
