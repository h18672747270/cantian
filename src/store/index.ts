import { createPinia } from 'pinia'
import { useCountStore } from './modules/count'
import { useThemetypeStore } from './modules/themetype'
import { useLoginStore } from './modules/login'
import { useHeaderStore } from './modules/header'
export default createPinia()
export { useCountStore, useThemetypeStore, useLoginStore, useHeaderStore }
