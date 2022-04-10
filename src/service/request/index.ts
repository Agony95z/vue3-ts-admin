import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

import type { ZRequestInterceptors, ZRequestConfig } from './type'

export default class ZRequest {
  instance: AxiosInstance
  interceptors?: ZRequestInterceptors
  constructor(config: ZRequestConfig) {
    // config 传进来的配置对象
    this.instance = axios.create(config)
    this.interceptors = config.interceptors // 获取用户传递的拦截器钩子
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatcher
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatcher
    )
  }
  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}
