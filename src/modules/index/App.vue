<template>
  <top-center-bottom>
    <template #header>
      <comm-header />
    </template>
    <template #content>
      <wondeful-video
        :show-modal="videoModal"
        :title="videoTitle"
        :video-path="videoPath"
        @close-modal="closeVideoModal"
      />
      <div class="bg-[#f3f3f3]">
        <!-- START banner -->
        <index-banner
          :auto-play="isAutoPlay"
          @click-banner="handleBannerClick"
        />
        <!-- END banner -->
        <!-- START 赛事直通车 -->
        <div class="flex justify-start pt-[62px] pb-[34px] px-[260px]">
          <p class="pr-[84px] text-333 text-[26px] leading-[36px]">
            赛事直通车
          </p>
          <div
            class="flex justify-start grow relative border-b border-[#333]/[0.5] border-solid"
          >
            <div
              class="w-[118px] text-center leading-[36px] text-[16px] text-[#252424] hover:text-[#3d23fe] cursor-pointer"
              :class="gameInfoBarActive === 'CS2' ? 'text-[#3d23fe]' : ''"
              @click="gameNavBarChange('CS2')"
            >
              CS2
            </div>
            <div
              class="w-[118px] text-center leading-[36px] text-[16px] text-[#252424] hover:text-[#3d23fe] cursor-pointer"
              :class="gameInfoBarActive === 'DOTA' ? 'text-[#3d23fe]' : ''"
              @click="gameNavBarChange('DOTA')"
            >
              DOTA
            </div>
            <div
              class="game-info-bar w-[118px] h-[2px] absolute bottom-0 bg-[#3d23fe] duration-500 ease-out"
              :style="{
                left:
                  gameInfoBarActive === 'CS2' ? '0' : `${calculateVw(118)}vw`,
              }"
            ></div>
          </div>
          <div
            class="flex justify-start items-end pl-[20px] text-12 text-[#6b6b6b]"
          >
            <div class="flex items-center cursor-pointer">
              <span class="mr-[6px] text-[12px] text-[#898989]">更多</span>
              <svg-icon
                class="text-[12px] text-[#898989]"
                class-name="index_more"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-between px-[260px] pb-[54px] gime-form">
          <div
            v-for="(item, index) in gameInfoBarActive === 'CS2'
              ? csGameInfoList
              : dotaGameInfoList"
            :key="index"
            class="game-info-item partlyHidden flex flex-col relative w-[264px] h-[250px] duration-500 ease-out"
            @mouseenter="toggleMask(item.type)"
            @mouseleave="toggleMaskLeave"
          >
            <div
              class="flex justify-between h-[30px] leading-[30px] bg-[#e1e2e8]"
            >
              <div class="flex items-center pl-[12px]">
                <span
                  class="inline-block w-[10px] h-[10px] mr-[4px] bg-black rotate-45"
                  :style="{ 'background-color': item.hostColor }"
                ></span>
                <p class="text-[#252424] font-bold text-[14px]">
                  {{ item.host }}
                </p>
              </div>
              <div class="flex items-center pr-[16px]">
                <span class="text-[#515050] text-[12px]">赛事地点</span>
                <span class="w-[1px] h-[10px] mx-[6px] bg-[#838282]"></span>
                <span class="mr-[4px] text-[#252525] font-bold text-[12px]">{{
                  item.location
                }}</span>
                <svg-icon class="text-[12px]" class-name="index_location" />
              </div>
            </div>
            <div class="grow px-[20px] pt-[14px] pb-[14px] bg-white">
              <p
                class="pb-[20px] leading-[16px] text-[#232323] text-[14px] text-center"
              >
                襄阳市第二届CS竞技公开赛
              </p>
              <div class="flex justify-center">
                <img
                  v-lazyLoad="game_cup"
                  :src="default_image"
                  class="w-[38px] h-[72px] mr-[14px]"
                  alt=""
                />
                <div class="pt-[18px]">
                  <p
                    class="mb-[8px] leading-[24px] font-bold text-[24px] text-[#232323]"
                  >
                    {{ item.bonus }}
                  </p>
                  <p class="leading-[18px] text-[#8d8d8d] text-[14px]">
                    赛事奖金
                  </p>
                </div>
              </div>
              <div class="py-[14px] border-b border-solid border-[#f5f5f5]">
                <p
                  class="text-center leading-[18px] text-[#232323] text-[14px]"
                >
                  {{ item.date }}
                </p>
              </div>
              <div class="flex justify-between items-center pt-[14px]">
                <p class="leading-[16px] text-[#898989] text-[12px]">
                  {{ `报名数量 ${item.applyNum}/${item.limit}` }}
                </p>
                <p class="w-[114px] h-[4px] relative bg-[#e9e9e9]">
                  <span
                    class="apply-bar h-[4px] absolute left-0 top-0"
                    :style="{ width: `${(item.applyNum / item.limit) * 100}%` }"
                  ></span>
                </p>
              </div>
            </div>

            <div
              :class="[
                'game-info-mask',
                'absolute',
                'left-0',
                'right-0',
                'flex-col',
                'items-center',
                ' w-full',
                'h-full',
                'pt-[22px]',
                'px-[20px]',
                'pb-[28px]',
                'bg-black',
                'opacity-80',
                showMask == item.type ? 'game-mask ' : 'game-hidden',
                ,
              ]"
            >
              <p
                class="mb-[24px] leading-[16px] text-[14px] font-bold text-[#cdcdcd] text-center"
              >
                襄阳市第二届CS竞技公开赛
              </p>
              <div
                class="flex justify-center items-center mb-[26px] text-[#cdcdcd]"
              >
                <div>
                  <p class="mb-[10px] leading-[18px] text-[14px]">高校举办</p>
                  <p
                    class="flex justify-between items-center h-[18px] pl-[8px] text-[14px]"
                  >
                    <svg-icon class-name="index_location2" />{{ item.location }}
                  </p>
                </div>
                <div
                  class="w-[1px] h-[40px] mx-[20px] bg-[#474747] opacity-65"
                ></div>
                <div>
                  <p class="mb-[6px] leading-[24px] text-[24px] font-bold">
                    {{ item.bonus }}
                  </p>
                  <p class="leading-[18px] text-[14px]">赛事奖金</p>
                </div>
              </div>
              <p class="mb-[18px] leading-[18px] text-[14px] text-[#cdcdcd]">
                {{ item.date }}
              </p>
              <div class="h-[1px] w-[210px] mb-[16px] bg-[#474747]"></div>
              <div
                class="flex justify-center items-center w-[210px] px-[16px] border border-solid border-[#b7a9ff] text-[#b7a9ff] hover:border-[#8270ff] hover:text-[#8270ff] cursor-pointer"
                @click="isLoginJump('')"
              >
                <span class="mr-[6px] leading-[40px] text-[14px]">{{
                  `立即报名 ${item.applyNum}/${item.limit}`
                }}</span>
                <svg-icon class-name="right" />
              </div>
            </div>
          </div>
        </div>
        <!-- END 赛事直通车 -->
        <!-- START 最新战队动态 -->
        <div
          class="flex justify-between items-end px-[260px] pt-[36px] pb-[34px] bg-[#e5e5e5]"
        >
          <p class="leading-[36px] text-[26px] text-[#232323]">最新战队动态</p>
          <div class="flex items-center cursor-pointer">
            <span class="mr-[6px] text-[12px] text-[#898989]">更多</span>
            <svg-icon
              class="text-[12px] text-[#898989]"
              class-name="index_more"
            />
          </div>
        </div>
        <div class="px-[260px] bg-[#e5e5e5]">
          <div class="team-dynamics-container flex pb-[40px] overflow-hidden">
            <div
              class="team-animate-container shrink-0 basis-full flex justify-start items-center w-full will-change-transform"
            >
              <div
                v-for="item in schoolList"
                :key="item.name"
                class="school-opacity schoolHidden flex flex-col items-center w-[160px] h-[254px] pt-[20px] mr-[12px] text-center bg-white border-b-2 border-white hover:border-[#4b21f4]"
              >
                <p
                  class="w-full mb-[6px] px-[10px] leading-[16px] text-[14px] truncate"
                >
                  {{ item.name }}
                </p>
                <img
                  v-lazyLoad="item.emblem"
                  class="w-[84px] h-[84px] mb-[16px]"
                  :src="default_image"
                  alt=""
                />
                <div class="w-[132px] h-[1px] mb-[10px] bg-[#e8e8e8]"></div>
                <p
                  class="w-full mb-[4px] px-[10px] leading-[18px] text-[#232323] font-bold text-[14px] truncate"
                >
                  {{ item.teamName }}
                </p>
                <p class="mb-[18px] leading-[20px] text-[14px] text-[#8d8d8d]">
                  成员
                  <span class="text-[16px] font-bold text-[#4b21f4]">{{
                    `${item.member}/${item.limit}`
                  }}</span>
                </p>
                <div
                  class="w-[60px] border border-[#4b21f4] leading-[24px] text-[14px] text-[#4b21f4] hover:text-[#f9f9f9] cursor-pointer hover:bg-[#4b21f4]"
                  @click="isLoginJump('')"
                >
                  加入
                </div>
              </div>
            </div>
            <div
              class="team-animate-container shrink-0 basis-full flex justify-start items-center w-full will-change-transform"
            >
              <div
                v-for="item in schoolList"
                :key="item.name"
                class="flex flex-col items-center h-[254px] pt-[20px] mr-[12px] text-center bg-white border-b-2 border-white hover:border-[#4b21f4]"
              >
                <p
                  class="w-full mb-[6px] px-[10px] leading-[16px] text-[14px] truncate"
                >
                  {{ item.name }}
                </p>
                <img
                  v-lazyLoad="item.emblem"
                  class="w-[84px] h-[84px] mb-[16px]"
                  :src="default_image"
                  alt=""
                />
                <div class="w-[132px] h-[1px] mb-[10px] bg-[#e8e8e8]"></div>
                <p
                  class="w-full mb-[4px] px-[10px] leading-[18px] text-[#232323] font-bold text-[14px] truncate"
                >
                  {{ item.teamName }}
                </p>
                <p class="mb-[18px] leading-[20px] text-[14px] text-[#8d8d8d]">
                  成员
                  <span class="text-[16px] font-bold text-[#4b21f4]">{{
                    `${item.member}/${item.limit}`
                  }}</span>
                </p>
                <div
                  class="w-[60px] border border-[#4b21f4] leading-[24px] text-[14px] text-[#4b21f4] hover:text-[#f9f9f9] cursor-pointer hover:bg-[#4b21f4]"
                  @click="isLoginJump('')"
                >
                  加入
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END 最新战队动态 -->
        <!-- START 精彩资讯 -->
        <div
          class="flex justify-between items-end px-[260px] pt-[62px] mb-[34px]"
        >
          <p class="leading-[36px] text-[26px] text-[#232323]">精彩资讯</p>
          <div class="flex items-center cursor-pointer">
            <span class="mr-[6px] text-[12px] text-[#898989]">更多</span>
            <svg-icon
              class="text-[12px] text-[#898989]"
              class-name="index_more"
            />
          </div>
        </div>
        <div class="flex justify-start px-[260px]">
          <div class="w-[522px] flex-shrink-0">
            <n-carousel
              :current-index="informationActive - 1"
              :show-dots="false"
              class="h-[422px]"
              :speed="10000"
            >
              <img
                v-lazyLoad="bg_information_one"
                src=""
                class="w-full h-[422px] object-cover cursor-pointer"
                alt=""
                fetchpriority="high"
              />
              <img
                v-lazyLoad="bg_information_two"
                src=""
                class="w-full h-[422px] object-cover cursor-pointer"
                alt=""
                fetchpriority="low"
              />
            </n-carousel>
            <div class="flex leading-[46px]">
              <div
                class="w-1/2 px-[10px] text-[14px] text-center truncate border-b-[2px] border-transparent bg-[#e8e9ed] cursor-pointer"
                :class="{
                  '!bg-white !border-[#5e48ff] !text-[#4b21f4]':
                    informationActive === 1,
                }"
                @mouseenter="gameInfoChange(1)"
              >
                NiKo谈电竞世界杯决赛失利
              </div>
              <div
                class="w-1/2 px-[10px] text-[14px] text-center truncate border-b-[2px] border-transparent bg-[#e8e9ed] cursor-pointer"
                :class="{
                  '!bg-white !border-[#5e48ff] !text-[#4b21f4]':
                    informationActive === 2,
                }"
                @mouseenter="gameInfoChange(2)"
              >
                精彩纷呈 回顾历史上在国内举行的顶级CS赛事
              </div>
            </div>
          </div>
          <div
            class="game-video-container grow flex justify-between flex-wrap pl-[20px]"
          >
            <div
              v-for="(item, index) in videoList"
              :key="index"
              class="videoHidden school-opacity game-video-item w-[264px] h-[224px]"
            >
              <div
                class="game-video-mask w-full h-[148px] m-0 relative cursor-pointer"
                @click="openVideoModal(item)"
              >
                <img
                  v-lazyLoad="item.bg_video"
                  :src="default_image"
                  class="w-full h-full object-cover"
                  alt=""
                />
                <div
                  class="video-mask-bg hidden w-full h-full absolute left-0 top-0 z-[1] bg-black opacity-50"
                ></div>
                <svg-icon
                  class="hidden absolute left-1/2 top-1/2 z-[2] -translate-y-1/2 -translate-x-1/2 text-white text-[54px]"
                  class-name="index_video_play"
                />
              </div>
              <div class="px-[16px] py-[12px] bg-white">
                <p
                  class="game-video-title mb-[16px] leading-[20px] text-[#232323] text-[14px] cursor-pointer hover:text-[#3c3bea]"
                >
                  {{ item.title }}
                </p>
                <p
                  class="flex justify-between leading-[16px] text-[12px] text-[#ababab]"
                >
                  <span>{{ item.viewNumber }}次播放</span>
                  <span>{{ item.time }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- END 精彩资讯 -->
        <!-- START 俱乐部计划 -->
        <div
          class="animate-container club-display-container relative px-[260px] pt-[82px]"
        >
          <team-display />
        </div>
        <!-- END 俱乐部计划 -->
      </div>
    </template>
    <!-- START 俱乐部计划 -->
    <template #footer>
      <common-footer />
    </template>
    <!-- END 俱乐部计划 -->
  </top-center-bottom>
  <!-- START 开屏动画 -->
  <div
    v-if="!animateLoaded"
    class="animate-mask flex justify-center items-center w-screen h-screen fixed left-0 top-0 z-[999] bg-[#000000]"
    :class="{ 'opacity-0': animateLoadedVisible }"
  >
    <div v-if="!mainAnimateLoaded" class="animate-mask-image relative">
      <img
        v-lazyLoad="bg_animate"
        src=""
        class="max-w-[1060px] w-[1060px] h-[100px] absolute -left-[1060px] top-0"
        :class="{ '!left-0': bg_animate_loaded }"
        alt=""
        @load="handleImageLoad"
      />
    </div>
    <index-vap v-else @animate-loaded="handleAnimateLoaded" />
    <div
      class="invite-container flex justify-center items-center w-full h-[140px] absolute left-0 bottom-0 text-white"
    >
      <div
        class="flex items-center w-[456px] h-[70px] relative pl-[40px] bg-black border border-[#a07fff] rounded-[36px]"
      >
        <input
          v-model="inviteCode"
          type="text"
          placeholder="请输入四位数邀请码"
          @input="inviteInput"
        />
        <div
          v-throttle="{ method: 'click', callback: handleInviteConfirm }"
          class="invite-confirm flex justify-center items-center w-[150px] h-[70px] absolute -right-[1px] -top-[1px] rounded-[36px] bg-[#511fe0] cursor-pointer"
        >
          <span class="text-[#dabfff] text-[26px] opacity-100">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import bg_animate from '@/assets/images/index/bg_animate.png'
import game_cup from '@/assets/images/index/game_cup.png'
import university_one from '@/assets/images/index/university_one.png'
import university_two from '@/assets/images/index/university_two.png'
import university_three from '@/assets/images/index/university_three.png'
import university_four from '@/assets/images/index/university_four.png'
import university_five from '@/assets/images/index/university_five.png'
import university_six from '@/assets/images/index/university_six.png'
import university_seven from '@/assets/images/index/university_seven.png'
import university_eight from '@/assets/images/index/university_eight.png'
import bg_information_one from '@/assets/images/index/bg_information_one.jpg'
import bg_information_two from '@/assets/images/index/bg_information_two.jpg'
import default_image from '@/assets/images/common/default.png'
import bg_video1 from '@/assets/images/index/bg_video1.jpg'
import bg_video2 from '@/assets/images/index/bg_video2.jpg'
import bg_video3 from '@/assets/images/index/bg_video3.jpg'
import bg_video4 from '@/assets/images/index/bg_video4.jpg'
import bg_video5 from '@/assets/images/index/bg_video5.jpg'
import bg_video6 from '@/assets/images/index/bg_video6.jpg'
export default {
  name: 'Index',
}
</script>
<script setup lang="ts">
import { verifyInviteCodeReq } from '@/api/eventCenter/eventCenter'
import { NCarousel } from 'naive-ui'
import IndexBanner from './IndexBanner.vue'
import IndexVap from './IndexVap.vue'
import { calculateVw } from '@/utils/utils'
import gsap from 'gsap'
import TeamDisplay from './TeamDisplay.vue'
import WondefulVideo from './WondefulVideo.vue'
import { isLoginJump } from '@/utils/isLoginJump'
const showMask = ref(false)
const handeMask = ref(false)
function toggleMask(value: any) {
  handeMask.value = true
  showMask.value = value
  console.log(showMask.value)
}
function toggleMaskLeave() {
  handeMask.value = true
  showMask.value = false
}
// @ts-ignore
// eslint-disable-next-line no-undef
const assetsPrefix = GLOBAL_VARIABLE.VITE_APP_ASSETS_BASE_URL
const gameInfoBarActive = ref<string>('CS2')
const csGameInfoList = ref<any[]>([
  {
    type: 1,
    host: '政府举办',
    hostColor: '#ec2424',
    location: '武汉',
    bonus: 20000,
    date: '2024/6/24 -2024/9/24',
    limit: 32,
    applyNum: 12,
  },
  {
    type: 2,
    host: '企业举办',
    hostColor: '#5b2fff',
    location: '武汉',
    bonus: 18000,
    date: '2024/6/24 -2024/9/24',
    limit: 32,
    applyNum: 28,
  },
  {
    type: 3,
    host: '高校举办',
    hostColor: '#1379f3',
    location: '武汉',
    bonus: 80000,
    date: '2024/6/24 -2024/9/24',
    limit: 32,
    applyNum: 30,
  },
  {
    type: 4,
    host: '个人举办',
    hostColor: '#00c589',
    location: '武汉',
    bonus: 6000,
    date: '2024/6/24 -2024/9/24',
    limit: 32,
    applyNum: 10,
  },
  {
    type: 5,
    host: '企业举办',
    hostColor: '#5b2fff',
    location: '武汉',
    bonus: 20000,
    date: '2024/6/24 -2024/9/24',
    limit: 16,
    applyNum: 10,
  },
])
const dotaGameInfoList = ref<any[]>([
  {
    type: 6,
    host: '企业举办',
    hostColor: '#5b2fff',
    location: '武汉',
    bonus: 18000,
    date: '2024/6/24 -2024/9/24',
    limit: 32,
    applyNum: 26,
  },
  {
    type: 7,
    host: '高校举办',
    hostColor: '#1379f3',
    location: '武汉',
    bonus: 80000,
    date: '2024/6/24 -2024/9/24',
    limit: 32,
    applyNum: 14,
  },
  {
    type: 8,
    host: '个人举办',
    hostColor: '#00c589',
    location: '武汉',
    bonus: 6000,
    date: '2024/6/24 -2024/9/24',
    limit: 32,
    applyNum: 8,
  },
  {
    type: 9,
    host: '政府举办',
    hostColor: '#ec2424',
    location: '武汉',
    bonus: 20000,
    date: '2024/6/24 -2024/9/24',
    limit: 32,
    applyNum: 30,
  },
  {
    type: 10,
    host: '企业举办',
    hostColor: '#5b2fff',
    location: '武汉',
    bonus: 20000,
    date: '2024/6/24 -2024/9/24',
    limit: 32,
    applyNum: 19,
  },
])
const schoolList = ref<any[]>([
  {
    type: 11,
    name: '武汉科技大学',
    emblem: university_one,
    teamName: 'Science战队',
    limit: 5,
    member: 3,
  },
  {
    type: 12,
    name: '武汉大学',
    emblem: university_two,
    teamName: '热干面战队',
    limit: 5,
    member: 4,
  },
  {
    type: 13,
    name: '武汉理工大学',
    emblem: university_three,
    teamName: 'WL战队',
    limit: 5,
    member: 3,
  },
  {
    type: 14,
    name: '武汉工程大学',
    emblem: university_four,
    teamName: '热干面战队',
    limit: 5,
    member: 2,
  },
  {
    type: 15,
    name: '华中师范大学',
    emblem: university_five,
    teamName: 'TQ战队',
    limit: 5,
    member: 1,
  },
  {
    type: 16,
    name: '华中科技大学',
    emblem: university_six,
    teamName: '关山口职业战队',
    limit: 5,
    member: 5,
  },
  {
    type: 17,
    name: '中南民族大学',
    emblem: university_seven,
    teamName: 'ZNMZ战队',
    limit: 5,
    member: 3,
  },
  {
    type: 18,
    name: '湖北美术学院',
    emblem: university_eight,
    teamName: 'ART战队',
    limit: 5,
    member: 4,
  },
])
const videoList = ref<any[]>([
  {
    title: 'CS2电竞世界杯G2 vs Mongolz 第一局（1）',
    viewNumber: 4692,
    time: '2024-7-23',
    bg_video: bg_video2,
    videoPath: assetsPrefix + 'web/video/wonderful2.mp4',
  },
  {
    title: 'CS2电竞世界杯G2 vs Mongolz 第一局（2）',
    viewNumber: 3212,
    time: '2024-7-23',
    bg_video: bg_video3,
    videoPath: assetsPrefix + 'web/video/wonderful3.mp4',
  },
  {
    title: 'm0NESY集锦',
    viewNumber: 4152,
    time: '2024-7-24',
    bg_video: bg_video1,
    videoPath: assetsPrefix + 'web/video/wonderful.mp4',
  },
  {
    title: 'CS2电竞世界杯G2 vs Mongolz 第一局（3）',
    viewNumber: 3965,
    time: '2024-7-23',
    bg_video: bg_video4,
    videoPath: assetsPrefix + 'web/video/wonderful4.mp4',
  },
  {
    title: 'CS2电竞世界杯G2 vs Mongolz 第一局（4）',
    viewNumber: 3667,
    time: '2024-7-23',
    bg_video: bg_video6,
    videoPath: assetsPrefix + 'web/video/wonderful6.mp4',
  },
  {
    title: 'donk集锦',
    viewNumber: 5724,
    time: '2024-7-22',
    bg_video: bg_video5,
    videoPath: assetsPrefix + 'web/video/wonderful5.mp4',
  },
])
// video弹窗（显隐、标题、视频）
const videoModal = ref<boolean>(false)
const videoTitle = ref<string>('')
const videoPath = ref<string>('')

const isAutoPlay = ref<boolean>(false) // 控制banner自动播放
//当前选中资讯
const informationActive = ref<number>(1)
const animateLoaded = ref<boolean>(false) // 图片文字动画加载完成控制
const animateLoadedVisible = ref<boolean>(false) // mask黑色遮罩透明度控制
const bg_animate_loaded = ref<boolean>(false) // 图片文字底色位置控制
const mainAnimateLoaded = ref<boolean>(false) // 图片动画加载完成控制
const animateVisibleTimer = ref<any>(null) // 开屏动画结束渐隐显示首页延时器
const inviteCode = ref<string>('') // 邀请码

//播放视频
const openVideoModal = (value: any) => {
  videoTitle.value = value.title
  videoPath.value = value.videoPath
  videoModal.value = true
}
const closeVideoModal = () => {
  videoTitle.value = ''
  videoPath.value = ''
  videoModal.value = false
}
const gameNavBarChange = (active: string): void => {
  gameInfoBarActive.value = active
}

const gameInfoChange = (active: number): void => {
  informationActive.value = active
}

const intersectionInstance = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target.querySelector('div'), {
          opacity: 1,
          bottom: 0,
        })
        if (entry.target.querySelector('.competition-club')) {
          const clubContainer = entry.target.querySelectorAll('.right-box')
          gsap.to(clubContainer, {
            opacity: 1,
            bottom: 0,
          })
          const fontList = entry.target.querySelectorAll('.club-font')
          const timeLine = gsap.timeline()
          fontList.forEach((fontItem, index) => {
            timeLine.to(fontItem, {
              opacity: 1,
              bottom: 0,
              duration: index * 0.04,
            })
          })
        }
      }
    })
  },
)

