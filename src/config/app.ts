import { AvailableModesEnum, type Mode, type Durations } from '@/types'

export const SITE_NAME = 'hammertimer'

export const MODES = [
  { id: 0, name: 'Hammertime', value: AvailableModesEnum.hammer },
  { id: 1, name: 'Short', value: AvailableModesEnum.short_break },
  { id: 2, name: 'Long', value: AvailableModesEnum.long_break }
] as Mode[]

export const SECONDS_IN_MINUTE = 60

// DEAFULT VALUES
export const DEFAULTS = {
  DURATIONS: {
    [AvailableModesEnum.hammer]: 25,
    [AvailableModesEnum.short_break]: 5,
    [AvailableModesEnum.long_break]: 15
  } as Durations,
  AUTO_NEXT_MODE: false,
  LONG_BREAK_INTERVAL: 4
}
