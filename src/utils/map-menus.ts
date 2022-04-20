import { userMenus } from '@/store/login/types'
import { RouteRecordRaw } from 'vue-router'
export function mapMenusToToutes(userMenus: userMenus[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1. 先去加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFile = require.context('../router/main', true, /\.ts/)
  // 匹配/router/main下组件路径
  routeFile.keys().forEach((key) => {
    // console.log(key) // ./system/user/user.ts
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)
  // 2. 根据权限匹配需要添加的route
  // 递归查找
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url)
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}
