import ZRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'
export default new ZRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 对单个baseUrl下的请求进行拦截
    requestInterceptor: (config) => {
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatcher: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatcher: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})
