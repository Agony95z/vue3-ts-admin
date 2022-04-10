import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '../views/main/main.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
