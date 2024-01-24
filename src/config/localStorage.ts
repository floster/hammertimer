const _prefix = 'hammertime_'

export const KEYS = {
  // tasks store
  TASKS: `${_prefix}tasks`,

  // settings store
  DURATIONS: `${_prefix}durations`,
  AUTO_NEXT_MODE: `${_prefix}auto_next_mode`,
  LONG_BREAK_INTERVAL: `${_prefix}long_break_interval`,

  // pomodoro store
  CURRENT_MODE_ID: `${_prefix}current_mode_id`,
  STREAKS: `${_prefix}streaks`,
  SHORT_BREAKS_IN_ROW: `${_prefix}short_breaks_in_row`,
  STATS: `${_prefix}stats`,
  DAILY_STATS: `${_prefix}daily_stats`
}
