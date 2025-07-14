import lazyLoad from './lazyLoad'
import debounce from './debounce'
import throttle from './throttle'

interface Directive<T> {
  [key: string]: T
}

const directives: Directive<any> = {
  lazyLoad,
  debounce,
  throttle,
}

export default {
  install(app: any) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })
  },
}
