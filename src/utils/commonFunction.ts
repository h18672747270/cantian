/**
 * 邀请码校验重定向
 */
import { createDiscreteApi } from 'naive-ui'
const inviteVerify = () => {
  const currentTime = Date.now()
  const Expiry = Number(localStorage.getItem('Expiry'))
  if (currentTime > Expiry) {
    localStorage.removeItem('ICToken')
    localStorage.removeItem('Expiry')
  }
  const ICToken = localStorage.getItem('ICToken')
  if (!ICToken) {
    if (location.pathname !== '/') {
      location.href = location.origin + '/'
    }
  }
}
/**
 * 挂载全局message
 */
const commMessage = () => {
  const { message } = createDiscreteApi(['message'])
  // @ts-ignore
  window.$message = message
}
const commmonInit = () => {
  inviteVerify()
  commMessage()
}

export default commmonInit
