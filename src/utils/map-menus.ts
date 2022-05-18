import { IBreadcrumb } from '@/base-ui/breadcrumb/types'
import { userMenus } from '@/store/login/types'
import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
// 动态添加匹配到的路由节点
export function mapMenusToRoutes(userMenus: userMenus[]): RouteRecordRaw[] {
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
        if (!firstMenu) {
          // 解决一级菜单刷新报错
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}

// 面包屑
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 动态匹配当前路径
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath) // 匹配二级菜单
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name, path: '/' }) // 一级菜单name
        breadcrumbs?.push({ name: findMenu.name, path: '/' }) // 二级菜单name
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
