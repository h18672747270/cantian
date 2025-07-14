import { createApp } from 'vue'
import PersonalCenter from './PersonalCenter.vue'
import directives from '@/directives'
import favicon from '../../../public/favicon.png'
import router from './router'
import naive from 'naive-ui'
import store from '@/store'
import '../../assets/styles/index.scss'

import commmonInit from '@/utils/commonFunction'

commmonInit()

document.querySelector('head link[rel="icon"]')?.setAttribute('href', favicon)

const app = createApp(PersonalCenter)
app.use(directives)
app.use(router)
app.use(naive)
app.use(store)
app.mount('#personalcenter')
