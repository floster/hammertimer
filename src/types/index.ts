export enum AvailableModesEnum {
  hammer = 'hammer',
  short_break = 'short_break',
  long_break = 'long_break'
}

export interface Mode {
  id: number
  name: string
  value: AvailableModesEnum
}

export interface Task {
  id: number
  title: string
  qty: number
  completed: number
}