const handleImageLoad = () => {
  bg_animate_loaded.value = true
  setTimeout(() => {
    mainAnimateLoaded.value = true
  }, 1200)
}

/**
 * 开屏动画加载完成回调
 * @param loop 是否循环 true-循环播放 false-结束播放显示首页
 */
const handleAnimateLoaded = (loop: boolean) => {
  if (loop) {
    animateInit()
  } else {
    animateLoadedVisible.value = true
    clearInterval(animateVisibleTimer.value)
    animateVisibleTimer.value = setTimeout(() => {
      animateLoaded.value = true
      isAutoPlay.value = true
    }, 1000)
  }
}

const inviteInput = () => {
  const reg = /[^a-zA-Z0-9]/g
  inviteCode.value = inviteCode.value.replace(reg, '')
  inviteCode.value = inviteCode.value.slice(0, 4)
  inviteCode.value = inviteCode.value.toLocaleUpperCase()
}

const handleInviteConfirm = () => {
  const reg = /^[a-zA-Z0-9]{4}$/
  if (reg.test(inviteCode.value)) {
    const data = {
      code: inviteCode.value,
    }
    verifyInviteCodeReq(data).then((res: any) => {
      if (res.code === 200 && res.data) {
        window.$message.loading('校验成功，请稍等')
        localStorage.setItem('Expiry', res.data.Expiry ? res.data.Expiry : '')
        localStorage.setItem(
          'ICToken',
          res.data.ICToken ? res.data.ICToken : '',
        )
      } else {
        window.$message.warning(res.msg)
      }
    })
  } else {
    window.$message.warning('请输入四位邀请码！')
  }
}

