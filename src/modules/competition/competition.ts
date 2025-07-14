import { createApp } from 'vue'
import Competition from './Competition.vue'
import directives from '@/directives'
import favicon from '../../../public/favicon.png'
import '../../assets/styles/index.scss'
import commmonInit from '@/utils/commonFunction'

commmonInit()

document.querySelector('head link[rel="icon"]')?.setAttribute('href', favicon)

const app = createApp(Competition)
app.use(directives).mount('#competition')
