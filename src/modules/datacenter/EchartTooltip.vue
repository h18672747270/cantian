<template>
  <div
    class="box h-[156px] w-[178px] border-[1px] border-[#FF6201] bg-[#2D1300] rounded-[8px] px-[14px] text-[14px] text-[#FFC074] font-[400]"
  >
    <div class="w-full pl-[10px] pt-[10px] flex leading-[14px]">
      <div class="mr-[18px] w-[70px]">办赛场数</div>
      <div>15场</div>
    </div>
    <div class="w-full pl-[10px] pt-[10px] flex leading-[14px]">
      <div class="mr-[18px] w-[70px]">参赛战队数</div>
      <div>15场</div>
    </div>
    <div class="w-full pl-[10px] pt-[10px] flex leading-[14px]">
      <div class="mr-[18px] w-[70px]">参赛人数</div>
      <div>200人</div>
    </div>
    <div class="split w-full h-[1px] my-[12px]"></div>
    <div class="w-full leading-[14px] text-center">下一场赛事时间</div>
    <div
      class="w-full leading-[14px] pt-[10px] flex justify-center items-center"
    >
      <svg-icon
        class-name="datacenter_tips"
        color="#FFC074"
        class="text-[14px] mr-[2px]"
      />
      2024年8月15日
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'EcahrtTooltip',
}
</script>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.box {
  box-shadow: 0 0 3px 3px rgba($color: #0bf975, $alpha: 0.2);
}
.split {
  background-color: rgba($color: #ecb169, $alpha: 0.23);
}
</style>
