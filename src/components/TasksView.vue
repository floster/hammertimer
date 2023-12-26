<script setup>
import { computed } from 'vue'
import AppButton from './AppButton.vue'
import TasksList from './TasksList.vue'

const tasks = [
  {
    id: 1,
    title: 'Learning Vue3 basics',
    qty: 4,
    completed: 2,
    current: false
  },
  {
    id: 2,
    title: 'Learning Vue3 composition API',
    qty: 2,
    completed: 1,
    current: true
  },
  {
    id: 3,
    title: 'Learning Vue3 reactivity',
    qty: 1,
    completed: 0,
    current: false
  }
]

const currentTask = computed(() => tasks.find((task) => task.current))
const totalTasks = computed(() => tasks.reduce((acc, task) => acc + task.qty, 0))
const totalCompletedTasks = computed(() => tasks.reduce((acc, task) => acc + task.completed, 0))
</script>

<template>
  <section class="w-full my-6">
    <header>
      <h1 class="text-center"><span class="text-slate-400">#1</span> {{ currentTask.title }}</h1>
      <div class="flex items-center justify-between py-3 border-b-2 border-b-white/60">
        <h2>
          Tasks
          <span class="text-white/60"
            >({{ totalCompletedTasks }}/<small>{{ totalTasks }}</small
            >)</span
          >
        </h2>
        <AppButton icon="ph:dots-three-bold" class="btn-square" />
      </div>
    </header>
    <TasksList :tasks="tasks" />
    <AppButton
      text="Add Task"
      icon="ph:plus-circle-fill"
      class="w-full p-4 text-base font-bold text-white/60 hover:text-white/65 bg-black/10 hover:bg-black/15 border-dashed border-2 border-white/30"
    />
  </section>
</template>
