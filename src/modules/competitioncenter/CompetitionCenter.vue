<template>
  <top-center-bottom>
    <template #header>
      <comm-header />
    </template>
    <template #content>
      <!-- banner板块 -->
      <div class="w-full h-[550px] relative">
        <!-- bannerVap -->
        <comcenter-vap />
        <div class="w-full h-full px-[260px] pt-[110px] absolute top-0 left-0">
          <div
            class="h-[50px] text-[36px] font-[400] text-[#fff] mb-[54px] flex items-center"
          >
            赛事官方指南
          </div>
          <div
            class="h-[32px] text-[24px] font-[400] text-[#fff] mb-[10px] flex items-center"
          >
            具体赛事申办指南
          </div>
          <div
            class="h-[24px] text-[16px] font-[400] text-[#328EFF] mb-[8px] flex items-center cursor-pointer"
          >
            资质申办指南
          </div>
          <div
            class="h-[24px] text-[16px] font-[400] text-[#328EFF] mb-[86px] flex items-center cursor-pointer"
          >
            赛事申办指南
          </div>
          <div class="flex">
            <!-- <div
            class="h-[46px] w-[96px] text-[18px] font-[400] text-[#262626] mr-[22px] bg-[#eff2f9] flex-center cursor-pointer hover:bg-[#d6d6d6]"
          >
            查看视频
          </div> -->
            <div
              class="h-[46px] w-[96px] text-[18px] font-[400] text-[#fff] bg-[#4b21f4] flex-center cursor-pointer hover:bg-[#350fcc]"
              @click="isLoginJump('')"
            >
              立刻申办
            </div>
          </div>
        </div>
      </div>
      <div class="w-full comcenter-content bg-[#f3f3f3] dynamic">
        <!-- 申办 -->
        <div class="pt-[62px] px-[260px]">
          <div class="w-full mb-[34px]">
            <div
              class="h-[34px] text-[26px] text-[#262626] font-[400] flex items-center fade-in-bid"
            >
              申办全流程
            </div>
          </div>
          <!-- 内容 -->
          <div class="h-[228px] w-full flex">
            <div class="h-full w-[570px] mr-[118px]">
              <div
                class="h-[30px] w-[78px] mb-[26px] text-[18px] font-[700] text-[#262626] flex-center fade-in-certifiction"
              >
                资质认证
              </div>
              <div class="w-full ml-[58px]">
                <div class="w-full flex">
                  <div
                    v-for="(item, index) in bidLeft"
                    :key="index"
                    class="flex animate-width"
                  >
                    <div class="w-[102px] mr-[8px] flex flex-col items-center">
                      <div
                        class="w-[80px] h-[80px] text-[14px] font-[700] text-[#262626] mb-[12px] flex-center bg-[#fff] rounded-[50%]"
                      >
                        STEP {{ index + 1 }}
                      </div>
                    </div>
                    <div
                      v-if="index != bidLeft.length - 1"
                      class="w-[80px] h-[80px] flex-center"
                    >
                      <img v-lazyLoad="arrow" src="" alt="" />
                    </div>
                  </div>
                </div>
                <div class="w-full flex">
                  <div
                    v-for="(item, index) in bidLeft"
                    :key="index"
                    class="w-[110px] leading-[24px] text-[16px] font-[400] text-[#262626] mr-[80px] last:mr-0 pl-[18px] opacity-0 delayed-fade-in"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
            <div class="h-full w-[712px]">
              <div
                class="h-[30px] w-[78px] mb-[26px] text-[18px] font-[700] text-[#262626] flex-center fade-in-certifiction"
              >
                申办赛事
              </div>
              <div class="w-full ml-[58px">
                <div class="w-full flex">
                  <div
                    v-for="(item, index) in bidRight"
                    :key="index"
                    class="flex animate-width"
                  >
                    <div class="w-[102px] mr-[8px] flex flex-col items-center">
                      <div
                        class="w-[80px] h-[80px] text-[14px] font-[700] text-[#262626] mb-[12px] flex-center bg-[#fff] rounded-[50%]"
                      >
                        STEP {{ index + 1 }}
                      </div>
                    </div>
                    <div
                      v-if="index != bidRight.length - 1"
                      class="w-[80px] h-[80px] flex-center"
                    >
                      <img v-lazyLoad="arrow" src="" alt="" />
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div
                    v-for="(item, index) in bidRight"
                    :key="index"
                    class="w-[110px] leading-[24px] text-[16px] font-[400] text-[#262626] mr-[80px] last:mr-0 delayed-fade-in"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 赛事创办权益 -->
        <div class="pt-[62px] pb-[124px] px-[260px]">
          <div class="w-full mb-[92px] flex">
            <div
              class="h-[34px] w-[156px] text-[26px] text-[#262626] font-[400] flex items-center mr-[76px] founding-equity"
            >
              赛事创办权益
            </div>
            <div class="h-[34px] pt-[2px] flex items-center">
              <div
                v-for="(item, index) in headData"
                :key="index"
                class="w-[120px] h-[32px] flex flex-col items-center justify-between comcenter-content-checkhead"
              >
                <div
                  class="h-[28px] w-full text-center text-[24px] hover:text-[#4B21F4] flex-center title-text"
                  :class="
                    checkIndex === index
                      ? 'text-[#4B21F4] font-[700]'
                      : 'text-[#8c8c8c] font-[400]'
                  "
                  @click="changeCheckIndex(index)"
                >
                  {{ item }}
                </div>
                <div
                  class="h-[2px] bg-[#4f27fc]"
                  :class="checkIndex === index ? 'w-[56px]' : 'w-[0]'"
                ></div>
              </div>
            </div>
          </div>
          <!-- 内容 -->
          <div class="h-[280px] w-full flex items-center">
            <div
              class="w-[24px] h-[70px] flex-center rounded-tr-[10px] rounded-bl-[10px] arrowheadLeft"
              :class="
                !preFlag
                  ? 'bg-[#ababab] cursor-default'
                  : 'bg-[#4b21f4] cursor-pointer'
              "
              @click="nextteams('pre')"
            >
              <svg-icon class-name="leftarrow" color="#fff" />
            </div>
            <div class="w-[1190px] h-full overflow-hidden mx-[86px]">
              <div
                v-for="(item, index) in equityList"
                :key="index"
                class="h-full flex comcenter-content-scroll"
              >
                <div
                  v-for="(value, inx) in item"
                  :key="inx"
                  class="shrink-0 comcenter-content-carouselbox w-[216px] h-full mr-[20px] last:mr-0 pt-[48px] px-[20px] flex flex-col items-center relative"
                >
                  <img
                    v-lazyLoad="equity"
                    src=""
                    alt=""
                    class="absolute right-0 top-0 w-[76px]"
                    :fetchpriority="index === 0 ? 'high' : 'low'"
                  />
                  <div
                    class="w-[70px] h-[70px] mb-[10px] rounded-[50%] bg-[#fff] flex-center text-[42px]"
                  >
                    <svg-icon :class-name="value.iconName" color="#4F27FC" />
                  </div>
                  <div
                    class="text-[18px] font-[700] mb-[8px] text-[#262626] text-center leading-[27px]"
                  >
                    {{ value.title }}
                  </div>
                  <div
                    class="text-[14px] font-[400] text-[#bfbfbf] text-center leading-[20px]"
                  >
                    {{ value.enTitle }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-[24px] h-[70px] flex-center rounded-tr-[10px] rounded-bl-[10px] arrowheadRight"
              :class="
                !nextFlag
                  ? 'bg-[#ababab] cursor-default'
                  : 'bg-[#4b21f4] cursor-pointer'
              "
              @click="nextteams('next')"
            >
              <svg-icon
                class-name="leftarrow"
                color="#fff"
                class="rotate-180"
              />
            </div>
          </div>
        </div>
        <!-- 赛事产品权益 -->
        <div class="h-[366px] pt-[46px] px-[260px] bg-[#fff]">
          <div class="w-full mb-[80px]">
            <div
              class="h-[34px] text-[26px] text-[#262626] font-[400] flex items-center"
            >
              赛事产品权益
            </div>
          </div>
          <!-- 内容 -->
          <div class="h-[114px] w-full flex">
            <div
              v-for="(item, index) in productData"
              :key="index"
              class="comcenter-content-product h-full w-[344px] mr-[12px] pl-[48px]"
            >
              <div class="h-[36px] flex items-center mb-[12px]">
                <svg-icon
                  :class-name="item.iconName"
                  color="#262626"
                  class="text-[30px]"
                />
                <div class="text-[24px] text-[#262626] font-[700] ml-[10px]">
                  {{ item.title }}
                </div>
              </div>
              <div
                class="text-[18px] text-[#8c8c8c] font-[400] leading-[30px]"
                :class="index === 2 ? 'w-[230px]' : 'w-[246px]'"
              >
                {{ item.smallTitle }}
              </div>
            </div>
          </div>
        </div>
        <!-- 成功赛事盘点 -->
        <div class="pt-[62px] px-[260px]">
          <div class="w-full mb-[34px]">
            <div class="h-[34px] text-[26px] text-[#262626] flex items-center">
              成功赛事盘点
            </div>
          </div>
          <!-- 内容 -->
          <div class="h-[400px] w-full flex">
            <div class="h-full w-[924px] mr-[24px]">
              <div class="h-[384px] w-full relative">
                <img
                  v-for="(item, index) in pointImgs"
                  :key="item"
                  v-lazyLoad="item"
                  src=""
                  alt=""
                  :fetchpriority="index === 0 ? 'high' : 'low'"
                  class="comcenter-content-changebanner h-[384px] absolute left-0 right-0"
                  :class="
                    pointIndex === index
                      ? 'opacity-1 visible'
                      : 'opacity-0 invisible'
                  "
                />
              </div>
              <div class="w-full h-[16px] flex">
                <div
                  v-for="(item, index) in 4"
                  :key="item"
                  class="w-[25%] h-full cursor-pointer"
                  :class="pointIndex === index ? 'bg-[#4F27FC]' : 'bg-[#fff]'"
                  @mouseover="e => changePointbanner(e, index)"
                ></div>
              </div>
            </div>
            <div class="h-full w-[450px]">
              <div
                v-for="(item, index) in pointData"
                :key="index"
                class="w-full h-[100px] pl-[12px] cursor-pointer flex items-center"
                :class="pointIndex === index ? 'bg-[#4F27FC]' : 'bg-[#fff]'"
                @mouseover="e => changePointbanner(e, index)"
              >
                <div
                  class="comcenter-content-pointbox w-[60px] h-[22px] text-[16px] font-[400] mr-[18px] flex-center"
                  :class="
                    pointIndex === index
                      ? 'comcenter-content-checkpointbox text-[#fff]'
                      : 'text-[#4F27FC]'
                  "
                >
                  赛事
                </div>
                <div
                  class="leading-[32px] text-[20px] font-[400]"
                  :class="
                    pointIndex === index ? 'text-[#fff]' : 'text-[#262626]'
                  "
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 平台优势 -->
        <div
          class="comcenter-content-footer pt-[62px] pb-[138px] px-[260px] relative"
        >
          <div class="w-full mb-[34px]">
            <div class="h-[34px] text-[26px] text-[#262626] flex items-center">
              平台优势
            </div>
          </div>
          <!-- 内容 -->
          <div class="h-[400px] w-full flex">
            <div class="h-full w-[450px] mr-[24px]">
              <div
                v-for="(item, index) in advantagesData"
                :key="index"
                class="comcenter-content-advantagesbox group w-full h-[70px] pl-[22px] cursor-pointer flex items-center"
                @click="advantagesIndex = index"
              >
                <svg-icon
                  :class-name="item.iconName"
                  color=""
                  class="text-[20px] mr-[16px] text-[#262626] group-hover:text-[#7d60fd]"
                  :class="advantagesIndex === index ? 'text-[#4B21F4]' : ''"
                />
                <div
                  class="leading-[32px] text-[20px] font-[400] group-hover:text-[#7d60fd]"
                  :class="
                    advantagesIndex === index
                      ? 'text-[#4B21F4]'
                      : 'text-[#262626]'
                  "
                >
                  {{ item.title }}
                </div>
              </div>
              <div
                class="flex-center w-[128px] h-[40px] mt-[10px] text-[18px] text-[#fff] font-[400] cursor-pointer bg-[#4924EA] hover:bg-[#350fcc]"
                @click="isLoginJump('')"
              >
                立刻申办
              </div>
            </div>
            <div class="h-full w-[926px]">
              <div class="h-full w-full relative">
                <img
                  v-for="(item, index) in advantagesImgs"
                  :key="item"
                  v-lazyLoad="item"
                  src=""
                  alt=""
                  :fetchpriority="index === 0 ? 'high' : 'low'"
                  class="comcenter-content-changebanner h-full absolute left-0 right-0"
                  :class="
                    advantagesIndex === index
                      ? 'opacity-1 visible'
                      : 'opacity-0 invisible'
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <common-footer />
    </template>
  </top-center-bottom>
</template>

<script lang="ts" setup>
import ComcenterVap from './ComcenterVap.vue'
import arrow from '@/assets/images/comCenter/arrow.png'
import equity from '@/assets/images/comCenter/equity.png'
import point_banner from '@/assets/images/comCenter/point_banner.jpg'
import point_banner2 from '@/assets/images/comCenter/point_banner2.jpg'
import point_banner3 from '@/assets/images/comCenter/point_banner3.jpg'
import point_banner4 from '@/assets/images/comCenter/point_banner4.jpg'
import advantages_banner from '@/assets/images/comCenter/advantages_banner.jpg'
import advantages_banner2 from '@/assets/images/comCenter/advantages_banner2.jpg'
import advantages_banner3 from '@/assets/images/comCenter/advantages_banner3.jpg'
import advantages_banner4 from '@/assets/images/comCenter/advantages_banner4.jpg'
import advantages_banner5 from '@/assets/images/comCenter/advantages_banner5.jpg'
import { isLoginJump } from '@/utils/isLoginJump'
//资质认证
const bidLeft = ref<string[]>(['资质申报', '资质审核', '审核通过'])
//申办赛事
const bidRight = ref<string[]>([
  '赛事创办申请',
  '赛事资质审核',
  '赛事审核通过',
  '签署授权合同',
])
//创办权益头部标题
const headData = ref<string[]>(['玩家', '高校', '企业', '政府'])
//创办权益选中标题index
const checkIndex = ref<number>(0)
//创办权益所有数据
let allEquity: any = [
  [
    [
      {
        iconName: 'comcenter_equity1',
        title: '更热烈的赛事氛围',
        enTitle: 'A more enthusiastic race atmosphere',
      },
      {
        iconName: 'comcenter_equity2',
        title: '了解行业动态与前沿技术',
        enTitle: 'Understanding industry dynamics and cutting-edge technology',
      },
      {
        iconName: 'comcenter_equity3',
        title: '助力电竞行业破圈',
        enTitle: 'Helping the gaming industry break the circle',
      },
      {
        iconName: 'comcenter_equity4',
        title: '获得职业发展的机会',
        enTitle: 'Access to career development opportunities',
      },
      {
        iconName: 'comcenter_equity5',
        title: '福利奖励周边的设计支持',
        enTitle: 'Business co-operation and resource integration',
      },
      {
        iconName: 'comcenter_equity6',
        title: '拓宽社交圈子',
        enTitle: 'Widen your social circle',
      },
    ],
  ],
  [
    [
      {
        iconName: 'comcenter_equity7',
        title: '提升学生技能与就业竞争力',
        enTitle:
          "Enhancement of students' skills and competitiveness for employment",
      },
      {
        iconName: 'comcenter_equity8',
        title: '丰富校园文化生活',
        enTitle: 'Enriching campus cultural life',
      },
      {
        iconName: 'comcenter_equity9',
        title: '提升知名度与影响力',
        enTitle: 'Increase visibility and influence',
      },
      {
        iconName: 'comcenter_equity10',
        title: '促进学科交叉与融合',
        enTitle: 'Promoting cross-disciplinary integration',
      },
      {
        iconName: 'comcenter_equity11',
        title: '福利奖励周边的设计支持',
        enTitle: 'Business co-operation and resource integration',
      },
      {
        iconName: 'comcenter_equity12',
        title: '办赛产品权益福利',
        enTitle: 'Competition product benefits',
      },
    ],
  ],
  [
    [
      {
        iconName: 'comcenter_equity13',
        title: '品牌曝光与市场拓展',
        enTitle: 'Brand Exposure and Market Expansion',
      },
      {
        iconName: 'comcenter_equity14',
        title: '增强品牌形象与年轻化',
        enTitle: 'Enhanced brand image and rejuvenation',
      },
      {
        iconName: 'comcenter_equity15',
        title: '办赛产品权益福利',
        enTitle: 'Competition Product Benefits',
      },
      {
        iconName: 'comcenter_equity16',
        title: '商业合作与资源整合',
        enTitle: 'Business Co-operation and Resource Integration',
      },
    ],
  ],
  [
    [
      {
        iconName: 'comcenter_equity17',
        title: '推动地方电竞文化产业',
        enTitle: 'Promoting local gaming culture industry ',
      },
      {
        iconName: 'comcenter_equity18',
        title: '推动地方文娱产品',
        enTitle: 'Promotion of local recreational and cultural products ',
      },
      {
        iconName: 'comcenter_equity19',
        title: '办赛产品权益福利',
        enTitle: 'Competition Product Benefits',
      },
      {
        iconName: 'comcenter_equity20',
        title: '增强青年群体凝聚力',
        enTitle: 'Enhancing the cohesion of youth groups   ',
      },
    ],
  ],
]
//创办权益控制箭头是否可点击（上一页、下一页）
const preFlag = ref<boolean>(false)
const nextFlag = ref<boolean>(true)
//当前选中权益
const equityList = ref<any>([])
equityList.value = allEquity[checkIndex.value]
//产品权益数据
const productData = ref<any>([
  {
    iconName: 'comcenter_product1',
    title: '赛事管理',
    smallTitle: '为主办方提供赛事数据统计、分析和管理功能',
  },
  {
    iconName: 'comcenter_product2',
    title: '流量曝光',
    smallTitle: '利用平台资源和渠道优势，为赛事提供宣传、策划等服务',
  },
  {
    iconName: 'comcenter_product3',
    title: '定制化服务',
    smallTitle: '提供定制化的赛事服务解决方案',
  },
  {
    iconName: 'comcenter_product4',
    title: '技术支持',
    smallTitle: '为赛事提供必要的技术支持',
  },
])
//赛事盘点标题
const pointData = ref<string[]>([
  'CS的S级赛事圆满完成',
  '成都站CS2电竞赛事',
  '第一届CSGO灿天杯电竞赛',
  '“2024 高校电竞挑战赛”',
])
//赛事盘点播图
const pointImgs = ref<any>([
  point_banner,
  point_banner2,
  point_banner3,
  point_banner4,
])
//当前选中赛事
const pointIndex = ref<number>(0)
//平台优势标题
const advantagesData = ref<any>([
  {
    iconName: 'comcenter_advantages1',
    title: '丰富的赛事经验与规模优势',
  },
  {
    iconName: 'comcenter_advantages2',
    title: '庞大的用户基础与高度活跃性',
  },
  {
    iconName: 'comcenter_advantages3',
    title: '广泛的合作伙伴网络与资源整合能力',
  },
  {
    iconName: 'comcenter_advantages4',
    title: '品牌影响力与市场认可度',
  },
  {
    iconName: 'comcenter_advantages5',
    title: '持续创新与优化能力',
  },
])
//平台数据轮播图
const advantagesImgs = ref<any>([
  advantages_banner,
  advantages_banner2,
  advantages_banner3,
  advantages_banner4,
  advantages_banner5,
])
//当前选中优势
const advantagesIndex = ref<number>(0)
//切换权益选中标题
const changeCheckIndex = (index: number) => {
  nextteams('pre')
  nextFlag.value = index > 1 ? false : true
  let scrollBox = document.getElementsByClassName('comcenter-content-scroll')[0]
  scrollBox.classList.remove('comcenter-content-scroll_l')
  checkIndex.value = index
  equityList.value = allEquity[index]
}
//控制权益左右滑动
const nextteams = (value: string) => {
  let scrollBox = document.getElementsByClassName('comcenter-content-scroll')[0]
  if (
    (value === 'pre' &&
      scrollBox.className.indexOf('comcenter-content-scroll_l') > -1) ||
    (value === 'next' &&
      scrollBox.className.indexOf('comcenter-content-scroll_r') > -1) ||
    checkIndex.value > 1
  ) {
    return
  }
  if (value === 'next') {
    nextFlag.value = false
    preFlag.value = true
    scrollBox.classList.add('comcenter-content-scroll_r')
    scrollBox.classList.remove('comcenter-content-scroll_l')
  } else {
    nextFlag.value = true
    preFlag.value = false
    scrollBox.classList.add('comcenter-content-scroll_l')
    scrollBox.classList.remove('comcenter-content-scroll_r')
  }
}
//切换赛事盘点
const changePointbanner = (e: any, index: number) => {
  console.log(e)
  pointIndex.value = index
}
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.footer) {
  .common-footer {
    opacity: 1;
    bottom: 0;
  }
}
.comcenter-content {
  &-checkhead {
    cursor: pointer;
    border-right: 2px solid #8c8c8c;
    &:last-child {
      border: none;
    }
  }
  &-scroll {
    transition: ease-in-out 0.3s;
  }
  &-scroll_l {
    transform: translateX(0);
  }
  &-scroll_r {
    transform: translateX(-236px);
  }
  &-carouselbox {
    background: linear-gradient(135deg, #e7eafe 0%, #ffffff 100%), #ffffff;
  }
  &-product {
    cursor: pointer;
    border-right: 2px solid rgba(#8c8c8c, 0.2);

    &:last-child {
      border: none;
    }
  }
  &-pointbox {
    border: 1px solid #4f27fc;
  }
  &-checkpointbox {
    border: 1px solid #fff;
  }
  &-changebanner {
    transition: all linear 0.3s;
  }
  &-advantagesbox {
    border-bottom: 1px solid rgba(#b0b0b0, 0.48);
    &:nth-of-type(5) {
      border: none;
    }
  }
  &-footer {
    &:after {
      content: '';
      border: 30px solid transparent;
      border-top: 30px solid #f3f3f3;
      position: absolute;
      bottom: -54px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }
  }
}

.dynamic {
  @keyframes fadeInLeftBid {
    0% {
      opacity: 0;
      transform: translateX(-40px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .fade-in-bid {
    animation: fadeInLeftBid 333ms cubic-bezier(0.1, 0, 0.9, 1);
  }
  @keyframes fadeInLeftCertifiction {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .fade-in-certifiction {
    animation: fadeInLeftCertifiction 333ms ease-in-out;
  }

  .animate-width {
    width: 100%;
    animation: expandWidth 732ms cubic-bezier(0.02, 0, 0.98, 1);
  }

  @keyframes expandWidth {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
  @keyframes delayedFadeIn {
    0% {
      opacity: 0;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .delayed-fade-in {
    opacity: 1;
    animation: delayedFadeIn 800ms ease-in-out;
  }
}

// 赛事创办权益
@keyframes foundingEquity {
  0% {
    opacity: 0;
    transform: translateX(-68.5px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.founding-equity {
  animation: foundingEquity 333ms cubic-bezier(0.03, 0, 0.97, 1);
}

@keyframes arrowheadChangeLeft {
  0% {
    opacity: 0;
    transform: translateX(40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.arrowheadLeft {
  animation: arrowheadChangeLeft 333ms cubic-bezier(0.03, 0.17, 0.33, 0.99);
}

@keyframes arrowheadChangeRight {
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.arrowheadRight {
  animation: arrowheadChangeRight 333ms cubic-bezier(0.03, 0.17, 0.33, 0.99);
}

@keyframes titleText {
  0% {
    opacity: 0;
    transform: translateX(-25px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.title-text {
  animation: titleText 333ms cubic-bezier(0.03, 0.39, 0.42, 0.99);
}
</style>
