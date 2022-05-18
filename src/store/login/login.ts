import { Module } from 'vuex'
// Module<S,R> S模块中类型 R根模块
import type { ILoginState, userMenus } from './types'
import type { IRootState } from '@/store/types'
import { changeUpperCase } from '@/utils/commonUtil'
import { IAccount } from '@/service/login/types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusRoleId
} from '@/service/login/login'
import localCahe from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router/index'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: userMenus[]) {
      state.userMenus = userMenus
      // userMenus映射到routes --> routes --> router.main.children
      const routeInfo = mapMenusToRoutes(userMenus) // 该方法去拿到本地所有的路由信息去匹配userMenus
      routeInfo.forEach((item) => {
        router.addRoute('main', item)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 实现登录
      const loginRes = await accountLoginRequest(payload)
      // console.log(loginRes)
      const { id, token } = loginRes.data
      commit('changeToken', token)
      localCahe.setCache('token', token)
      // 2. 请求用户信息
      const userInfoRes = await requestUserInfoById(id)
      const userInfo = userInfoRes.data
      commit('changeUserInfo', userInfo)
      localCahe.setCache('userInfo', userInfo)
      // 3. 请求用户菜单权限
      const userMenusRes = await requestUserMenusRoleId(userInfo.role.id)
      let userMenus = userMenusRes.data
      userMenus = userMenus.map((item: any) => {
        return {
          iconName: changeUpperCase(item.icon.slice(8)), // 手动组装以符合el-icon
          ...item
        }
      })
      commit('changeUserMenus', userMenus)
      localCahe.setCache('userMenus', userMenus)
      // 4. 跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCahe.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCahe.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCahe.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
    /*  phoneLoginAction({ commit }, payload: any) {
      console.log('执行 phoneLoginAction', payload)
    } */
  }
}
export default loginModule