const animateInit = () => {
  animateLoaded.value = false
  animateLoadedVisible.value = false
  bg_animate_loaded.value = false
  mainAnimateLoaded.value = false
  isAutoPlay.value = false
  const ICToken = localStorage.getItem('ICToken')
  if (ICToken) {
    animateLoaded.value = true
    isAutoPlay.value = true
  }
}
animateInit()

const handleBannerClick = (num: number) => {
  if (num === 2) {
    isLoginJump('competitioncenter', true)
  } else {
    isLoginJump('')
  }
}
const intervalId: any = ref(false)
function partlyHidden() {
  const gameInfoItems = document.querySelectorAll('.partlyHidden')
  let index = 0

  intervalId.value = setInterval(() => {
    if (index < gameInfoItems.length) {
      gameInfoItems[index].classList.add('animate-fadeInFromLeft')
      index++
    } else {
      clearInterval(intervalId.value)
    }
  }, 500) // 每隔1秒显示下一个元素
}
const schoolintervalId: any = ref(false)
function schoolHidden() {
  const gameInfoItems = document.querySelectorAll('.schoolHidden')
  let index = 0

  schoolintervalId.value = setInterval(() => {
    if (index < gameInfoItems.length) {
      gameInfoItems[index].classList.add('animate-schoolHidden')
      index++
    } else {
      clearInterval(schoolintervalId.value)
    }
  }, 500) // 每隔1秒显示下一个元素
}
const videolintervalId: any = ref(false)
function videoHidden() {
  const gameInfoItems = document.querySelectorAll('.videoHidden')
  let index = 0

  videolintervalId.value = setInterval(() => {
    if (index < gameInfoItems.length) {
      gameInfoItems[index].classList.add('animate-videoHidden')
      index++
    } else {
      clearInterval(videolintervalId.value)
    }
  }, 500) // 每隔1秒显示下一个元素
}
onMounted(() => {
  partlyHidden()
  schoolHidden()
  videoHidden()
  const nodeList = document.querySelectorAll('.animate-container')
  nodeList.forEach(item => {
    intersectionInstance.observe(item)
  })

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      if (animateLoadedVisible.value === true) {
        clearTimeout(animateVisibleTimer.value)
        animateVisibleTimer.value = setTimeout(() => {
          animateLoaded.value = true
          isAutoPlay.value = true
        }, 1000)
      } else {
        animateInit()
      }
    }
  })
})
onUnmounted(() => {
  clearInterval(intervalId.value)
  clearInterval(schoolintervalId.value)
  clearInterval(videolintervalId.value)
})
</script>

