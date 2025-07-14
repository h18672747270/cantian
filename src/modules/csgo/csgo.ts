import { createApp } from 'vue'
import Csgo from './Csgo.vue'
import '../../assets/styles/csgo/index.scss'
import directives from '@/directives'
import favicon from '../../../public/favicon.png'
import commmonInit from '@/utils/commonFunction'

commmonInit()

document.querySelector('head link[rel="icon"]')?.setAttribute('href', favicon)
const app = createApp(Csgo)
app.use(directives).mount('#csgo')
