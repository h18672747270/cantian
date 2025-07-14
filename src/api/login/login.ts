import request from '@/service'

//发送验证码
export const sendCode = (data: object) => {
  return request({
    url: '/api/user/v1/sendCode',
    method: 'post',
    debounce: 200,
    data,
  })
}
//登录
export const userLogin = (data: object) => {
  return request({
    url: '/api/user/v1/login',
    method: 'post',
    debounce: 200,
    data,
  })
}
