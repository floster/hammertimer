import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: 'Learning Vue3 basics using Vue official docs',
        qty: 4,
        completed: 2
      },
      {
        id: 3,
        title: 'Learning Vue3 reactivity',
        qty: 1,
        completed: 1
      },
      {
        id: 2,
        title: 'Learning Vue3 composition API',
        qty: 2,
        completed: 1
      },
      {
        id: 4,
        title: 'Learning Vue3 basics using Vue official docs',
        qty: 1,
        completed: 1
      }
    ],

    // active task
    activeTaskId: null,

    // states for filtering and sorting
    isCompletedHidden: false,
    isCompletedInTheEnd: false
  }),
  getters: {
    /*
      tasks
    */
    getTasks: (state) => state.tasks,
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
    addTask(task) {
      this.tasks.push(task)
    },
    removeTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
    updateTask(task) {
      const index = this.tasks.findIndex((t) => t.id === task.id)
      this.tasks[index] = task
    },

    /*
      active task
    */
    setActiveTaskId(id) {
      this.activeTaskId = id
    },
    // increase active task 'completed' qty by 1
    activeTaskIncreaseCompletedQty() {
      // if no active task, return
      if (!this.activeTaskId) return

      // if current mode is not pomodoro, return
      // FIXME: uncomment it in future
      // if (this.currentModeId !== 0) return

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
    }
  }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}
