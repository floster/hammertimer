<script setup>
import { ref, watch } from 'vue'
import AppButton from '@/components/AppButton.vue'
import InputNumber from '@/components/InputNumber.vue'

const emit = defineEmits(['submit', 'cancel'])

const title = ref('')
const qty = ref(1)
const inputError = ref(false)

watch(title, () => {
  if (title.value !== '') inputError.value = false
})

const createTask = () => ({
  id: Date.now(),
  title: title.value,
  qty: qty.value,
  completed: 0,
  current: false
})

const resetForm = () => {
  title.value = ''
  qty.value = 1
  inputError.value = false
}

const handleSubmit = () => {
  if (title.value === '') {
    inputError.value = true
    return
  }
  const taskData = createTask()
  emit('submit', taskData)
  resetForm()
}

const handleCancel = () => {
  resetForm()
  emit('cancel')
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-y-8 p-4 bg-white/5 rounded-md shadow"
  >
    <div>
      <input
        v-focus
        type="text"
        v-model="title"
        placeholder="Task title"
        class="input w-full h-16 bg-white/5 border-0"
      />
      <span v-if="inputError" class="text-xs text-rose-400">think about a title for pomo</span>
    </div>
    <InputNumber v-model="qty" label="estimated pomodoros" />
    <div class="flex justify-end gap-x-4">
      <!-- cancel -->
      <AppButton @click="handleCancel" text="Cancel" class="h-12" />
      <!-- submit -->
      <AppButton type="submit" text="Add task" class="btn-light-semi h-12" />
    </div>
  </form>
</template>
