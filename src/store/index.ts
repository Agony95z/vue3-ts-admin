import { createStore } from 'vuex'
import { IRootStore } from './types'
import login from './login/login'
const store = createStore<IRootStore>({
  state: {
    name: 'zwh',
    age: 18
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
export default store
