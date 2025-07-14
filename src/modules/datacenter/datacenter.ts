import { createApp } from 'vue'
import DataCenter from './DataCenter.vue'
import directives from '@/directives'
import favicon from '../../../public/favicon.png'
import store from '@/store'
import '../../assets/styles/index.scss'
import commmonInit from '@/utils/commonFunction'

commmonInit()

document.querySelector('head link[rel="icon"]')?.setAttribute('href', favicon)

const app = createApp(DataCenter).use(store)
app.use(directives).mount('#datacenter')
