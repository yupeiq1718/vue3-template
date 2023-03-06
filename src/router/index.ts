import { createRouter, createWebHistory, createWebHashHistory, RouterOptions, Router } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const options: RouterOptions = {
  history: (import.meta.env.VITE_APP_ROUTER_MODE === 'history') ? createWebHistory(import.meta.env.VITE_APP_BASE_URL) : createWebHashHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: setupLayouts(generatedRoutes)
}

const router: Router = createRouter(options)

export default router
