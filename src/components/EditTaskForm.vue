<script setup>
import { ref, watch, inject } from 'vue'
import AppButton from '@/components/AppButton.vue'
import InputNumber from '@/components/InputNumber.vue'

/**
 * injects
 */
const { editTask } = inject('task')

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const title = ref(props.task.title)
const qty = ref(props.task.qty)
const inputError = ref(false)

watch(title, () => {
  if (title.value !== '') inputError.value = false
})

const createTask = () => ({
  id: props.task.id,
  title: title.value,
  qty: qty.value,
  completed: props.task.completed
})

const handleSubmit = () => {
  if (title.value === '') {
    inputError.value = true
    return
  }
  const taskData = createTask()
  editTask(taskData)
  emit('close')
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
    <InputNumber
      v-model="qty"
      :min="task.completed"
      :label="`estimated pomodoros ⎯ ${task.completed}/`"
    />
    <div class="flex justify-end gap-x-4">
      <!-- cancel -->
      <AppButton @click="$emit('close')" text="Cancel" class="h-12" />
      <!-- submit -->
      <AppButton type="submit" text="Save task" class="btn-light-semi h-12" />
    </div>
  </form>
</template>
