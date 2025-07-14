import request from '@/service'

//发送验证码
export const verifyInviteCodeReq = (data: object) => {
  return request({
    url: '/api/user/v1/invite/code',
    method: 'post',
    debounce: 200,
    data,
  })
}
