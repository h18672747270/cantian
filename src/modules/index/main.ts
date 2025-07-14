import { createApp } from 'vue'
// import { createDiscreteApi } from 'naive-ui'
import App from './App.vue'
import directives from '@/directives'
import favicon from '../../../public/favicon.png'
import store from '@/store'
import '../../assets/styles/index.scss'
import commmonInit from '@/utils/commonFunction'

commmonInit()
document.querySelector('head link[rel="icon"]')?.setAttribute('href', favicon)

const app = createApp(App).use(store)
app.use(directives).mount('#app')
