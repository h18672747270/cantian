<!--
 * @Author: Wuzl
 * @Date: 2024-07-10 15:27:00
 * @Description: 
-->
<template>
  <div class="headbox">
    <div class="headbox_left">
      <a href="" class="logo">
        <img src="@/assets/images/csgoCab/logo.png" alt="" />
      </a>
    </div>
    <div class="headbox_center">
      <div class="navitem">
        <span>产品</span>
        <i class="showbtn"></i>
        <div class="dropdown">
          <a
            v-for="(item, index) in producttarList"
            :key="index"
            class="dropdown_item"
            >{{ item }}</a
          >
        </div>
      </div>
      <div class="navitem">
        <span>导航</span>
        <i class="showbtn"></i>
        <div class="dropdown moretar">
          <a
            v-for="(item, index) in tarList"
            :key="index"
            class="dropdown_item"
            >{{ item }}</a
          >
        </div>
      </div>
      <a class="navitem"> <span>支持</span> </a>
      <a class="navitem event-data">
        <img src="@/assets/images/csgoCab/event_data.png" alt="" />
        <img src="@/assets/images/csgoCab/event_new.png" alt="" class="hot" />
      </a>
      <a class="navitem"
        ><img src="@/assets/images/csgoCab/logopo.png" alt=""
      /></a>
    </div>
    <div class="headbox_right">
      <a class="down">
        <i class="iphoneimg"></i>
        移动端下载
      </a>
      <div class="info">
        <a>注册/登录</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const producttarList = ref<string[]>(['CSGO', '对战平台', 'PUBG', '多多自走棋'])
const tarList = ref<string[]>([
  'CSGO大数据',
  '天梯排行榜',
  '赛事中心',
  '封禁榜',
  '社区',
  '锦标赛',
  '5EPL',
  '约战平台',
  '商城(改造中)',
  '5E REPEAK',
])
</script>
