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

  const shortcuts = useShortcutsStore()
  const timer = useTimerStore()
  const settings = useSettingsStore()
  const tasks = useTasksStore()

  const showHelp = onKeyStroke(
    ShortcutsEnum.HELP,
    (e) => {
      if (shortcuts.isShortcutsDisabled) return
      e.preventDefault()
      shortcuts.toggleVisibility()
    },
    { dedupe: true }
  )

  const toggleTimer = onKeyStroke(
    ShortcutsEnum.TIMER,
    (e) => {
      if (shortcuts.isShortcutsDisabled) return
      e.preventDefault()
      timer.toggle()
    },
    { dedupe: true }
  )

  const openSettings = onKeyStroke(
    ShortcutsEnum.SETTINGS,
    (e) => {
      if (shortcuts.isShortcutsDisabled) return
      e.preventDefault()
      settings.openSettings()
    },
    { dedupe: true }
  )

  const addTask = onKeyStroke(
    ShortcutsEnum.ADD_TASK,
    (e) => {
      if (shortcuts.isShortcutsDisabled) return
      e.preventDefault()
      tasks.openAddTaskForm()
    },
    { dedupe: true }
  )

  const gotoStats = onKeyStroke(
    ShortcutsEnum.REPORT,
    (e) => {
      if (shortcuts.isShortcutsDisabled) return
      e.preventDefault()
      router.push({ name: 'Stats' })
    },
    { dedupe: true }
  )

  const gotoHomepage = onKeyStroke(
    ShortcutsEnum.HOME,
    (e) => {
      if (shortcuts.isShortcutsDisabled) return
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
