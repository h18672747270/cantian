import { createApp } from 'vue'
import CompetitionCenter from './CompetitionCenter.vue'
import directives from '@/directives'
import favicon from '../../../public/favicon.png'
import store from '@/store'
import '../../assets/styles/index.scss'
import commmonInit from '@/utils/commonFunction'
import 'animate.css'

commmonInit()

document.querySelector('head link[rel="icon"]')?.setAttribute('href', favicon)

const app = createApp(CompetitionCenter).use(store)
app.use(directives).mount('#competitioncenter')
