<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'

import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()
</script>

<template>
  <div class="tasks-menu relative group">
    <AppButton icon="ph:dots-three-outline-vertical-fill" class="btn-sm btn-square btn-primary" />
    <!-- indicator on tasks menu button -->
    <div
      v-if="tasks.isCompletedHidden || tasks.isCompletedInTheEnd"
      class="w-2 h-2 rounded-full bg-warning/80 absolute z-0 -top-1 -right-1"></div>
    <ul
      class="absolute z-10 right-0 flex flex-col gap-3 bg-secondary-content/80 rounded-box max-h-0 overflow-hidden p-0 group-hover:max-h-max group-hover:p-3 group-hover:overflow-auto transition-all">
      <li class="flex items-center gap-x-1">
        <div class="form-control">
          <label
            class="label cursor-pointer gap-x-4 hover:text-info"
            :class="{ 'pointer-events-none text-secondary': tasks.oneOrLessTask }">
            <input
              v-model="tasks.isCompletedHidden"
              :disabled="tasks.oneOrLessTask"
              type="checkbox"
              class="checkbox checkbox-primary" />
            <span class="whitespace-nowrap">hide completed</span>
          </label>
        </div>
      </li>
      <li class="flex items-center gap-x-1">
        <label
          class="label cursor-pointer gap-x-4 hover:text-info"
          :class="{
            'text-secondary': tasks.isCompletedHidden,
            'pointer-events-none text-secondary': tasks.oneOrLessTask
          }">
          <input
            v-model="tasks.isCompletedInTheEnd"
            type="checkbox"
            class="checkbox checkbox-primary"
            :disabled="tasks.isCompletedHidden || tasks.oneOrLessTask" />
          <span class="whitespace-nowrap">down completed</span>
        </label>
      </li>
      <li>
        <AppButton
          :disabled="tasks.noTasks"
          text="Clear All"
          icon="ph:trash-fill"
          class="btn-sm btn-error w-full"
          @click="tasks.removeAllTasks" />
      </li>
    </ul>
  </div>
</template>
