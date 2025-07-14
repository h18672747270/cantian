/*
 * @Author: Wuzl
 * @Date: 2024-07-04 14:09:09
 * @Description: 接口异常信息提醒
 */

import ErrorSvg from '@/components/ErrorSvg.vue'
import { createDiscreteApi } from 'naive-ui'
const { message } = createDiscreteApi(['message'])
export const showMessage = (type: string, messgaeInfo: string, time = 3000) => {
  message[type](messgaeInfo, {
    icon: type === 'error' ? () => h(ErrorSvg) : null,
    duration: time,
  })
}
