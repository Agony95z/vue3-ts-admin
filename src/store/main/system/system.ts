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
    changeUserList(state, usersList: any) {
      state.usersList = usersList
    },
    changeUserCount(state, userCount: any) {
      state.usersTotalCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // const pageName = payload.pageName
      // const pageUrl = `/${pageName}/list`
      // console.log(pageUrl)
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      console.log(pageResult)
      const { list, totalCount } = pageResult.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
