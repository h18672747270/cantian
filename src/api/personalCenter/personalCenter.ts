import request from '@/service'
//获取用户信息
export const selectUserInfo = (data: any) => {
  return request({
    url: '/api/user/v1/selectUserInfo',
    method: 'post',
    debounce: 200,
    data,
  })
}
// 检验旧手机号
export const verifyOldPhoneNum = (data: any) => {
  return request({
    url: '/api/user/v1/verifyOldPhoneNum',
    method: 'post',
    debounce: 200,
    data,
  })
}
// 检验新手机号
export const verifyNewPhoneNum = (data: any) => {
  return request({
    url: '/api/user/v1/verifyNewPhoneNum',
    method: 'post',
    debounce: 200,
    data,
  })
}
// 检验新手机号
export const updateUserPassword = (data: any) => {
  return request({
    url: '/api/user/v1/updateUserPassword',
    method: 'post',
    debounce: 200,
    data,
  })
}
// 发送邮箱
export const sendEMail = (data: any) => {
  return request({
    url: '/api/user/v1/sendEMail',
    method: 'post',
    debounce: 200,
    data,
  })
}
// 检验邮箱
export const verifyEMail = (data: any) => {
  return request({
    url: '/api/user/v1/verifyEMail',
    method: 'post',
    debounce: 200,
    data,
  })
}
//实名认证
export const realNameAuthLists = (data: object) => {
  return request({
    url: '/api/user/v1/realNameAuth',
    method: 'post',
    debounce: 200,
    data,
  })
}
