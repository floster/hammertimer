import { useRouter } from 'vue-router'
import { onKeyStroke } from '@vueuse/core'
import { ShortcutsEnum } from '@/types/shortcuts'

/**
 * import stores
 */
import { useShortcutsStore } from '@/stores/shortcuts'
import { useSettingsStore } from '@/stores/settings'
import { useTasksStore } from '@/stores/tasks'
import { useTimerStore } from '@/stores/timer'

const useShortcuts = () => {
  const router = useRouter()

  const showHelp = onKeyStroke(
    ShortcutsEnum.HELP,
    (e) => {
      e.preventDefault()
      const shortcuts = useShortcutsStore()
      shortcuts.toggleVisibility()
    },
    { dedupe: true }
  )

  const toggleTimer = onKeyStroke(
    ShortcutsEnum.TIMER,
    (e) => {
      e.preventDefault()
      const timer = useTimerStore()
      timer.toggle()
    },
    { dedupe: true }
  )

  const openSettings = onKeyStroke(
    ShortcutsEnum.SETTINGS,
    (e) => {
      e.preventDefault()
      const settings = useSettingsStore()
      settings.openSettings()
    },
    { dedupe: true }
  )

  const addTask = onKeyStroke(
    ShortcutsEnum.ADD_TASK,
    (e) => {
      e.preventDefault()
      const tasks = useTasksStore()
      tasks.openAddTaskForm()
    },
    { dedupe: true }
  )

  const gotoStats = onKeyStroke(
    ShortcutsEnum.REPORT,
    (e) => {
      e.preventDefault()
      router.push({ name: 'Stats' })
    },
    { dedupe: true }
  )

  const gotoHomepage = onKeyStroke(
    ShortcutsEnum.HOME,
    (e) => {
      e.preventDefault()
      router.push({ name: 'Home' })
    },
    { dedupe: true }
  )

  const addShortcutsListeners = () => ({
    showHelp,
    toggleTimer,
    openSettings,
    addTask,
    gotoStats,
    gotoHomepage
  })

  return {
    addShortcutsListeners
  }
}

export default useShortcuts
