<script setup>
import { ref } from 'vue'
import AppButton from './AppButton.vue'

const emit = defineEmits(['addTask'])

const title = ref('')
const qty = ref(1)
const isFormVisible = ref(false)

const increaseQty = () => {
  qty.value++
}

const decreaseQty = () => {
  if (qty.value <= 1) return
  qty.value--
}

const handleSubmit = () => {
  const taskData = {
    id: Date.now(),
    title: title.value,
    qty: qty.value,
    completed: 0,
    current: false
  }
  emit('addTask', taskData)
  title.value = ''
  qty.value = 1
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
      class="w-full p-4 text-base font-bold text-white/60 hover:text-white/65 bg-black/10 hover:bg-black/15 border-dashed border-2 border-white/30"
    />
    <form
      v-if="isFormVisible"
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-y-8 p-4 bg-white/5 rounded-md shadow"
    >
      <input
        v-focus
        type="text"
        v-model="title"
        placeholder="Task title"
        class="input w-full bg-transparent border-0 border-b-2 rounded-none"
      />
      <label class="flex items-center justify-end gap-x-2">
        estimated pomodoros
        <input
          v-model="qty"
          type="text"
          placeholder="Qty"
          class="input appearance-none max-w-20 text-center"
        />
        <AppButton
          @click.stop="decreaseQty"
          class="btn-light-semi btn-square"
          icon="ph:minus-bold"
        />
        <AppButton
          @click.stop="increaseQty"
          class="btn-light-semi btn-square"
          icon="ph:plus-bold"
        />
      </label>
      <div class="flex justify-end gap-x-4">
        <AppButton @click="isFormVisible = false" text="Cancel" class="h-12" />
        <AppButton type="submit" text="Add task" class="btn-light-semi h-12" />
      </div>
    </form>
  </div>
</template>