<style lang="scss" scoped>
.animate-mask {
  transition: 1s linear;
}
.animate-mask-image {
  width: 1000px;
  height: 100px;
  background-image: url('@/assets/images/index/animate_font.png');
  background-size: contain;
  background-repeat: no-repeat;
  mask-image: url('@/assets/images/index/animate_font.png');
  mask-size: contain;
  mask-repeat: no-repeat;
  img {
    transition: 1s ease-in-out;
  }
  &:hover {
    img {
      left: 0;
    }
  }
}
.invite-container {
  background-color: rgba(0, 0, 0, 0.87);
  > div {
    box-shadow: 0px 0px 20px rgba(84, 53, 224),
      inset 0px 0px 8px rgba(117, 69, 255, 1);
  }
  input {
    outline: none;
    background: transparent;
    font-size: 26px;
    line-height: 40px;
    &::-webkit-input-placeholder {
      color: #696969;
    }
    &::-moz-input-placeholder {
      color: #696969;
    }
    &::-ms-input-placeholder {
      color: #696969;
    }
  }
  .invite-confirm {
    box-shadow: inset 0px 0px 8px rgba(117, 69, 255, 1);
    &:hover {
      background: #3f17b1;
    }
  }
}
.game-info-bar {
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    border: 6px solid transparent;
    border-top: 6px solid #3d23fe;
  }
}
.game-info-item {
  opacity: 0;
  overflow: hidden;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.07);
  .apply-bar {
    background: linear-gradient(270deg, #e119ff 0%, #5a39ff 100%);
  }
  &:hover {
    .game-info-mask {
      display: flex;
    }
  }
}
.team-dynamics-container {
  .team-animate-container {
    animation: animate-team 16s linear infinite;
    animation-delay: 4s; /* 设置初始延迟为 8 秒 */
    > div {
      width: 12.5%;
    }
  }
  &:hover {
    .team-animate-container {
      animation-play-state: paused;
    }
  }
}
@keyframes animate-team {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.game-video-container > div {
  &:nth-child(1) {
    margin-bottom: 22px;
  }
}
.game-video-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.game-video-item {
  &:hover {
    .video-mask-bg,
    .svg-icon {
      display: block;
    }
  }
}
.club-display-container {
  &::after {
    content: '';
    border: 30px solid transparent;
    border-top: 30px solid #f3f3f3;
    position: absolute;
    bottom: -56px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
}

@keyframes game-mask-enter {
  0% {
    transform: translateY(-100%);
    height: 50%;
  }
  100% {
    transform: translateY(0);
    height: 100%;
  }
}

.game-mask {
  overflow: hidden;
  animation: game-mask-enter 0.5s linear forwards;
}
@keyframes game-mask-leave {
  0% {
    transform: translateY(0%);
    height: 100%;
    overflow: hidden;
  }
  100% {
    transform: translateY(-100%);
    height: 0%;
    overflow: hidden;
  }
}

.game-hidden {
  animation: game-mask-leave 0.5s linear forwards;
}
@keyframes fadeInFromLeft {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fadeInFromLeft {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  animation: fadeInFromLeft 1s ease-in-out;
  animation-fill-mode: forwards;
}
.animate-schoolHidden {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  animation: fadeInFromLeft 1s ease-in-out;
  animation-fill-mode: forwards;
}
.animate-videoHidden {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  animation: fadeInFromLeft 1s ease-in-out;
  animation-fill-mode: forwards;
}
.school-opacity {
  opacity: 0;
}
</style>
