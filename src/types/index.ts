export enum AvailableModesEnum {
  hammer = 'hammer',
  short_break = 'short_break',
  long_break = 'long_break'
}

export interface Task {
  id: number
  title: string
  qty: number
  completed: number
}
