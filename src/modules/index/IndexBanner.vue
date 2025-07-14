<template>
  <n-carousel
    :class="[
      'index-banner-carousel',
      'gradient-wrapper',
      { active: isAnimationComplete },
    ]"
    :autoplay="props.autoPlay"
  >
    <n-carousel-item class="relative" @click="emit('clickBanner', 1)">
      <div class="index-banner-one-vap">
        <div class="flex justify-center">
          <img
            v-lazyLoad="index_banner_one_text"
            src=""
            class="absolute w-[1245px] top-[142px] flex justify-center items-center"
            alt=""
          />
        </div>
      </div>
      <div
        class="index-arrow-vap flex justify-center items-center w-full h-[68px] absolute top-[252px] left-1/2 -translate-x-1/2 cursor-pointer"
      ></div>
      <div
        class="index-btn-vap w-[326px] h-[132px] absolute top-[340px] left-1/2 -translate-x-1/2 cursor-pointer"
      ></div>
    </n-carousel-item>
    <n-carousel-item @click="emit('clickBanner', 2)">
      <img
        v-lazyLoad="bg_banner_two"
        src=""
        class="w-full h-[550px] cursor-pointer"
        alt=""
      />
    </n-carousel-item>
    <template #dots="{ total, currentIndex, to }">
      <ul
        class="index-banner-dots flex items-end absolute bottom-[20px] left-1/2 -translate-x-1/2"
      >
        <li
          v-for="index of total"
          :key="index"
          class="mx-[4px]"
          :class="{ ['is-active']: currentIndex === index - 1 }"
          @click="to(index - 1)"
        ></li>
      </ul>
    </template>
  </n-carousel>
</template>
<script lang="ts">
import { NCarousel, NCarouselItem } from 'naive-ui'

export default {
  name: 'IndexBanner',
}
</script>
<script lang="ts" setup>
import index_banner_one_text from '@/assets/images/index/index-banner-one-text.png'
import bg_banner_two from '@/assets/images/index/bg_banner_two.jpg'
import indexArrowVideo from '@/assets/vapAssets/video/index_arrow.mp4'
// @ts-ignore
import bgBannerOneJson from '@/assets/vapAssets/json/bg_banner_one.json'
import bgBannerOneVideo from '@/assets/vapAssets/video/bg_banner_one.mp4'
// @ts-ignore
import indexArrowJson from '@/assets/vapAssets/json/index_arrow.json'
import indexBtnVideo from '@/assets/vapAssets/video/index_btn.mp4'
// @ts-ignore
import indexBtnJson from '@/assets/vapAssets/json/index_btn.json'
// @ts-ignore
import Vap from 'video-animation-player'

const emit = defineEmits(['clickBanner'])
const props = defineProps({
  autoPlay: {
    type: Boolean,
    default: false,
    required: true,
  },
})
const vapInstance = ref<any>(null)
const isAnimationComplete = ref(false)
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
  const vapConfig: any = {
    container: document.querySelector('.index-arrow-vap'),
    src: indexArrowVideo,
    config: indexArrowJson,
    type: 'indexArrow',
    loop: true,
  }
  vapInstance.value = new Vap()
  vapInstance.value.play(handleVapConfig(vapConfig))
  const btnVapConfig: any = {
    container: document.querySelector('.index-btn-vap'),
    src: indexBtnVideo,
    config: indexBtnJson,
    type: 'indexBtn',
    loop: true,
  }
  vapInstance.value = new Vap()
  vapInstance.value.play(handleVapConfig(btnVapConfig))
  const bannerOneVap: any = {
    container: document.querySelector('.index-banner-one-vap'),
    src: bgBannerOneVideo,
    config: bgBannerOneJson,
    type: 'indexBannerOne',
    loop: true,
  }
  vapInstance.value = new Vap()
  vapInstance.value.play(handleVapConfig(bannerOneVap))
}
function animateGradientWrapper() {
  isAnimationComplete.value = true
}
onMounted(() => {
  handleVap()
  animateGradientWrapper()
})
</script>

<style lang="scss">
.index-banner-carousel {
  .index-banner-dots li {
    width: 30px;
    height: 4px;
    clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
    background-color: #dcdcdc;
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  .index-banner-dots li.is-active {
    width: 60px;
    height: 6px;
    background: #8f75ff;
  }
}
.index-arrow-vap {
  canvas {
    width: 660px;
    height: 68px;
  }
}
.index-btn-vap {
  canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
.index-banner-one-vap {
  canvas {
    width: 100%;
    height: 100%;
  }
}
@keyframes wrapper-gradient {
  0% {
    transform: translateY(-100%);
    height: 0;
  }
  50% {
    transform: translateY(-50%);
    height: 50%;
  }
  100% {
    transform: translateY(0);
    height: 100%;
  }
}
.gradient-wrapper {
  display: inline-block;
  overflow: hidden;
  animation: wrapper-gradient 0.5s linear forwards; /* 添加forwards关键字使动画结束后保持最终状态 */
  opacity: 0; /* 开始时设置为不可见 */
}
.gradient-wrapper.active {
  opacity: 1;
}
</style>
