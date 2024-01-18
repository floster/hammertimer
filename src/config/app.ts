import { AvailableModesEnum, type Mode } from '@/types'

export const MODES = [
  { id: 0, name: 'Hammertime', value: AvailableModesEnum.hammer },
  { id: 1, name: 'Short', value: AvailableModesEnum.short_break },
  { id: 2, name: 'Long', value: AvailableModesEnum.long_break }
] as Mode[]

export const SECONDS_IN_MINUTE = 60
