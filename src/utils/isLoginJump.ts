/**
 * @author wuzhiliang
 * @date 2024-07-25
 * @desc 页面跳转
 * @param path 跳转路径
 * @param jump 是否直接跳转
 */
import { useLoginStore } from '@/store'
export const isLoginJump = (path: string, jump = false) => {
  if (jump) {
    location.href = location.origin + `/${path}/`
    return
  }
  const store = useLoginStore()
  const token = localStorage.getItem('token')
  if (!token) {
    store.changeLoginFlag(false)
  } else {
    location.href = location.origin + `/${path}/`
  }
}

export const verifyLogin = () => {
  const store = useLoginStore()
  const token = localStorage.getItem('token')
  if (!token) {
    store.changeLoginFlag(false)
  }
}
