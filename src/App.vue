<script setup>
import { reactive } from 'vue'
import AppHeader from './components/AppHeader.vue'
import TimerView from './components/TimerView.vue'
import TasksView from './components/TasksView.vue'
import FormAddTask from './components/FormAddTask.vue'

const data = reactive({
  current: null,
  tasks: [
    {
      id: 1,
      title: 'Learning Vue3 basics using Vue official docs',
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
      completed: 1,
      current: false
    }
  ]
})

const addTask = (task) => {
  data.tasks.push(task)
}
</script>

<template>
  <div class="bg-cyan-800 min-h-screen text-white/85 text-red-300 dark:text-white/80">
    <div class="container max-w-2xl mx-auto">
      <AppHeader />
      <main class="flex flex-col items-center px-2 md:px-16">
        <TimerView />
        <TasksView :data="data" @set-active-task="(id) => (data.current = id)" />
        <FormAddTask @add-task="addTask" />
      </main>
    </div>
  </div>
</template>
