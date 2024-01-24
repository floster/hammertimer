import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '../pages/MainPage.vue'
import StatsPage from '../pages/StatsPage.vue'

const routes = [
  { path: '/', name: 'Home', component: MainPage },
  { path: '/stats', name: 'Stats', component: StatsPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
