<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppButton from '@/components/AppButton.vue'

import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()

const showMenu = ref(false)

const hideOnClickOutside = (e) => {
  if (!e.target.closest('.tasks-menu')) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', hideOnClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', hideOnClickOutside)
})
</script>

<template>
  <div class="tasks-menu relative">
    <AppButton
      icon="ph:dots-three-outline-vertical-fill"
      class="btn-sm btn-square btn-primary"
      @click="showMenu = !showMenu"
    />
    <ul
      v-if="showMenu"
      class="absolute right-0 flex flex-col gap-3 p-3 bg-secondary-content/80 rounded-box"
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
