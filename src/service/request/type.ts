import { AxiosRequestConfig, AxiosResponse } from 'axios'
interface ZRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatcher?: (error: any) => any
  // 因为我们在全局响应拦截器里面对数据进行了处理const data = res.data 会导致res的数据类型不再是AxiosResponse 这里暂时改为any
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  // responseInterceptor?: (res: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatcher?: (error: any) => any
}
interface ZRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 自定义AxiosRequestConfig类型
  interceptors?: ZRequestInterceptors<T> // 约束用户传递的数据类型
  showLoading?: boolean // 是否展示加载loading
}
export { ZRequestConfig, ZRequestInterceptors }
