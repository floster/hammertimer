export enum AvailableModesEnum {
  hammer = 'hammer',
  short_break = 'short_break',
  long_break = 'long_break'
}

export enum ModeIdsEnum {
  hammer = 0,
  short_break = 1,
  long_break = 2
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

export type Durations = {
  [key in AvailableModesEnum]: number
}

export type Stats = {
  [key in AvailableModesEnum]: number
}

type Period = {
  start: Date
  end: Date
}

export type DailyStat = {
  date: string
  hammers: number
  periods: Period[]
  durations: number[]
}

export interface Streak {
  id: number
  type: AvailableModesEnum
}
