import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'
import type { ZRequestInterceptors, ZRequestConfig } from './type'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
// import 'element-plus/es/components/loading/style/css'

export default class ZRequest {
  instance: AxiosInstance
  interceptors?: ZRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance
  constructor(config: ZRequestConfig) {
    // config 传进来的配置对象
    this.instance = axios.create(config) // 创建axios实例
    // 保存基本信息
    this.interceptors = config.interceptors // 获取用户传递的拦截器钩子
    this.showLoading = true // 默认为true
    // 从config中取出coder传入的 封装局部拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatcher
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatcher
    )
    // 封装全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '加载中...',
            fullscreen: true,
            background: '#f4f4f4'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        if (err.response.status === 404) {
          console.log('404错误')
          // 将loading移除
          this.loading?.close()
        }
        return err
      }
    )
  }
  /* <T>为约定好的返回数据格式 ZRequestConfig<T>把T传递给ZRequestConfig作用于ZRequestInterceptors中的responseInterceptor
  config.interceptors.responseInterceptor(res)默认返回AxiosResponse类型 */
  request<T = any>(config: ZRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对coder传入的config进行处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config) // 对请求进行拦截
      }
      // 判断请求接口是否显示loading 不传默认为true
      if (!config.showLoading) {
        this.showLoading = config.showLoading ? true : false
      }
      // request默认类型声明 request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>
      this.instance
        /*
        上边全局拦截器钩子this.instance.interceptors.response.use已经对数据进行
        const data = res.data处理
        但是此处ts推导出request返回值类型仍然是AxiosResponse 类型 正确应该是我们定义接口是的<T>类型
        */
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理 判断是否有请求钩子
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res) // 对请求进行拦截
          }
          // 将showLoading设置为true 不影响下一个接口请求
          this.showLoading = true
          resolve(res)
        })
        .catch((err) => {
          console.log('requestError', err)
          reject(err)
          this.showLoading = true
        })
    })
  }
  get<T = any>(config: ZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: ZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  patch<T = any>(config: ZRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
  delete<T = any>(config: ZRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
}
