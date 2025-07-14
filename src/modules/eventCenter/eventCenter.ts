import { createApp } from 'vue'
import EventCenter from './EventCenter.vue'
import directives from '@/directives'
import store from '@/store'
import favicon from '../../../public/favicon.png'
import commmonInit from '@/utils/commonFunction'

commmonInit()
import '../../assets/styles/index.scss'
import '../../assets/styles/eventCenter/eventCenter.scss'

document.querySelector('head link[rel="icon"]')?.setAttribute('href', favicon)

const app = createApp(EventCenter)
app.use(store).use(directives).mount('#eventCenter')
