<template>
  <div class="h-full w-full">
    <div class="vap-bottom-container h-full w-full"></div>
  </div>
</template>

<script lang="ts" setup>
import bottomVideo from '@/assets/vapAssets/video/dataCenter_bottom.mp4'
import bottomJson from '@/assets/vapAssets/json/dataCenter_bottom.json'
// @ts-ignore
import Vap from 'video-animation-player'

const bottomVapInstance = ref<any>(null)

const handleVapConfig = (options: any): any => {
  const basicOptions: any = {
    container: '', // dom容器
    src: '', // mp4视频地址
    config: '', // 配置json对象（详情见下文）
    width: null, // 宽度
    height: null, // 高度
    fps: null, // 动画帧数（生成素材时在工具中填写的fps值）
    mute: true, // 是否对视频静音
    loop: true, // 是否循环
    type: '', // 组件基于type字段做了实例化缓存，不同的VAP实例应该使用不同的type值（如0、1、2等）
    beginPoint: '', // 起始播放时间点(单位秒),在一些浏览器中可能无效
    fontStyle: '', // 融合字体样式用法参考(https://github.com/Tencent/vap/pull/101)
    accurate: true, // 是否启用精准模式（使用requestVideoFrameCallback提升融合效果，浏览器不兼容时自动降级）
    precache: '', // 是否预加载视频资源（默认关闭，即边下边播）
    ext: '', // 融合参数（和json配置文件中保持一致）
  }
  return { ...basicOptions, ...options }
}

const handleVap = () => {
  const bottomVapConfig: any = {
    container: document.querySelector('.vap-bottom-container'),
    src: bottomVideo,
    config: bottomJson,
    type: 'streamer',
  }
  bottomVapInstance.value = new Vap()
  bottomVapInstance.value.play(handleVapConfig(bottomVapConfig))
}

onMounted(() => {
  handleVap()
})
</script>
<style lang="scss">
.vap-bottom-container {
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
