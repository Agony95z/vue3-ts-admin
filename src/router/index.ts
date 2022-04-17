import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCahe from '@/utils/cache'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/main/main.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCahe.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
