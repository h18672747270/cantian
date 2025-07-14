import Request from './request'
import { AxiosResponse } from 'axios'
import type { CancelTokenSource } from 'axios'
import type { RequestConfig } from './request/types'
import commmonInit from '@/utils/commonFunction'
commmonInit()

const envMode: string = import.meta.env.MODE
const baseUrlMap: any = {
  dev: 'http://192.168.2.245:30293/',
  sandbox: 'http://192.168.2.245:32539',
  prod: 'http://8.148.25.172:30730',
}
const baseURL: any = baseUrlMap[envMode]
export interface RewriteResponse<T> {
  statusCode: number
  desc: string
  result: T
}

// 重写返回类型
interface RewriteRequestConfig<T, R> extends RequestConfig<RewriteResponse<R>> {
  data?: T
}

// 使用map对象存储所有的CancelTokenSource
const requestMap: Map<string, CancelTokenSource | null> = new Map()

const request = new Request({
  baseURL: baseURL,
  timeout: 1000 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      // 是否开启节流
      if (config?.debounce && config.url) {
        // 检查当前是否有取消令牌
        if (!requestMap.has(config.url)) {
          // 创建新的 Cancel Token 并存储
          const currentCancelToken = request.CancelToken
          requestMap.set(config.url, currentCancelToken)
          setTimeout(() => {
            delete config.cancelToken
            requestMap.delete(String(config.url))
          }, config.debounce)
        } else {
          // cancelToken未清除则添加
          const currentCancelToken = requestMap.get(config.url)
          config.cancelToken = currentCancelToken?.token
          currentCancelToken?.cancel()
        }
      }
      if (
        config.url !== '/api/user/v1/invite/code' &&
        localStorage.getItem('ICToken')
      ) {
        config.headers.ICToken = localStorage.getItem('ICToken')
      }
      return config
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      if (result.status !== 200) {
        window.$message.error('网络异常，请稍后重试！')
      }
      return result
    },
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {RewriteRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const baseRequest = <D = any, T = any>(config: RewriteRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<RewriteResponse<T>>(config)
}
// // 取消请求
// export const cancelRequest = (url: string | string[]) => {
//   return request.cancelRequest(url)
// }
// // 取消全部请求
// export const cancelAllRequest = () => {
//   return request.cancelAllRequest()
// }

export default baseRequest
