<script setup>
import { ref, reactive, computed, provide, watch } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import TimerView from '@/components/TimerView.vue'
import TasksView from '@/components/TasksView.vue'
import AddTaskSection from '@/components/AddTaskSection.vue'

/**
 * timer modes
 */
const timerModes = [
  { id: 0, name: 'Pomodoro', value: 'pomodoro', duration: 1 },
  { id: 1, name: 'Break', value: 'short_break', duration: 5 },
  { id: 2, name: 'Long Break', value: 'long_break', duration: 15 }
]
provide('timerModes', timerModes)

const _calcNextModeId = () => {
  if (currentModeId.value === 0) return 1
  if (currentModeId.value === 1) return 2
  if (currentModeId.value === 2) return 0
}

const currentModeId = ref(0)
const setNextModeId = () => {
  currentModeId.value = _calcNextModeId()
}

const getCurrentModeValue = () => {
  return timerModes[currentModeId.value].value
}

provide('currentMode', { currentModeId, setNextModeId })

/**
 * timer
 */
const duration = computed(() => timerModes[currentModeId.value].duration)

const timerStarted = ref(false)
const startTimer = () => {
  timerStarted.value = true
  timerReseted.value = false
}

const timerPaused = ref(false)
const pauseTimer = () => {
  timerResumed.value = false
  timerPaused.value = true
}

const timerResumed = ref(false)
const resumeTimer = () => {
  timerResumed.value = true
  timerPaused.value = false
}

const toggleTimer = () => {
  if (!timerStarted.value) {
    startTimer()
  } else {
    if (!timerPaused.value) {
      pauseTimer()
    } else {
      resumeTimer()
    }
  }
}

const timerReseted = ref(false)
const resetTimer = () => {
  timerStarted.value = false
  timerPaused.value = false
  timerResumed.value = false
  timerReseted.value = true
}

const onTimerFinished = () => {
  // set all timer states (started, paused, resumed, reseted) to false
  resetTimer()

  activeTaskIncreaseCompletedQty()

  // increases finished pomodoro status by 1
  incrementStatistic()
  setNextModeId()
}

// reset current time and timer states when current mode changes
watch(
  () => currentModeId.value,
  () => {
    resetTimer()
  },
  { immediate: true }
)

provide('timer', {
  duration,
  timerStarted,
  timerPaused,
  timerResumed,
  timerReseted,
  toggleTimer,
  resetTimer,
  onTimerFinished
})

/**
 * pomodoro statistics
 */
const statistic = reactive({
  pomodoro: 0,
  short_break: 0,
  long_break: 0
})

// increases finished pomodoro status by 1
const incrementStatistic = (mode = getCurrentModeValue()) => {
  statistic[mode]++
}

provide('statistic', statistic)

/**
 * tasks
 */
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
provide('tasks', tasks)

/**
 * active task
 */
const activeTaskId = ref(null)
const setActiveTaskId = (id) => {
  activeTaskId.value = id
}

/**
 * Increases active task completed qty.
 */
const activeTaskIncreaseCompletedQty = () => {
  // if no active task, return
  if (!activeTaskId.value) return

  // if current mode is not pomodoro, return
  if (currentModeId.value !== 0) return

  // find active task index
  const taskIndex = tasks.value.findIndex((task) => task.id === activeTaskId.value)
  // if active task not found, return
  if (taskIndex === -1) return

  // if active task is already completed, return
  if (tasks.value[taskIndex].completed === tasks.value[taskIndex].qty) return

  // increase active task completed qty
  tasks.value[taskIndex].completed++

  // if active task became completed, set active task to null
  if (tasks.value[taskIndex].completed === tasks.value[taskIndex].qty) {
    activeTaskId.value = null
  }
}

const activeTaskTitle = computed(
  () => tasks.value.filter((task) => task.id === activeTaskId.value)[0]?.title
)

provide('activeTask', {
  activeTaskId,
  activeTaskTitle,
  setActiveTaskId,
  activeTaskIncreaseCompletedQty
})

/**
 * tasks qty
 */
const totalTasksQty = computed(() => tasks.value.reduce((acc, task) => acc + task.qty, 0))
const totalCompletedTasksQty = computed(() =>
  tasks.value.reduce((acc, task) => acc + task.completed, 0)
)

provide('tasksQty', { totalTasksQty, totalCompletedTasksQty })

/**
 * task actions
 */

/**
 * Adds a task to the tasks array.
 * @param {object} task - The task to be added.
 */
const addTask = (task) => {
  tasks.value.push(task)
}

/**
 * Deletes a task from the tasks array.
 * @param {number} id - The id of the task to be deleted.
 */
const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

/**
 * Edits a task in the tasks array.
 * @param {object} task - The task to be edited.
 */
const editTask = (task) => {
  const taskIndex = tasks.value.findIndex((t) => t.id === task.id)
  tasks.value[taskIndex] = task
}

provide('taskActions', { addTask, deleteTask, editTask })
</script>

<template>
  <div class="bg-primary min-h-screen text-white/85 text-red-300">
    <div class="container max-w-2xl mx-auto">
      <AppHeader />
      <main class="flex flex-col items-center px-2 md:px-16">
        <TimerView />
        <TasksView />
        <AddTaskSection />
      </main>
    </div>
  </div>
</template>
