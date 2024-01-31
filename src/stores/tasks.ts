import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

import { TASKS_REF } from '@/config/firebase'
import { db } from '@/api/firebase'
import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  collection,
  query,
  onSnapshot,
  orderBy
} from 'firebase/firestore'

import type { Task } from '@/types'

import { usePomodoroStore } from '@/stores/pomodoro'

const TASKS_COLLECTION_REF = collection(db, TASKS_REF)

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: ref([] as Task[]),

    // active task
    activeTaskId: null as number | null,

    // filtering and sorting
    isCompletedHidden: false,
    isCompletedInTheEnd: false,

    // add task form
    isAddTaskFormVisible: false
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
    _setTasks(tasks: Task[]) {
      this.tasks = tasks
    },
    async addTask({ id, title, qty, completed }: Task) {
      await setDoc(doc(TASKS_COLLECTION_REF, id.toString()), {
        id,
        title,
        qty,
        completed
      } as Task)
    },
    async removeTask(id: number) {
      await deleteDoc(doc(TASKS_COLLECTION_REF, id.toString()))
    },
    removeAllTasks() {
      this.tasks.forEach((task) => this.removeTask(task.id))
    },
    async updateTask({ id, title, qty, completed }: Task) {
      await updateDoc(doc(TASKS_COLLECTION_REF, id.toString()), {
        id,
        title,
        qty,
        completed
      })
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
      this.isAddTaskFormVisible = true
    },
    closeAddTaskForm() {
      this.isAddTaskFormVisible = false
    },

    /**
     * Firebase
     */
    async listenerForTasksFromFirebase() {
      // query to get all tasks from firebase
      const q = query(TASKS_COLLECTION_REF, orderBy('id', 'desc'))

      // listen for changes on firebase
      onSnapshot(q, (tasksSnapshot) => {
        const _tasks = tasksSnapshot.docs.map((task) => task.data() as Task)
        this._setTasks(_tasks)
      })
    }
  }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}
