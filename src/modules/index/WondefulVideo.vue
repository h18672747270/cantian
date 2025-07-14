<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    class="index-video-modal group"
    :auto-focus="false"
    @mask-click="closeModal"
    @esc="closeModal"
  >
    <div
      class="title w-full leading-[44px] pl-[26px] absolute bg-black-500/[.47] top-0 text-[14px] text-[#fff] font-[400]"
      :class="showTitle ? 'opacity-1 visible' : 'opacity-0 invisible'"
    >
      {{ props.title }}
    </div>
    <div
      class="closebtn w-[36px] h-[36px] absolute right-[-36px] top-0 bg-[#151515] flex items-center justify-center text-[16px] cursor-pointer hover:bg-[#262626]"
      @click="closeModal"
    >
      <svg-icon class-name="index_closevideo" color="#8270FF" />
    </div>
    <video
      ref="media"
      class="w-full h-full"
      :src="props.videoPath"
      type="video/mp4"
      controls
      preload="auto"
      @mouseover="showTitle = true"
      @mouseleave="showTitle = false"
      @loadeddata="videoLoaded"
    ></video>
  </n-modal>
</template>
<script lang="ts">
export default {
  name: 'WondefulVideo',
}
</script>
<script setup lang="ts">
import { NModal } from 'naive-ui'

// 控制弹窗显隐 视频标题 视频路径
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    default: '',
    required: true,
  },
  videoPath: {
    type: String,
    default: '',
    required: true,
  },
})
const show = ref<boolean>(false)
watch(
  () => props.showModal,
  value => {
    show.value = value
  },
)
//是否显示标题
const showTitle = ref<boolean>(false)
//video标签
const media = ref<any>(null)
//video加载完第一帧就播放
const videoLoaded = () => {
  media.value?.play()
}
//关闭弹窗
const emit = defineEmits(['closeModal'])
const closeModal = () => {
  emit('closeModal')
}
</script>
<style lang="scss">
.index-video-modal {
  width: 788px !important;
  border-radius: 0;
  padding: 0;
  video {
    object-fit: fill;
  }
  .n-dialog__title {
    display: none;
  }
  .n-dialog__close {
    display: none;
  }
  .n-dialog__content {
    margin: 0 !important;
    height: 444px;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .title {
      background-color: rgba(#000000, 0.47);
      transition: all linear 0.3s;
    }
    .closebtn {
      border: 1px solid #8270ff;
    }
  }
}
</style>
