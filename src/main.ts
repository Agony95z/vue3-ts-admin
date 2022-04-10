import { createApp } from 'vue'
import { globalRegister } from './global/index'
import zwhRequest from './service/index'
import rootApp from './App.vue'
import router from './router'
import store from './store'
const app = createApp(rootApp)
// app.use(globalRegister)
globalRegister(app) // 两种方式都可以
app.use(router)
app.use(store)
app.mount('#app')
zwhRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
