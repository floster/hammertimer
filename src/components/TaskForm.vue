<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { onKeyStroke } from '@vueuse/core'

import { ShortcutsEnum } from '@/types/shortcuts'

import AppButton from '@/components/AppButton.vue'
import InputNumber from '@/components/InputNumber.vue'

/**
 * import stores
 */
import { useTasksStore } from '@/stores/tasks'
const tasks = useTasksStore()

import { useShortcutsStore } from '@/stores/shortcuts'
const shortcuts = useShortcutsStore()

import type { Task } from '@/types'

interface Props {
  isVisible: boolean
  data: Task | null
}

/**
 * props
 */
const props = defineProps<Props>()

/**
 * emits
 */
const emit = defineEmits(['submit', 'cancel'])

/**
 * data
 */
const isFormVisible = ref(false)

const title = ref('')
const id = ref(0)
const qty = ref(1)
const completed = ref(0)

const inputError = ref(false)
const editMode = ref(false)

/**
 * clear input error when title field changes
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
  editMode.value ? tasks.updateTask(taskData) : tasks.addTask(taskData)
  emit('submit')
  _resetForm()
}

const handleCancel = () => {
  _resetForm()
  emit('cancel')
}

/**
 * keyboard shortcuts
 */
onKeyStroke(ShortcutsEnum.CLOSE_FORM, () => {
  if (isFormVisible.value) {
    handleCancel()
  }
})

watch(
  () => props.isVisible,
  () => {
    isFormVisible.value = props.isVisible

    // disable/enable shortcuts when form is open/closed
    if (props.isVisible) {
      shortcuts.disable()
    } else {
      shortcuts.enable()
    }
  }
)

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
    v-if="isFormVisible"
    class="flex flex-col gap-y-8 p-4 bg-primary-content/10 rounded-md shadow"
    @submit.prevent="handleSubmit">
    <div>
      <input
        v-model="title"
        v-focus
        type="text"
        placeholder="Task title"
        class="input input-ghost input-bordered md:input-lg w-full"
        :class="{ 'input-accent': inputError }" />
      <span v-if="inputError" class="flex justify-end pt-1 text-xs text-accent"
        >think about a title for pomo</span
      >
    </div>
    <InputNumber
      v-model="qty"
      :min="props.data?.completed || 0"
      :label="`hammers${props.data ? ' ' + props.data.completed + '/' : ':'}`" />
    <div class="flex justify-end gap-x-4">
      <!-- cancel -->
      <AppButton text="Cancel" class="btn-ghost" @click="handleCancel" />
      <!-- submit -->
      <AppButton type="submit" :text="editMode ? 'Save task' : 'Add task'" class="btn-success" />
    </div>
  </form>
</template>
