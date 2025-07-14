<template>
  <div class="animate-container overflow-hidden">
    <div class="common-footer relative bg-[#0A0915]">
      <div class="mb-20 flex justify-center">
        <div
          class="common--contact-item cursor-pointer text-14 text-808080 hover:text-333"
        >
          关于5EPlay
        </div>
        <div
          class="common--contact-item cursor-pointer text-14 text-808080 hover:text-333"
        >
          联系我们
        </div>
        <div
          class="common--contact-item cursor-pointer text-14 text-808080 hover:text-333"
        >
          商务合作
        </div>
        <div
          class="common--contact-item cursor-pointer text-14 text-808080 hover:text-333"
        >
          服务条款
        </div>
        <div
          class="common--contact-item cursor-pointer text-14 text-808080 hover:text-333"
        >
          个人信息保护政策
        </div>
        <div
          class="common--contact-item cursor-pointer text-14 text-808080 hover:text-333"
        >
          个人信息保护指引
        </div>
        <div
          class="common--contact-item cursor-pointer text-14 text-808080 hover:text-333"
        >
          加入我们
        </div>
      </div>
      <div class="mb-22 text-center text-14 text-808080">
        本平台适合年满17岁以上的用户使用:为了您的健康，请合理控制游戏时间
      </div>
      <div class="mb-20 text-center text-14 text-808080">
        <span class="px-13">@2011-2024 咸宁市志帆科技有限公司</span>
        <span class="px-13 cursor-pointer hover:text-333"
          >鄂ICP备2023019279号-3</span
        >
        <span class="px-13 cursor-pointer hover:text-333"
          >鄂公网安备42120202000498号</span
        >
        <span class="px-13 cursor-pointer hover:text-333">营业执照</span>
      </div>
      <div class="flex justify-center">
        <a href="/">
          <img
            v-lazyLoad="logo"
            :src="default_image"
            class="w-[140px] h-[36px]"
            alt=""
          />
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DataCenterFooter',
}
</script>
<script lang="ts" setup>
import logo from '@/assets/images/dataCenter/datacenter_logo.png'
import default_image from '@/assets/images/common/default.png'
</script>

<style lang="scss" scoped>
.common-footer {
  padding: 64px 0 32px 0;
  position: relative;
  bottom: 0;
  opacity: 1;
}

.common--contact-item {
  padding: 0 30px;
  line-height: 20px;
  border-right: 1px solid #d0d0d0;
  &:last-child {
    border: none;
  }
}
</style>
