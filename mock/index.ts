import { MockMethod } from 'vite-plugin-mock'
import { menuList, menuTreeList } from './data'

const mockList: MockMethod[] = [
  {
    url: '/mock/getMenuList',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        statusCode: 200,
        desc: '获取成功',
        result: menuList,
      }
    },
  },
  {
    url: '/mock/getMenuTreeList',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        statusCode: 200,
        desc: '获取成功',
        result: menuTreeList,
        success: true,
      }
    },
  },
]
export default mockList
