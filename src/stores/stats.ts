import { defineStore, acceptHMRUpdate } from 'pinia'

import { STATS_REF } from '@/config/firebase'
import { db } from '@/api/firebase'
import { doc, setDoc, onSnapshot, updateDoc, collection, query, where } from 'firebase/firestore'

import { AvailableModesEnum, type DailyStat } from '@/types'

// reference to 'stats' collection
const STATS_COLLECTION_REF = collection(db, STATS_REF)

import { usePomodoroStore } from '@/stores/pomodoro'

// create empty daily stat object
const _placeEmptyDailyStat = (): DailyStat => ({
  date: new Date().toDateString(),
  hammers: 0,
  periods: [],
  durations: []
})

export const useStatsStore = defineStore('stats', {
  state: () => ({
    // today's stats
    today_stats: {} as DailyStat,

    // daily stats (all stats)
    daily_stats: [] as DailyStat[]
  }),
  getters: {
    getDailyStats: (store) => store.daily_stats,

    // qty of hammers for ALL times
    getTotalHammers: (store): number => {
      return Object.values(store.daily_stats).reduce((acc, curr) => {
        return acc + +curr.hammers
      }, 0)
    },

    // sum of all hammers durations for ALL times
    getTotalHammerTimes: (store): number => {
      let _duration = 0
      Object.values(store.daily_stats).forEach((item) => {
        item.durations?.forEach((duration) => {
          _duration += +duration
        })
      })
      return _duration
    },

    // qty of days with at least one hammer
    getTotalHammerDays: (store) => {
      return Object.keys(store.daily_stats).length
    }
  },
  actions: {
    /**
     * update daily stats
     */
    async updateDailyStats(start: Date) {
      const pomodoroStore = usePomodoroStore()
      const today = new Date().toDateString() // 'Mon Aug 09 2021'

      const DAILY_STATS_DOC_REF = doc(db, STATS_REF, today)

      // if today's stats is not in the array, add it
      if (this.daily_stats.findIndex((stat) => stat.date === today) === -1) {
        await setDoc(DAILY_STATS_DOC_REF, _placeEmptyDailyStat())
      }

      // if finished mode is 'hammer', increase its qty, add period and duration
      if (pomodoroStore.getCurrentModeValue === AvailableModesEnum.hammer) {
        // calculate duration (in minutes) of the last period
        const _duration = Math.round((new Date().getTime() - start.getTime()) / 60000)

        await updateDoc(DAILY_STATS_DOC_REF, {
          hammers: this.today_stats.hammers + 1,
          periods: [
            ...this.today_stats.periods,
            {
              start,
              end: new Date()
            }
          ],
          durations: [...this.today_stats.durations, _duration]
        } as DailyStat)
      }
    },

    /**
     * listen for stats changes on firebase and update local store
     */
    async getStatsFromFirebase() {
      // query to get all tasks from firebase
      const todayStatsQuery = query(
        STATS_COLLECTION_REF,
        where('date', '==', new Date().toDateString())
      )
      const allStatsQuery = query(STATS_COLLECTION_REF)

      // listen for changes on firebase
      // getting today's stats
      onSnapshot(todayStatsQuery, (statsSnapshot) => {
        const _stats = statsSnapshot.docs.map((stat) => stat.data() as DailyStat)
        this.today_stats = _stats[0]
      })

      // getting all stats
      onSnapshot(allStatsQuery, (statsSnapshot) => {
        const _stats = statsSnapshot.docs.map((stat) => stat.data() as DailyStat)
        this.daily_stats = _stats
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStatsStore, import.meta.hot))
}
