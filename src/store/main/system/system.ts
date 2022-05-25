import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
import { getPageListData } from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersTotalCount: 0,
      usersList: [],
      departmentTotalCount: 0,
      departmentList: [],
      roleTotalCount: 0,
      roleList: [],
      menuList: [],
      categoryTotalCount: 0,
      categoryList: [],
      goodsTotalCount: 0,
      goodsList: [],
      storyTotalCount: 0,
      storyList: []
    }
  },
  mutations: {
    changeUsersList(state, usersList: any) {
      state.usersList = usersList
    },
    changeUsersTotalCount(state, totalCount: any) {
      state.usersTotalCount = totalCount
    },
    changeRoleList(state, roleList: any) {
      state.roleList = roleList
    },
    changeRoleTotalCount(state, totalCount: any) {
      state.roleTotalCount = totalCount
    }
  },
  getters: {
    pageListData(state) {
      // 返回函数体
      return (pageName: string) => {
        const listData: any[] = (state as any)[`${pageName}List`] ?? []
        return listData
      }
    },
    pageListDataCount(state) {
      return (pageName: string) => {
        const listCount = (state as any)[`${pageName}TotalCount`] ?? 0
        return listCount
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // console.log(pageUrl)
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log(pageResult)
      const { list, totalCount } = pageResult.data
      switch (payload.pageName) {
        case 'users':
          commit('changeUsersTotalCount', totalCount)
          commit('changeUsersList', list)
          break
        case 'department':
          commit('changeDepartmentTotalCount', totalCount)
          commit('changeDepartmentList', list)
          break
        case 'role':
          commit('changeRoleTotalCount', totalCount)
          commit('changeRoleList', list)
          break
        case 'menu':
          commit('changeMenuList', list)
          break
        case 'category':
          commit('changeCategoryTotalCount', totalCount)
          commit('changeCategoryList', list)
          break
        case 'goods':
          commit('changeGoodsTotalCount', totalCount)
          commit('changeGoodsList', list)
          break
        case 'story':
          commit('changeStoryTotalCount', totalCount)
          commit('changeStoryList', list)
          break
      }
      commit('changeUsersList', list)
      commit('changeUsersTotalCount', totalCount)
    }
  }
}

export default systemModule
