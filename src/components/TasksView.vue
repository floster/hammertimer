<script setup>
import { computed } from 'vue'
import AppButton from './AppButton.vue'
import TasksList from './TasksList.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

defineEmits(['setActiveTask'])

const currentTask = computed(() => props.data.tasks.find((task) => task.id === props.data.current))
const totalTasks = computed(() => props.data.tasks.reduce((acc, task) => acc + task.qty, 0))
const totalCompletedTasks = computed(() =>
  props.data.tasks.reduce((acc, task) => acc + task.completed, 0)
)
</script>

<template>
  <section class="w-full mt-6">
    <header>
      <h1 v-if="data.current" class="text-center">
        <span class="text-slate-400">#1</span> {{ currentTask.title }}
      </h1>
      <div class="flex items-center justify-between py-3 border-b-2 border-b-white/60">
        <h2>
          Tasks
          <span class="text-white/60"
            >({{ totalCompletedTasks }}/<small>{{ totalTasks }}</small
            >)</span
          >
        </h2>
        <AppButton icon="ph:dots-three-bold" class="btn-semi btn-square" />
      </div>
    </header>
    <TasksList
      :tasks="data.tasks"
      :current="data.current"
      @setActiveTask="(id) => $emit('setActiveTask', id)"
    />
  </section>
</template>
