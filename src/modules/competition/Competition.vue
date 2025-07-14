<template>
  <top-center-bottom>
    <template #header>
      <!-- 顶部header -->
      <div
        class="competition-header h-[78px] pr-[24px] pl-[44px] flex bg-black text-white"
      >
        <div
          class="competition-header-logo inline-block w-[160px] h-[40px] mt-16 mr-[124px] bg-contain bg-no-repeat"
        ></div>
        <div class="competition-header-nav flex grow">
          <div
            class="competition-nav-item flex relative mr-[90px] pt-30 cursor-pointer"
            :class="{
              'competition-nav-item_active': navActive === 'competition',
            }"
            @click="handleActive('competition')"
          >
            <div class="h-24 flex justify-center items-center">
              <svg-icon
                class-name="comptition_nav_compti"
                :color="navActive === 'competition' ? '#9b83ff' : ''"
                class="bg-black mr-6 text-20"
              />
              <span
                class="comptition_nav_item_title text-16"
                :class="
                  navActive === 'competition' ? 'text-white' : 'text-a19eae'
                "
                >竞赛</span
              >
            </div>
            <div
              class="competition-nav-item_bar absolute left-1/2 bottom-0"
            ></div>
          </div>
          <div
            class="competition-nav-item flex relative mr-[90px] pt-30 cursor-pointer"
            :class="{ 'competition-nav-item_active': navActive === 'data' }"
            @click="handleActive('data')"
          >
            <div class="h-24 flex justify-center items-center">
              <svg-icon
                class-name="comptition_nav_data"
                :color="navActive === 'data' ? '#9b83ff' : ''"
                class="bg-black mr-6 text-20"
              />
              <span
                class="comptition_nav_item_title text-16"
                :class="navActive === 'data' ? 'text-white' : 'text-a19eae'"
                >数据</span
              >
            </div>
            <div
              class="competition-nav-item_bar absolute left-1/2 bottom-0"
            ></div>
          </div>
        </div>
        <div class="competition-userinfo flex justify-between items-center">
          <a v-if="!token" @click="login">注册/登录</a>
          <a v-else @click="outLogin">退出登录</a>
        </div>
      </div>
    </template>
    <template #content>
      <div class="competition-content pb-[84px] relative bg-f3f3f3">
        <!-- START 主图及视频特效 -->
        <competiton-vap />
        <!-- END 主图及视频特效 -->
        <!-- START 最新消息 -->
        <div class="competition-animate-container overflow-hidden">
          <div class="mb-[62px] px-[260px] relative bottom-[-200px] opacity-0">
            <div class="flex justify-between items-end mb-[36px]">
              <h6 class="text-333 text-30">最新消息</h6>
              <span
                class="flex items-center cursor-pointer text-7f7f7f text-16 hover:text-6f4eff"
                >查看更多
                <svg-icon class-name="angle_right" class="ml-[8px] text-16"
              /></span>
            </div>
            <div class="competition-news-images flex justify-between items-end">
              <div
                class="competition-news-images_item cursor-pointer bg-white overflow-hidden"
              >
                <img v-lazyLoad="news_one" src="" class="mb-18" alt="" />
                <p class="px-24 text-16 text-333">
                  以剑之名共竞巅峰 2024国风赛落下帷幕
                </p>
              </div>
              <div class="competition-news-images_item cursor-pointer bg-white">
                <img v-lazyLoad="news_two" src="" class="mb-18" alt="" />
                <p class="px-24 text-16 text-333">
                  冬季Major落地上海！CS至高荣誉花落谁家
                </p>
              </div>
              <div class="competition-news-images_item cursor-pointer bg-white">
                <img v-lazyLoad="news_three" src="" class="mb-18" alt="" />
                <p class="px-24 text-16 text-333">
                  亚运冠军助阵洋浦运动高校联赛
                </p>
              </div>
              <div class="competition-news-images_item cursor-pointer bg-white">
                <img v-lazyLoad="news_four" src="" class="mb-18" alt="" />
                <p class="px-24 text-16 text-333">2024KPL夏季赛揭幕战</p>
              </div>
            </div>
          </div>
        </div>
        <!-- END 最新消息 -->
        <div class="competition-animate-container overflow-hidden">
          <div class="competition-live flex justify-between">
            <img
              v-lazyLoad="live_bg"
              class="competition-live-image mr-[26px] object-cover"
              src=""
              alt=""
            />
            <div class="competition-live-list grow flex flex-col">
              <div class="live-list-title font-semibold text-24 text-444">
                2024校园杯精彩Top5
              </div>
              <div
                class="live-list-item flex justify-between items-center text-16 cursor-pointer text-333"
              >
                <div class="flex items-center">
                  <span class="live-tag mr-18 text-14 text-center">直播</span>
                  <span>2024校园杯精彩Top5</span>
                </div>
                <svg-icon class-name="angle_right" />
              </div>
              <div
                class="live-list-item list-second-item flex justify-between items-center text-16 cursor-pointer text-333"
              >
                <div class="flex items-center">
                  <span class="live-tag mr-18 text-14 text-center">直播</span>
                  <span>国风校园活动宣传片</span>
                </div>
                <svg-icon class-name="angle_right" />
              </div>
              <div
                class="live-list-item list-third-item flex justify-between items-center text-16 cursor-pointer text-333"
              >
                <div class="flex items-center">
                  <span class="live-tag mr-18 live-tag-blue text-14 text-center"
                    >直播</span
                  >
                  <span>BC小组赛火热直播</span>
                </div>
                <svg-icon class-name="angle_right" />
              </div>
              <div
                class="live-list-item list-fourth-item flex justify-between items-center text-16 cursor-pointer text-333"
              >
                <div class="flex items-center">
                  <span class="live-tag live-tag-blue mr-18 text-14 text-center"
                    >直播</span
                  >
                  <span>2024夏季赛MVP时刻</span>
                </div>
                <svg-icon class-name="angle_right" />
              </div>
              <div
                class="live-list-item list-fifth-item flex justify-between items-center text-16 cursor-pointer text-333"
              >
                <div class="flex items-center">
                  <span class="live-tag mr-18 text-14 text-center">直播</span>
                  <span>国风校园活动宣传片</span>
                </div>
                <svg-icon class-name="angle_right" />
              </div>
              <div
                class="live-list-item list-sixth-item flex justify-between items-center text-16 cursor-pointer text-333"
              >
                <div class="flex items-center">
                  <span class="live-tag live-tag-blue mr-18 text-14 text-center"
                    >直播</span
                  >
                  <span>BC小组赛火热直播</span>
                </div>
                <svg-icon class-name="angle_right" />
              </div>
              <div
                class="live-check-more grow flex justify-center items-center text-16 cursor-pointer"
              >
                <span class="hover:text-6f4eff">查看更多</span>
                <svg-icon class-name="triangle" class="text-22 text-737373" />
              </div>
            </div>
          </div>
        </div>
        <!-- 俱乐部信息展示 -->
        <div
          class="competition-animate-container overflow-hidden bg-f3f3f3 pt-[84px]"
        >
          <join-us />
        </div>
      </div>
    </template>
    <template #footer>
      <!-- 底部footer -->
      <div class="competition-animate-container overflow-hidden">
        <div class="competition-footer relative bg-white">
          <div class="mb-20 flex justify-center">
            <div
              class="competition-contact-item cursor-pointer text-14 text-808080 hover:text-333"
            >
              关于5EPlay
            </div>
            <div
              class="competition-contact-item cursor-pointer text-14 text-808080 hover:text-333"
            >
              联系我们
            </div>
            <div
              class="competition-contact-item cursor-pointer text-14 text-808080 hover:text-333"
            >
              商务合作
            </div>
            <div
              class="competition-contact-item cursor-pointer text-14 text-808080 hover:text-333"
            >
              服务条款
            </div>
            <div
              class="competition-contact-item cursor-pointer text-14 text-808080 hover:text-333"
            >
              个人信息保护政策
            </div>
            <div
              class="competition-contact-item cursor-pointer text-14 text-808080 hover:text-333"
            >
              个人信息保护指引
            </div>
            <div
              class="competition-contact-item cursor-pointer text-14 text-808080 hover:text-333"
            >
              加入我们
            </div>
          </div>
          <div class="mb-22 text-center text-14 text-808080">
            本平台适合年满17岁以上的用户使用:为了您的健康，请合理控制游戏时间
          </div>
          <div
            class="competition-footer-info mb-20 text-center text-14 text-808080"
          >
            <span class="px-13">@2011-2024 咸宁市志帆科技有限公司</span>
            <span class="px-13 cursor-pointer hover:text-333"
              >鄂ICP备2023019279号-3</span
            >
            <span class="px-13 cursor-pointer hover:text-333"
              >鄂公网安备42120202000498号</span
            >
            <span class="px-13 cursor-pointer hover:text-333">营业执照</span>
          </div>
          <div class="competition-footer-logo flex justify-center">
            <img
              v-lazyLoad="bg_footer"
              class="w-[140px] h-[36px]"
              src=""
              alt=""
            />
          </div>
        </div>
      </div>
      <login-modal
        :show-modal="loginShow"
        @close-modal="closeLogin"
      ></login-modal>
    </template>
  </top-center-bottom>
