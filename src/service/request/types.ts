import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from 'axios'

interface CtInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  debounce?: number
}

export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (
    config: CtInternalAxiosRequestConfig,
  ) => CtInternalAxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}
// 自定义传入的参数
export interface CreateRequestConfig<T = AxiosResponse>
  extends CreateAxiosDefaults {
  interceptors?: RequestInterceptors<T>
}
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
  debounce?: number
}
export interface CancelRequestSource {
  [index: string]: () => void
}
