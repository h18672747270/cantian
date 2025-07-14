/**
 * @author zouzhifeng
 * @description 处理图片等资源懒加载
 * @date 2024-07-08
 */
const lazyLoad = {
  /**
   * 当元素挂载到 DOM 时执行的逻辑
   * @param el - 被挂载的元素
   * @param binding - 指令绑定的信息
   * @param binding.value 资源url
   */
  mounted(el: any, binding: any) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('src', binding.value)
          observer.unobserve(entry.target)
        }
      })
    })
    observer.observe(el)
  },
}

export default lazyLoad
