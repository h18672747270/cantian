<template>
  <div class="container">
    <top-bar />
    <page-content />
    <foot />
    <div class="bannerlast"></div>
  </div>
</template>
<script lang="ts" setup>
import TopBar from './TopBar.vue'
import PageContent from './PageContent.vue'
import Foot from './Foot.vue'
import 'animate.css'
</script>
<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Microsoft YaHei' !important;
}
a {
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
.container {
  width: 100%;
}
.bannerlast {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 108px;
  z-index: 10;
  background: url(@/assets/images/csgoCab/bottom_banner.png) center no-repeat;
  background-size: contain;
}
</style>
