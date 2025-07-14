/**
 * @author zouzhifeng
 * @description 对dom各种事件进行防抖处理
 * @date 2024-07-08
 */
const debounce = {
  /**
   * 当元素挂载到 DOM 时执行的逻辑
   * @param el - 被挂载的元素
   * @param method -所监听事件
   * @param callback -需要执行函数
   * @param arg -延时时间默认500(单位:ms)
   */
  mounted(el: any, binding: any) {
    const { method, arg, callback } = binding.value
    let timer: any
    el.addEventListener(method, () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        callback(method)
      }, arg || 500)
    })
  },
}

export default debounce
