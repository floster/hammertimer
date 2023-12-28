<script setup>
import { ref, computed, provide } from 'vue'
import AppHeader from './components/AppHeader.vue'
import TimerView from './components/TimerView.vue'
import TasksView from './components/TasksView.vue'
import AddTaskSection from './components/AddTaskSection.vue'

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

/**
 * add, delete, edit task
 */
const addTask = (task) => {
  tasks.value.push(task)
}

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

const editTask = (task) => {
  const taskIndex = tasks.value.findIndex((t) => t.id === task.id)
  tasks.value[taskIndex] = task
}

/**
 * provide data/funcs to components
 */
provide('tasks', tasks)
provide('task', { deleteTask, editTask })
provide('activeTask', { activeTaskId, activeTask, setActiveTask })
provide('totalTasksQty', totalTasksQty)
provide('totalCompletedTasksQty', totalCompletedTasksQty)
</script>

<template>
  <div class="bg-sky-800 min-h-screen text-white/85 text-red-300">
    <div class="container max-w-2xl mx-auto">
      <AppHeader />
      <main class="flex flex-col items-center px-2 md:px-16">
        <TimerView />
        <TasksView />
        <AddTaskSection @add-task="addTask" />
      </main>
    </div>
  </div>
</template>
