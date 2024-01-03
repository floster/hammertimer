<script setup>
import { ref } from 'vue'
import AddTaskForm from '@/components/AddTaskForm.vue'
import AppButton from '@/components/AppButton.vue'

const emit = defineEmits(['addTask'])

const isFormVisible = ref(false)

const formSubmit = (task) => {
  emit('addTask', task)
  isFormVisible.value = false
}

const formCancel = () => {
  isFormVisible.value = false
}
</script>

<template>
  <div class="w-full my-6">
    <AppButton
      v-if="!isFormVisible"
      @click="isFormVisible = true"
      text="Add Task"
      icon="ph:plus-circle-fill"
      class="btn-ghost btn-xl w-full text-base border-2 border-dashed border-secondary"
    />
    <AddTaskForm v-else @submit="formSubmit" @cancel="formCancel" />
  </div>
</template>
