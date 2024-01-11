<script setup lang="ts">
import { ref } from 'vue'
import TaskForm from '@/components/TaskForm.vue'
import AppButton from '@/components/AppButton.vue'

const isFormVisible = ref(false)

const hideForm = () => {
  isFormVisible.value = false
}
</script>

<template>
  <div class="w-full my-6">
    <AppButton
      v-if="!isFormVisible"
      text="Add Task"
      icon="ph:plus-circle-fill"
      class="btn-ghost btn-xl w-full text-base border-2 border-dashed border-secondary"
      @click="isFormVisible = true"
    />
    <TaskForm v-else :data="null" @submit="hideForm" @cancel="hideForm" />
  </div>
</template>
