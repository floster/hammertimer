export type AvailableModes = 'pomodoro' | 'short_break' | 'long_break'

export interface Task {
  id: number
  title: string
  qty: number
  completed: number
}
