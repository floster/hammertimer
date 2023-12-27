<script setup>
import { ref, computed, provide } from 'vue'
import AppHeader from './components/AppHeader.vue'
import TimerView from './components/TimerView.vue'
import TasksView from './components/TasksView.vue'
import FormAddTask from './components/FormAddTask.vue'

const tasks = ref([
  {
    id: 1,
    title: 'Learning Vue3 basics using Vue official docs',
    qty: 4,
    completed: 2
  },
  {
    id: 2,
    title: 'Learning Vue3 composition API',
    qty: 2,
    completed: 1
  },
  {
    id: 3,
    title: 'Learning Vue3 reactivity',
    qty: 1,
    completed: 1
  }
])

/**
 * dealing with active task
 */
const activeTaskId = ref(null)
const activeTask = computed(() => tasks.value.filter((task) => task.id === activeTaskId.value)[0])
const setActiveTask = (id) => {
  activeTaskId.value = id
}

/**
 * compute tasks qty
 */
const totalTasksQty = computed(() => tasks.value.reduce((acc, task) => acc + task.qty, 0))
const totalCompletedTasksQty = computed(() =>
  tasks.value.reduce((acc, task) => acc + task.completed, 0)
)

const addTask = (task) => {
  tasks.value.push(task)
}

/**
 * provide data/funcs to components
 */
provide('tasks', tasks)
provide('activeTask', { activeTaskId, activeTask, setActiveTask })
provide('totalTasksQty', totalTasksQty)
provide('totalCompletedTasksQty', totalCompletedTasksQty)
</script>

<template>
  <div class="bg-cyan-800 min-h-screen text-white/85 text-red-300 dark:text-white/80">
    <div class="container max-w-2xl mx-auto">
      <AppHeader />
      <main class="flex flex-col items-center px-2 md:px-16">
        <TimerView />
        <TasksView />
        <FormAddTask @add-task="addTask" />
      </main>
    </div>
  </div>
</template>