</template>

<script lang="ts" setup>
import JoinUs from './JoinUs.vue'
import gsap from 'gsap'
import CompetitonVap from './CompetitonVap.vue'
import news_one from '@/assets/images/competition/news_one.jpg'
import news_two from '@/assets/images/competition/news_two.jpg'
import news_three from '@/assets/images/competition/news_three.jpg'
import news_four from '@/assets/images/competition/news_four.jpg'
import live_bg from '@/assets/images/competition/live_bg.jpg'
import bg_footer from '@/assets/images/competition/bg_footer.png'
const loginShow = ref<boolean>(false)
const navActive = ref<string>('competition')
const token = ref<any>(localStorage.getItem('token'))
const intersectionInstance = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target.querySelector('div'), {
          opacity: 1,
          bottom: 0,
        })
        if (entry.target.querySelector('.competition-live-list')) {
          const timeLine = gsap.timeline()
          const liveListItem = entry.target.querySelectorAll('.live-list-item')
          liveListItem.forEach((listItem, index) => {
            if (index > 0) {
              timeLine.to(listItem, {
                opacity: 1,
                bottom: 0,
                duration: index * 0.03,
              })
            }
          })
        }
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

const imageIntersectionInstance = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const imageSrc = entry.target.getAttribute('data-src')
        if (imageSrc) {
          entry.target.setAttribute('src', imageSrc)
        }
      }
    })
  },
)

