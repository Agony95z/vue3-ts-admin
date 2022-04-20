import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCahe from '@/utils/cache'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main', // 坑！动态添加子路由的时候 name值需要与path值大小写保持一致
    component: () => import('@/views/main/main.vue')
    // children: [] // 根据返回的userMenus来决定
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found/not-found.vue'),
    name: 'not-found'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 导航守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCahe.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
