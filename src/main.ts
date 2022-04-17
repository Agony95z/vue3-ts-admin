import { createApp } from 'vue'
import { globalRegister } from './global/index'
import 'normalize.css'
import './assets/css/index.css'
import { httpRequest } from './service/index'
import rootApp from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
const app = createApp(rootApp)
// app.use(globalRegister)
globalRegister(app) // 两种方式都可以
app.use(router)
app.use(store)
setupStore()
app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

httpRequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    showLoading: true
  })
  .then((res) => {
    console.log(res)
  })
