import request from '@/service'

//查看头像
export const selectAllHeadPortraitLists = (data: object) => {
  return request({
    url: '/api/user/v1/selectAllHeadPortrait',
    method: 'post',
    debounce: 200,
    data,
  })
}
//更新用户
export const updateUserInfoCreate = (data: object) => {
  return request({
    url: '/api/user/v1/updateUserInfo',
    method: 'post',
    debounce: 200,
    data,
  })
}
//查看用户信息
export const selectUserInfoDetail = (data: object) => {
  return request({
    url: '/api/user/v1/selectUserInfo',
    method: 'post',
    debounce: 200,
    data,
  })
}
