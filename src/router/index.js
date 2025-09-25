import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import EquipmentPerformanceView from '../views/EquipmentPerformanceView.vue'
import StringerBreakdownView from '../views/StringerBreakdownView.vue' // Import the new view component

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/equipment-performance/:lineId',
    name: 'EquipmentPerformance',
    component: EquipmentPerformanceView
  },
  {
    path: '/stringer-breakdown', // Add a new route for the Stringer Breakdown page
    name: 'StringerBreakdown',
    component: StringerBreakdownView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router