import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

import { TASKS_REF } from '@/config/firebase'
import { db } from '@/api/firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'

import type { Task } from '@/types'

import { usePomodoroStore } from '@/stores/pomodoro'
import { useShortcutsStore } from '@/stores/shortcuts'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: ref([] as Task[]),

    // active task
    activeTaskId: null as number | null,

    // filtering and sorting
    isCompletedHidden: false,
    isCompletedInTheEnd: false,

    // add task form
    addTaskFormVisible: false
  }),
  getters: {
    /*
      tasks
    */
    getTasks: (state) => state.tasks,
    noTasks: (state) => state.tasks.length === 0,
    oneOrLessTask: (state) => state.tasks.length <= 1,
    getOnlyUncompletedTasks: (state) => state.tasks.filter((task) => task.completed !== task.qty),
    getWithCompletedInTheEnd: (state) => {
      const _tasks = [...state.tasks]
      return _tasks.sort((a, b) => {
        if (a.completed === a.qty) return 1
        if (b.completed === b.qty) return -1
        return 0
      })
    },

    /*
      quantities
    */
    getTotalTasksQty: (state) => state.tasks.reduce((acc, task) => acc + task.qty, 0),
    getCompletedTasksQty: (state) => state.tasks.reduce((acc, task) => acc + task.completed, 0),

    /* 
      active task
    */
    activeTaskTitle: (state) =>
      state.tasks.filter((task) => task.id === state.activeTaskId)[0]?.title
  },
  actions: {
    /*
      tasks
    */
    addTask(task: Task) {
      this.tasks.push(task)
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
    removeAllTasks() {
      this.tasks = []
    },
    updateTask(task: Task) {
      const index = this.tasks.findIndex((t) => t.id === task.id)
      this.tasks[index] = task
    },

    /*
      active task
    */
    setActiveTaskId(id: number | null) {
      this.activeTaskId = id
    },
    // increase active task 'completed' qty by 1
    activeTaskIncreaseCompletedQty() {
      const pomodoroStore = usePomodoroStore()
      // if no active task, return
      if (!this.activeTaskId) return

      // if current mode is not pomodoro, return
      if (!pomodoroStore.isCurrentModePomodoro) return

      // find active task index
      const taskIndex = this.tasks.findIndex((task) => task.id === this.activeTaskId)
      // if active task not found, return
      if (taskIndex === -1) return

      // if active task is already completed, return
      if (this.tasks[taskIndex].completed === this.tasks[taskIndex].qty) return

      // increase active task completed qty
      this.tasks[taskIndex].completed++

      // if active task became completed, set active task to null
      if (this.tasks[taskIndex].completed === this.tasks[taskIndex].qty) {
        this.activeTaskId = null
      }
    },

    /**
      add task form
     */
    openAddTaskForm() {
      const shortcuts = useShortcutsStore()
      shortcuts.disable()
      this.addTaskFormVisible = true
    },
    closeAddTaskForm() {
      const shortcuts = useShortcutsStore()
      shortcuts.enable()
      this.addTaskFormVisible = false
    },

    /**
     * Firebase
     */
    async listenerForTasksFromFirebase() {
      // query to get all tasks from firebase
      const q = query(collection(db, TASKS_REF))

      // listen for changes on firebase
      onSnapshot(q, (tasksSnapshot) => {
        tasksSnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            this.addTask(change.doc.data() as Task)
          }
          if (change.type === 'modified') {
            this.updateTask(change.doc.data() as Task)
          }
          if (change.type === 'removed') {
            this.removeTask(change.doc.data().id)
          }
        })
      })
    }
  }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}
