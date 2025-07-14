<!--
 * @Author: WuZL
 * @Date: 2024-07-017
 * @Description: 公共头部
-->
<template>
  <div class="h-[78px] pr-[24px] pl-[45px] flex bg-black text-white">
    <a href="/" class="w-[160px] h-[40px] inline-block mt-16 mr-[124px]">
      <img :src="news_one" class="h-full" alt="" />
    </a>
    <div class="flex grow">
      <a
        href="/"
        class="group pt-30 mr-[58px] flex flex-col items-center justify-between cursor-pointer hover:text-[#fff]"
        @click="handleActive('')"
      >
        <div class="h-24 flex justify-center items-center">
          <svg-icon
            class-name="head_index"
            :color="!navActive ? '#9b83ff' : ''"
            class="mr-6 text-20 text-[#a19eae] group-hover:text-[#fff]"
          />
          <span
            class="text-16 group-hover:text-[#fff]"
            :class="!navActive ? 'text-white' : 'text-a19eae'"
            >首页</span
          >
        </div>
        <div
          class="h-[4px] bg-[#9b84ff]"
          :class="!navActive ? 'w-[24px]' : 'w-0'"
        ></div>
      </a>
      <a
        href="/eventCenter/"
        class="group pt-30 mr-[58px] flex flex-col items-center justify-between cursor-pointer hover:text-[#fff]"
        @click="handleActive('eventCenter')"
      >
        <div class="h-24 flex justify-center items-center">
          <svg-icon
            class-name="head_eventcenter "
            :color="navActive === 'eventCenter' ? '#9b83ff' : ''"
            class="mr-6 text-20 text-[#a19eae] group-hover:text-[#fff]"
          />
          <span
            class="text-16 group-hover:text-[#fff]"
            :class="navActive === 'eventCenter' ? 'text-white' : 'text-a19eae'"
            >赛事中心</span
          >
        </div>
        <div
          class="h-[4px] bg-[#9b84ff]"
          :class="navActive === 'eventCenter' ? 'w-[24px]' : 'w-0'"
        ></div>
      </a>
      <a
        href="/competitioncenter/"
        class="group pt-30 mr-[58px] flex flex-col items-center justify-between cursor-pointer hover:text-[#fff]"
        @click="handleActive('competitioncenter')"
      >
        <div class="h-24 flex justify-center items-center">
          <svg-icon
            class-name="head_comcenter "
            :color="navActive === 'competitioncenter' ? '#9b83ff' : ''"
            class="mr-6 text-20 text-[#a19eae] group-hover:text-[#fff]"
          />
          <span
            class="text-16 group-hover:text-[#fff]"
            :class="
              navActive === 'competitioncenter' ? 'text-white' : 'text-a19eae'
            "
            >办赛中心</span
          >
        </div>
        <div
          class="h-[4px] bg-[#9b84ff]"
          :class="navActive === 'competitioncenter' ? 'w-[24px]' : 'w-0'"
        ></div>
      </a>
      <a
        href="/datacenter/"
        class="group pt-30 mr-[58px] flex flex-col items-center justify-between cursor-pointer hover:text-[#fff]"
        @click="handleActive('datacenter')"
      >
        <div class="h-24 flex justify-center items-center">
          <svg-icon
            class-name="head_data "
            :color="navActive === 'datacenter' ? '#9b83ff' : ''"
            class="mr-6 text-20 text-[#a19eae] group-hover:text-[#fff]"
          />
          <span
            class="text-16 group-hover:text-[#fff]"
            :class="navActive === 'datacenter' ? 'text-white' : 'text-a19eae'"
            >数据中心</span
          >
        </div>
        <div
          class="h-[4px] bg-[#9b84ff]"
          :class="navActive === 'datacenter' ? 'w-[24px]' : 'w-0'"
        ></div>
      </a>
    </div>
    <div
      class="commheader-userinfo text-[14px] font-[700] cursor-pointer flex justify-between items-center relative mr-[36px]"
      @mouseover="token ? (userInfoShow = true) : ''"
      @mouseleave="userInfoShow = false"
    >
      <a v-if="!token" class="hover:text-[#9b84ff]" @click="login">注册/登录</a>
      <div v-else class="flex items-center">
        <img
          :src="userInfo.headPortrait"
          class="w-[44px] h-[44px] rounded-[22px]"
          alt=""
        />
        <span class="ml-[24px] hover:text-[#9b84ff]">{{
          userInfo.userName
        }}</span>
      </div>
      <div
        v-if="userInfoShow"
        class="absolute bg-white w-[166px] top-[72px] rounded-[19px] shadow-[-2px_0px_8px_2px_rgba(0,0,0,0.04)] pt-[6px] pb-[6px]"
      >
        <div
          v-for="item in userInfoLists"
          :key="item.icon"
          :class="[
            'flex mx-[7px] w-[152px] h-[38px] rounded-[19px] items-center justify-center text-[#ababab] hover:bg-[#f3f3f3]',
            { '!bg-[#f5f3fd]': item.selected },
          ]"
          @click="goDetail(item)"
        >
          <svg-icon
            :class-name="item.icon"
            :color="item.selected ? '#4f27fc' : '#ababab'"
          />
          <span :class="['ml-[10px]', { 'text-[#4f27fc]': item.selected }]">{{
            item.label
          }}</span>
        </div>
      </div>
    </div>
  </div>
  <login-modal :show-modal="loginShow" @close-modal="closeLogin"></login-modal>
