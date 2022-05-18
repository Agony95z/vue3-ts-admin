import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import login from './login/login'
import system from './main/system/system'
const store = createStore<IRootState>({
  state: {
    name: 'zwh',
    age: 18
  },
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
// 解决vuex兼容ts差问题, 重写useStore,自己定义Store类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
