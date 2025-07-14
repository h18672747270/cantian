<template>
  <div class="competition-vap bg-contain bg-no-repeat">
    <div class="vap-streamer-container"></div>
    <div class="vap-button-container flex justify-center"></div>
  </div>
</template>

<script lang="ts" setup>
import buttonVideo from '@/assets/vapAssets/video/competition_button.mp4'
// @ts-ignore
import buttonJson from '@/assets/vapAssets/json/competition_button.json'
import streamerVideo from '@/assets/vapAssets/video/competition_streamer.mp4'
// @ts-ignore
import streamerJson from '@/assets/vapAssets/json/competition_streamer.json'
// @ts-ignore
import Vap from 'video-animation-player'

const streamerVapInstance = ref<any>(null)
const buttonVapInstance = ref<any>(null)

const handleVapConfig = (options: any): any => {
  const basicOptions: any = {
    container: '', // dom容器
    src: '', // mp4视频地址
    config: '', // 配置json对象（详情见下文）
    width: null, // 宽度
    height: null, // 高度
    fps: null, // 动画帧数（生成素材时在工具中填写的fps值）
    mute: true, // 是否对视频静音
    loop: false, // 是否循环
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
  const streamerVapConfig: any = {
    container: document.querySelector('.vap-streamer-container'),
    src: streamerVideo,
    config: streamerJson,
    type: 'streamer',
  }
  streamerVapInstance.value = new Vap()
  streamerVapInstance.value.play(handleVapConfig(streamerVapConfig))
  const buttonVapConfig: any = {
    container: document.querySelector('.vap-button-container'),
    src: buttonVideo,
    config: buttonJson,
    loop: true,
    type: 'button',
  }
  buttonVapInstance.value = new Vap()
  buttonVapInstance.value.play(handleVapConfig(buttonVapConfig))
}

onMounted(() => {
  handleVap()
})
</script>
<style lang="scss" scoped>
.competition-vap {
  height: 900px;
  margin-bottom: 60px;
  background-image: url('@/assets/images/competition/bg_vap.jpg');
}
.vap-streamer-container {
  height: 612px;
}
.vap-button-container {
  height: 288px;
}
</style>
<style lang="scss">
.vap-streamer-container {
  canvas {
    width: 100%;
  }
}
.vap-button-container {
  canvas {
    width: 268px;
    height: 107px;
    cursor: pointer;
  }
}
</style>
