<!--
 * @Author: Wuzl
 * @Date: 2024-07-08 10:15:18
 * @Description: 人机校验弹窗
-->
<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :mask-closable="false"
    class="slider-modal"
    :close-on-esc="false"
    :auto-focus="false"
  >
    <div class="closebutton">
      <svg-icon
        class-name="login_closecircle"
        color="#bfbfbf"
        @click="emit('closeModal', 'close')"
      />
    </div>
    <div class="title">智能验证</div>
    <div class="slider-check-box">
      <div class="slider-check" :class="rangeStatus ? 'success' : ''">
        <div class="movebtn" @mousedown="rangeMove">
          <svg-icon v-if="rangeStatus" class-name="success" color="#5325FE" />
          <svg-icon v-else class-name="arrow" color="#8C8C8C" />
        </div>
        <div class="silder-word">
          {{ sliderWord }}
        </div>
      </div>
    </div>
  </n-modal>
</template>
<script lang="ts">
export default {
  name: 'SliderCheck',
}
</script>
<script setup lang="ts">
import { NModal } from 'naive-ui'
// 控制弹窗显隐
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
    required: true,
  },
})
const showModal = computed(() => props.showModal)
//关闭弹窗
const emit = defineEmits(['closeModal'])
//滑动距离 是否滑动到最后 文字变化
const disX = ref<number>(0)
const rangeStatus = ref<boolean>(false)
const sliderWord = computed(() =>
  rangeStatus.value ? '验证成功' : '请拖住滑块，拖动到最右边',
)
//打开弹窗需控制为false
watch(
  () => props.showModal,
  value => {
    if (value) {
      rangeStatus.value = false
    }
  },
)
//滑动事件
const rangeMove = (e: any) => {
  let ele: any = document.getElementsByClassName('movebtn')[0]
  let startX = e.clientX
  let eleWidth = ele.offsetWidth
  let parentWidth = ele.parentElement.offsetWidth

  let MaxX = parentWidth - eleWidth
  if (rangeStatus.value) {
    //不运行
    return false
  }
  document.onmousemove = e => {
    let endX = e.clientX
    disX.value = endX - startX
    if (disX.value <= 0) {
      disX.value = 0
    }
    if (disX.value >= MaxX) {
      //减去滑块的宽度,体验效果更好
      disX.value = MaxX
    }

    ele.style.transition = 'all'
    ele.style.left = (disX.value / parentWidth) * 100 + '%'
    ele.parentElement.style.setProperty('--move-transition', 'all')
    ele.parentElement.style.setProperty(
      '--move-width',
      (disX.value / parentWidth) * 100 + '%',
    )

    e.preventDefault()
  }
  document.onmouseup = () => {
    if (disX.value !== MaxX) {
      ele.style.transition = '.5s all'
      ele.style.left = '0'
      ele.parentElement.style.setProperty('--move-transition', '.5s all')
      ele.parentElement.style.setProperty('--move-width', 0)
    } else {
      rangeStatus.value = true
      setTimeout(() => {
        emit('closeModal', 'success')
      }, 1000)
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}
</script>
<style lang="scss">
$blue: #5325fe;

@mixin jc-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-modal {
  width: 360px !important;
  height: 140px;
  background: #ffffff;
  border-radius: 4px;
  padding: 0;

  .n-dialog__close {
    display: none;
  }

  .n-dialog__title {
    display: none;
  }

  .n-dialog__content {
    margin: 0 !important;
    padding: 16px 30px 24px 30px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    position: relative;
    .closebutton {
      position: absolute;
      right: 26px;
      top: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      cursor: pointer;
    }
    .title {
      font-size: 16px;
      color: #8c8c8c;
    }

    .slider-check-box {
      width: 300px;
      height: 40px;

      .slider-check {
        cursor: pointer;
        --move-width: 0;
        --move-transition: all;
        position: relative;
        user-select: none;
        @include jc-flex;
        height: 40px;
        background: #bfbfbf;
        border-radius: 4px;

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: var(--move-width);
          height: 100%;
          background-color: $blue;
          transition: var(--move-transition);
        }

        .silder-word {
          margin-left: 50px;
          width: 250px;
          text-align: center;
          font-size: 14px;
          color: #595959;
        }

        &.success {
          .silder-word {
            color: #fff;
            z-index: 1;
            margin-left: 0;
            margin-right: 50px;
          }
        }

        .movebtn {
          z-index: 1;
          border-radius: 4px;
          position: absolute;
          left: 0;
          width: 48px;
          height: 100%;
          background-color: #fff;
          box-shadow: 0 2px 16px rgba(111, 152, 223, 0.09);
          cursor: pointer;
          font-size: 24px;
          @include jc-flex;
          .svg-icon-arrow {
            transform: rotateZ(90deg);
          }
        }
      }
    }
  }
}
</style>
