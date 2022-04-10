import { AxiosRequestConfig, AxiosResponse } from 'axios'
interface ZRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatcher?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatcher?: (error: any) => any
}
interface ZRequestConfig extends AxiosRequestConfig {
  // 自定义AxiosRequestConfig类型
  interceptors?: ZRequestInterceptors // 约束用户传递的数据类型
}
export { ZRequestConfig, ZRequestInterceptors }
