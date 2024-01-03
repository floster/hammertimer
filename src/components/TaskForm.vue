<script setup>
import { ref, watch, inject, onMounted } from 'vue'
import AppButton from '@/components/AppButton.vue'
import InputNumber from '@/components/InputNumber.vue'

/**
 * injects
 */
const { addTask, editTask } = inject('task')

/**
 * props
 */
const props = defineProps({
  data: {
    type: Object,
    required: false
  }
})

/**
 * emits
 */
const emit = defineEmits(['submit', 'cancel'])

/**
 * data
 */
const title = ref('')
const id = ref(null)
const qty = ref(1)
const completed = ref(0)

const inputError = ref(false)
const editMode = ref(false)

/**
 * clear input error when title changes
 */
watch(title, () => {
  if (title.value !== '') inputError.value = false
})

/**
 * task constructor
 */
const _createTask = () => ({
  id: id.value || Date.now(),
  title: title.value,
  qty: qty.value,
  completed: completed.value || 0
})

const _resetForm = () => {
  title.value = ''
  qty.value = 1
  inputError.value = false
}

const handleSubmit = () => {
  if (title.value === '') {
    inputError.value = true
    return
  }
  const taskData = _createTask()
  editMode.value ? editTask(taskData) : addTask(taskData)
  emit('submit')
  _resetForm()
}

const handleCancel = () => {
  _resetForm()
  emit('cancel')
}

onMounted(() => {
  if (props.data) {
    editMode.value = true
    id.value = props.data.id
    title.value = props.data.title
    qty.value = props.data.qty
    completed.value = props.data.completed
  }
})
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-y-8 p-4 bg-primary-content/10 rounded-md shadow"
  >
    <div>
      <input
        v-focus
        type="text"
        v-model="title"
        placeholder="Task title"
        class="input input-ghost input-bordered input-lg w-full"
        :class="{ 'input-accent': inputError }"
      />
      <span v-if="inputError" class="flex justify-end pt-1 text-xs text-accent"
        >think about a title for pomo</span
      >
    </div>
    <InputNumber
      v-model="qty"
      :min="props.data?.completed || 0"
      :label="`estimated pomodoros: ${props.data ? props.data.completed + ' / ' : ''}`"
    />
    <div class="flex justify-end gap-x-4">
      <!-- cancel -->
      <AppButton @click="handleCancel" text="Cancel" class="btn-ghost" />
      <!-- submit -->
      <AppButton type="submit" :text="editMode ? 'Save task' : 'Add task'" class="btn-success" />
    </div>
  </form>
</template>