</template>
<script lang="ts">
export default {
  name: 'CommHeader',
}
</script>
<script setup lang="ts">
import news_one from '@/assets/images/competition/header_logo.png'
import { useLoginStore, useHeaderStore } from '@/store'
// @ts-ignore
// eslint-disable-next-line no-undef
const assetsPrefix = GLOBAL_VARIABLE.VITE_APP_ASSETS_BASE_URL
const store = useLoginStore()
const headerStore = useHeaderStore()
//控制登陆注册弹窗显隐
const loginShow = ref<boolean>(false)
//当前选中页面
const navActive = ref<string>(window.location.pathname.replace(/\//g, ''))
//token值
const token = ref<any>(localStorage.getItem('token'))

const userInfo = ref<any>({
  userName: '',
  headPortrait: '',
})
const userInfoShow = ref<boolean>(false)

const userInfoLists = ref([
  {
    icon: 'header_user',
    label: '个人中心',
    path: '/personalcenter/',
    selected: false,
  },
  { icon: 'header_quit', label: '退出登录' },
])
//切换当前显示页面
const handleActive = (navName: string) => {
  navActive.value = navName
}
//显示登陆注册弹窗
const login = () => {
  loginShow.value = true
}
const init = () => {
  let local = JSON.parse(<any>window.localStorage.getItem('userInfo'))
  if (local) {
    userInfo.value = {
      userName: local.userName,
      headPortrait: assetsPrefix + local.headPortrait,
    }
  }
  userInfoLists.value.forEach(item => {
    if (item.path) {
      item.selected = item.path === window.location.pathname
    }
  })
}
onMounted(() => {
  init()
})
//头像下拉框事件
const goDetail = (val: any) => {
  if (val.path && val.path === '/personalcenter/' && !val.selected) {
    location.href = val.path
  } else if (!val.path) {
    localStorage.removeItem('token')
    token.value = ''
    userInfoShow.value = false
  }
}

//关闭登陆注册弹窗
const closeLogin = (value: string) => {
  loginShow.value = false
  store.changeLoginFlag(true)
  if (value === 'success') {
    token.value = localStorage.getItem('token')
    let local = JSON.parse(<any>window.localStorage.getItem('userInfo'))
    if (local) {
      userInfo.value = {
        userName: local.userName,
        headPortrait: assetsPrefix + local.headPortrait,
      }
    }
    // 个人中心需刷新页面
    if (!store.isReload) {
      location.reload()
    }
  }
}
watch(
  () => store.loginFlag,
  value => {
    if (!value) login()
  },
)
watch(
  () => headerStore.headerImg,
  value => {
    userInfo.value.headPortrait = assetsPrefix + value
  },
)
</script>
<style lang="scss" scoped>
.commheader-userinfo {
  transition: 0.3s;
}
</style>