const handleActive = (navName: string) => {
  navActive.value = navName
}

const login = () => {
  loginShow.value = true
}
const outLogin = () => {
  localStorage.removeItem('token')
  token.value = ''
}
const closeLogin = (value: string) => {
  loginShow.value = false
  if (value === 'success') {
    token.value = localStorage.getItem('token')
  }
}
onMounted(() => {
  const nodeList = document.querySelectorAll('.competition-animate-container')
  nodeList.forEach(item => {
    intersectionInstance.observe(item)
  })
  const imageList = document.querySelectorAll('img[data-src]')
  imageList.forEach(item => {
    imageIntersectionInstance.observe(item)
  })
})
</script>

<style lang="scss" scoped>
.competition-header {
  .competition-header-logo {
    background-image: url('../../assets/images/competition/header_logo.png');
  }
  .competition-header-nav {
    .competition-nav-item {
      .svg-icon {
        color: #a19eae;
      }
      &:hover {
        color: #fff;
        .comptition_nav_item_title {
          color: #fff;
        }
        .svg-icon {
          color: #fff;
        }
      }
    }
    .competition-nav-item_active {
      .competition-nav-item_bar {
        width: 24px;
        margin-left: -12px;
      }
    }
  }
}
.competition-userinfo {
  cursor: pointer;
  margin-right: 0.52083vw;
  transition: 0.3s;
  font-weight: 700;
  font-size: 14px;

  &:hover {
    color: #9b84ff;
  }
}
.competition-nav-item_bar {
  width: 0;
  height: 4px;
  background: #9b84ff;
}
.competition-userinfo-name {
  color: #aeacb7;
}
.competition-userinfo-btn {
  width: 130px;
  height: 40px;
  padding: 10px 24px;
  background-color: #4f27fc;
  border-radius: 20px;
}
.competition-content {
  &::after {
    content: '';
    border: 30px solid transparent;
    border-top: 30px solid #f3f3f3;
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
}
.competition-news-images_item {
  width: 332px;
  height: 280px;
  border-radius: 8px 8px 0 0;
  transition: 0.3s linear;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.07);
  }
}

.competition-live {
  padding: 0 260px;
  position: relative;
  bottom: -200px;
  opacity: 0;
}

.competition-live-image {
  width: 808px;
  height: 452px;
  border-radius: 8px;
}

.competition-live-list {
  height: 452px;

  .live-list-title {
    color: #444;
    line-height: 70px;
    border-top: 1px solid rgba(219, 219, 219, 0.48);
  }

  .live-list-item {
    height: 54px;
    border-top: 1px solid rgba(219, 219, 219, 0.48);

    .live-tag {
      width: 42px;
      color: #f38417;
      line-height: 22px;
      border: 1px solid #f38417;
      border-radius: 2px;
    }

    .live-tag.live-tag-blue {
      color: #178dd1;
      border-color: #178dd1;
    }

    .svg-icon {
      color: #adadad;
      width: 13px;
      height: 13px;
    }

    &:hover {
      div,
      .svg-icon {
        color: #7251ff;
      }
    }
  }

  .list-second-item {
    position: relative;
    bottom: -10px;
    transition: 0.3s linear;
  }

  .list-third-item {
    position: relative;
    bottom: -20px;
    transition: 0.3s linear;
  }

  .list-fourth-item {
    position: relative;
    bottom: -30px;
    transition: 0.3s linear;
  }

  .list-fifth-item {
    position: relative;
    bottom: -40px;
    transition: 0.3s linear;
  }

  .list-sixth-item {
    position: relative;
    bottom: -50px;
    transition: 0.3s linear;
  }
}

.live-check-more {
  position: relative;
  z-index: 1;
  background-color: #eaeaea;
  color: #737373;

  .svg-icon {
    transition: 0.2s linear;
  }

  &:hover {
    span {
      color: #6f4eff;
    }

    .svg-icon {
      color: #6f4eff;
      transform: translateX(8px);
    }
  }
}

.competition-footer {
  padding: 64px 0 32px 0;
  position: relative;
  bottom: -200px;
  opacity: 0;
}

.competition-contact-item {
  padding: 0 30px;
  line-height: 20px;
  border-right: 1px solid #f0f0f0;

  &:last-child {
    border: none;
  }
}
</style>
