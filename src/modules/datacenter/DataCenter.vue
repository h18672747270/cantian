<template>
  <div>
    <top-center-bottom>
      <template #header>
        <comm-header />
      </template>
      <template #content>
        <div
          class="datacenter-header h-[700px] w-full relative bg-no-repeat bg-cover bg-[url('@/assets/images/dataCenter/datacenter_bannerbg.jpg')]"
        >
          <div
            class="w-[1400px] h-[584px] ml-[236px] pt-[80px] absolute left-0 top-0"
            :class="animateFlag ? 'opacity-1 visible' : 'opacity-0 invisible'"
          >
            <banner-vap @animate-loaded="animateFlag = false" />
          </div>
          <div
            class="h-full w-full datacenter-show absolute left-0 top-0"
            :class="!animateFlag ? 'opacity-1 visible' : 'opacity-0 invisible'"
          >
            <!-- 地图ecahrt -->
            <map-echart />
            <div class="h-full absolute left-[260px] top-0 pl-[74px] pt-[56px]">
              <div class="text-[38px] text-[#fff] font-[700] mb-[78px]">
                全省办赛情况
              </div>
              <div
                class="w-[264px] h-[70px] mb-[68px] flex items-center bg-no-repeat bg-cover bg-[url('@/assets/images/dataCenter/datacenter_toptitlebg.png')]"
              >
                <div
                  class="w-[90px] text-[18px] text-[#b6a2ff] font-[400] ml-[20px] mr-[32px]"
                >
                  办事场数
                </div>
                <div
                  class="datacenter-textshow text-[28px] text-[#fff] font-[700] italic"
                >
                  8656
                </div>
                <div
                  class="datacenter-textshow h-full text-[16px] text-[#fff] font-[700] italic ml-[10px] pt-[26px]"
                >
                  场
                </div>
              </div>
              <div
                class="w-[264px] h-[70px] mb-[68px] flex items-center bg-no-repeat bg-cover bg-[url('@/assets/images/dataCenter/datacenter_toptitlebg.png')]"
              >
                <div
                  class="w-[90px] text-[18px] text-[#b6a2ff] font-[400] ml-[20px] mr-[32px]"
                >
                  参赛战队数
                </div>
                <div
                  class="datacenter-textshow text-[28px] text-[#fff] font-[700] italic"
                >
                  8656
                </div>
                <div
                  class="datacenter-textshow h-full text-[16px] text-[#fff] font-[700] italic ml-[10px] pt-[26px]"
                >
                  个
                </div>
              </div>
              <div
                class="w-[264px] h-[70px] mb-[68px] flex items-center bg-no-repeat bg-cover bg-[url('@/assets/images/dataCenter/datacenter_toptitlebg.png')]"
              >
                <div
                  class="w-[90px] text-[18px] text-[#b6a2ff] font-[400] ml-[20px] mr-[32px]"
                >
                  参与人数
                </div>
                <div
                  class="datacenter-textshow text-[28px] text-[#fff] font-[700] italic"
                >
                  8656
                </div>
                <div
                  class="datacenter-textshow h-full text-[16px] text-[#fff] font-[700] italic ml-[10px] pt-[26px]"
                >
                  人
                </div>
              </div>
            </div>
            <div
              class="datacenter-top-select absolute left-[1470px] top-[64px]"
            >
              <n-select
                v-model:value="palyValue"
                to=".datacenter-top-select"
                class="datacenter-select w-[112px] h-[36px] mr-[10px]"
                :options="palyOptions"
              />
            </div>
          </div>
        </div>
        <div class="datacenter-content w-full h-[2096px] bg-[#0f0f19] relative">
          <!-- 赛事数据 -->
          <div class="w-full px-[260px] pt-[62px] absolute left-0 top-0">
            <div
              class="leading-[36px] text-[26px] text-[#fff] font-[400] mb-[34px]"
            >
              赛事数据
            </div>
            <div class="w-full h-[1622px] bg-[#171720]">
              <!-- 头部 -->
              <div
                class="w-full h-[60px] pl-[54px] flex items-center bg-[#20202A] relative"
              >
                <div
                  v-for="(item, index) in titleData"
                  :key="index"
                  class="mr-[66px] cursor-pointer hover:text-[#fff]"
                  :class="
                    checkIndex === index
                      ? 'text-[16px] text-[#fff] font-[700]'
                      : 'text-[14px] text-[#919191] font-[400]'
                  "
                  @click="checkIndex = index"
                >
                  {{ item }}
                </div>
                <div
                  class="datacenter-content-movebox w-[38px] h-[3px] absolute bottom-[0] bg-[#AA93FF]"
                  :class="
                    checkIndex === 0
                      ? 'left-[68px]'
                      : checkIndex === 1
                      ? 'left-[180px]'
                      : 'left-[289px]'
                  "
                ></div>
              </div>
              <!-- 搜索区域 -->
              <div
                class="datacenter-content-select w-full h-[70px] flex items-center justify-end"
              >
                <n-select
                  v-model:value="organizerValue"
                  to=".datacenter-content-select"
                  class="datacenter-select w-[144px] h-[36px] mr-[10px]"
                  :options="organizerOptions"
                />
                <n-select
                  v-model:value="yearValue"
                  to=".datacenter-content-select"
                  class="datacenter-select w-[144px] h-[36px] mr-[10px]"
                  :options="yearOptions"
                />
                <n-input
                  class="datacenter-input mr-[18px]"
                  placeholder="输入赛事名称搜索"
                >
                  <template #suffix>
                    <svg-icon
                      class-name="datacenter_search"
                      class="text-[14px] cursor-pointer"
                      color="#fff"
                    />
                  </template>
                </n-input>
              </div>
              <!-- 切换实时与赛果 -->
              <div
                class="w-full h-[36px] relative flex items-center justify-center mt-[12px] mb-[22px]"
              >
                <div
                  class="absolute left-[16px] text-[18px] text-[#fff] font-[700]"
                >
                  进行中的赛事
                </div>
                <div
                  class="datacenter-content-numberbox h-full w-[214px] text-[14px] text-[#fff] font-[400] bg-[#171720] flex"
                >
                  <div
                    class="h-full w-[50%] text-center leading-[36px] cursor-pointer"
                    :class="checkNumber === 1 ? 'bg-[#3E3E45]' : ''"
                    @click="checkNumber = 1"
                  >
                    实时比分
                  </div>
                  <div
                    class="h-full w-[50%] text-center leading-[36px] cursor-pointer"
                    :class="checkNumber === 2 ? 'bg-[#3E3E45]' : ''"
                    @click="checkNumber = 2"
                  >
                    最新赛果
                  </div>
                </div>
              </div>
              <!-- 数据展示 -->
              <div
                v-show="checkNumber === 1"
                class="w-full h-[740px] px-[16px] mb-[12px] flex justify-between overflow-y-auto"
              >
                <div
                  v-for="(value, inx) in teamList"
                  :key="inx"
                  class="w-[668px]"
                >
                  <div
                    v-for="(item, index) in value"
                    :key="index"
                    class="relative w-full h-[128px] bg-[#1A1A23] cursor-pointer border-[1px] border-[#313134] mb-[14px] last:mb-0 flex hover:border-[#aa93ff]"
                  >
                    <div
                      class="absolute left-0 top-0 w-[76px] h-[20px] pl-[6px] bg-[#30303C] rounded-br-[10px] flex items-center"
                    >
                      <div
                        class="h-[8px] w-[8px] rotate-45"
                        :style="{ background: item.palycolor }"
                      ></div>
                      <div class="ml-[4px] text-[12px] text-[#fff] font-[400]">
                        {{ item.wherePaly }}
                      </div>
                    </div>
                    <div class="w-[260px]">
                      <div
                        class="w-full leading-[20px] mt-[28px] mb-[8px] text-[16px] text-[#fff] font-[700] text-center"
                      >
                        {{ item.name }}
                      </div>
                      <div
                        class="w-full leading-[18px] mb-[16px] text-[16px] text-[#fff] font-[400] text-center"
                      >
                        {{ item.time }}
                      </div>
                      <div
                        class="w-full h-[16px] text-[12px] text-[#0BF975] font-[400] text-center flex items-center justify-center"
                      >
                        <div class="datacenter-content-light"></div>
                        <div class="ml-[8px]">直播中</div>
                      </div>
                    </div>
                    <div
                      class="w-[1px] h-[86px] mt-[20px] mr-[50px] bg-[#262626]"
                    ></div>
                    <div
                      class="h-full w-[78px] pt-[20px] flex flex-col items-center"
                    >
                      <img
                        v-lazyLoad="item.team1Logo"
                        src=""
                        alt=""
                        class="w-[52px] h-[52px] mb-[4px]"
                      />
                      <div
                        class="leading-[14px] text-[12px] text-[#fff] font-[400] mb-[8px]"
                      >
                        {{ item.team1Title }}
                      </div>
                      <div
                        class="leading-[14px] text-[12px] text-[#8A8A8A] font-[400]"
                      >
                        {{ item.team1Name }}
                      </div>
                    </div>
                    <div
                      class="h-full w-[140px] pt-[20px] mx-[14px] flex flex-col items-center"
                    >
                      <div
                        class="leading-[16px] text-[14px] text-[#A4A4A4] font-[700] mb-[20px]"
                      >
                        {{ item.numName }}
                      </div>
                      <div
                        class="leading-[30px] text-[30px] text-[#fff] font-[700] mb-[14px]"
                      >
                        {{ item.team1Num }} : {{ item.team2Num }}
                      </div>
                      <div class="w-[88px] h-[4px] bg-[#1A6EA8] relative">
                        <div
                          class="bg-[#BB3A3C] h-[4px] absolute left-0 top-0"
                          :style="{
                            width: `${
                              (item.team1Num /
                                (item.team1Num + item.team2Num)) *
                              100
                            }%`,
                          }"
                        ></div>
                      </div>
                    </div>
                    <div
                      class="h-full w-[78px] pt-[20px] flex flex-col items-center"
                    >
                      <img
                        v-lazyLoad="item.team2Logo"
                        src=""
                        alt=""
                        class="w-[52px] h-[52px] mb-[4px]"
                      />
                      <div
                        class="leading-[14px] text-[12px] text-[#fff] font-[400] mb-[8px]"
                      >
                        {{ item.team2Title }}
                      </div>
                      <div
                        class="leading-[14px] text-[12px] text-[#8A8A8A] font-[400]"
                      >
                        {{ item.team2Name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-show="checkNumber === 2"
                class="w-full h-[740px] px-[16px] mb-[56px] flex justify-between overflow-y-auto"
              >
                <div
                  v-for="(value, inx) in teamList"
                  :key="inx"
                  class="w-[668px]"
                >
                  <div
                    v-for="(item, index) in value"
                    :key="index"
                    class="relative w-full h-[172px] bg-[#1A1A23] cursor-pointer border-[1px] border-[#313134] mb-[14px] last:mb-0 flex hover:border-[#aa93ff]"
                  >
                    <div
                      class="absolute left-0 top-0 w-[76px] h-[20px] pl-[6px] bg-[#30303C] rounded-br-[10px] flex items-center"
                    >
                      <div
                        class="h-[8px] w-[8px] rotate-45"
                        :style="{ background: item.palycolor }"
                      ></div>
                      <div class="ml-[4px] text-[12px] text-[#fff] font-[400]">
                        {{ item.wherePaly }}
                      </div>
                    </div>
                    <div class="w-[260px]">
                      <div
                        class="w-full leading-[20px] mt-[28px] mb-[8px] text-[16px] text-[#fff] font-[700] text-center"
                      >
                        {{ item.name }}
                      </div>
                      <div
                        class="w-full leading-[18px] mb-[16px] text-[16px] text-[#fff] font-[400] text-center"
                      >
                        {{ item.time }}
                      </div>
                      <div
                        class="w-full h-[16px] text-[12px] text-[#0BF975] font-[400] text-center flex items-center justify-center"
                      >
                        <div class="datacenter-content-light"></div>
                        <div class="ml-[8px]">直播中</div>
                      </div>
                    </div>
                    <div
                      class="w-[1px] h-[86px] mt-[20px] mr-[50px] bg-[#262626]"
                    ></div>
                    <div
                      class="h-full w-[78px] pt-[20px] flex flex-col items-center"
                    >
                      <img
                        v-lazyLoad="item.team1Logo"
                        src=""
                        alt=""
                        class="w-[52px] h-[52px] mb-[4px]"
                      />
                      <div
                        class="leading-[14px] text-[12px] text-[#fff] font-[400] mb-[8px]"
                      >
                        {{ item.team1Title }}
                      </div>
                      <div
                        class="leading-[14px] text-[12px] text-[#8A8A8A] font-[400]"
                      >
                        {{ item.team1Name }}
                      </div>
                    </div>
                    <div
                      class="h-full w-[140px] pt-[20px] mx-[14px] flex flex-col items-center"
                    >
                      <div
                        class="leading-[16px] text-[14px] text-[#A4A4A4] font-[700] mb-[20px]"
                      >
                        {{ item.numName }}
                      </div>
                      <div
                        class="leading-[30px] text-[30px] text-[#fff] font-[700] mb-[14px]"
                      >
                        {{ item.team1Num }} : {{ item.team2Num }}
                      </div>
                      <div class="w-[88px] h-[4px] bg-[#1A6EA8] relative">
                        <div
                          class="bg-[#BB3A3C] h-[4px] absolute left-0 top-0"
                          :style="{
                            width: `${
                              (item.team1Num /
                                (item.team1Num + item.team2Num)) *
                              100
                            }%`,
                          }"
                        ></div>
                      </div>
                    </div>
                    <div
                      class="h-full w-[78px] pt-[20px] flex flex-col items-center"
                    >
                      <img
                        v-lazyLoad="item.team2Logo"
                        src=""
                        alt=""
                        class="w-[52px] h-[52px] mb-[4px]"
                      />
                      <div
                        class="leading-[14px] text-[12px] text-[#fff] font-[400] mb-[8px]"
                      >
                        {{ item.team2Title }}
                      </div>
                      <div
                        class="leading-[14px] text-[12px] text-[#8A8A8A] font-[400]"
                      >
                        {{ item.team2Name }}
                      </div>
                    </div>
                    <div
                      class="absolute left-[0px] bottom-[0px] w-full h-[44px] bg-[#36363e] flex"
                    >
                      <div
                        class="leading-[44px] w-[92px] text-center bg-[#262630] text-[12px] text-[#fff] font-[400]"
                      >
                        最新赛果
                      </div>
                      <div class="h-full w-[1px] bg-[#5D5D5D]"></div>
                      <div
                        v-for="item in 3"
                        :key="item"
                        class="h-full flex items-center"
                      >
                        <img
                          v-lazyLoad="team1"
                          src=""
                          alt=""
                          class="h-[32px] w-[32px] ml-[27px]"
                        />
                        <div
                          class="text-[16px] text-[#fff] font-[700] mx-[12px]"
                        >
                          3 : 1
                        </div>
                        <img
                          v-lazyLoad="team2"
                          src=""
                          alt=""
                          class="h-[32px] w-[32px] mr-[27px]"
                        />
                        <div
                          v-if="item != 3"
                          class="h-[16px] w-[1px] bg-[#5d5d5d]"
                        ></div>
                        <div
                          v-else
                          class="group text-[12px] text-[#8a8a8a] font-[400] cursor-pointer hover:text-[#aa93ff] flex items-center"
                        >
                          更多
                          <svg-icon
                            class-name="datacenter_more"
                            class="text-[16px] text-[#8a8a8a] group-hover:text-[#aa93ff]"
                            color=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full px-[16px]">
                <div
                  class="leading-[24px] left-[16px] text-[18px] text-[#fff] font-[700] mb-[32px]"
                >
                  已结束的赛事
                </div>
                <div class="w-full flex justify-between">
                  <div
                    v-for="(value, inx) in endList"
                    :key="inx"
                    class="w-[668px]"
                  >
                    <div
                      v-for="(item, index) in value"
                      :key="index"
                      class="relative w-full h-[128px] bg-[#1A1A23] cursor-pointer border-[1px] border-[#313134] mb-[14px] flex hover:border-[#aa93ff]"
                    >
                      <div
                        class="absolute left-0 top-0 w-[76px] h-[20px] pl-[6px] bg-[#30303C] rounded-br-[10px] flex items-center"
                      >
                        <div
                          class="h-[8px] w-[8px] rotate-45"
                          :style="{ background: item.palycolor }"
                        ></div>
                        <div
                          class="ml-[4px] text-[12px] text-[#fff] font-[400]"
                        >
                          {{ item.wherePaly }}
                        </div>
                      </div>
                      <div class="w-[260px]">
                        <div
                          class="w-full leading-[20px] mt-[28px] mb-[8px] text-[16px] text-[#fff] font-[700] text-center"
                        >
                          {{ item.name }}
                        </div>
                        <div
                          class="w-full leading-[18px] mb-[16px] text-[16px] text-[#fff] font-[400] text-center"
                        >
                          {{ item.time }}
                        </div>
                        <div
                          class="w-full h-[16px] text-[12px] text-[#585858] font-[400] text-center flex items-center justify-center"
                        >
                          <div class="datacenter-content-end"></div>
                          <div class="ml-[8px]">已结束</div>
                        </div>
                      </div>
                      <div
                        class="w-[1px] h-[86px] mt-[20px] mr-[50px] bg-[#262626]"
                      ></div>
                      <div
                        class="h-full w-[78px] pt-[30px] flex flex-col items-center relative"
                      >
                        <img
                          v-lazyLoad="oneth"
                          src=""
                          alt=""
                          class="w-[52px] h-[70px] absolute top-[11px]"
                        />
                        <img
                          v-lazyLoad="item.team1Logo"
                          src=""
                          alt=""
                          class="w-[50px] h-[50px] mb-[4px] z-[10]"
                        />
                        <div
                          class="leading-[14px] text-[12px] text-[#fff] font-[400] mb-[8px]"
                        >
                          {{ item.team1Title }}
                        </div>
                        <div
                          class="leading-[14px] text-[12px] text-[#8A8A8A] font-[400]"
                        >
                          {{ item.team1Name }}
                        </div>
                      </div>
                      <div
                        class="h-full w-[78px] pt-[30px] mx-[45px] flex flex-col items-center relative"
                      >
                        <img
                          v-lazyLoad="twoth"
                          src=""
                          alt=""
                          class="w-[52px] h-[70px] absolute top-[11px]"
                        />
                        <img
                          v-lazyLoad="item.team2Logo"
                          src=""
                          alt=""
                          class="w-[50px] h-[50px] mb-[4px] z-[10]"
                        />
                        <div
                          class="leading-[14px] text-[12px] text-[#fff] font-[400] mb-[8px]"
                        >
                          {{ item.team2Title }}
                        </div>
                        <div
                          class="leading-[14px] text-[12px] text-[#8A8A8A] font-[400]"
                        >
                          {{ item.team2Name }}
                        </div>
                      </div>
                      <div
                        class="h-full w-[78px] pt-[30px] flex flex-col items-center relative"
                      >
                        <img
                          v-lazyLoad="threeth"
                          src=""
                          alt=""
                          class="w-[52px] h-[70px] absolute top-[11px]"
                        />
                        <img
                          v-lazyLoad="item.team3Logo"
                          src=""
                          alt=""
                          class="w-[50px] h-[50px] mb-[4px] z-[10]"
                        />
                        <div
                          class="leading-[14px] text-[12px] text-[#fff] font-[400] mb-[8px]"
                        >
                          {{ item.team3Title }}
                        </div>
                        <div
                          class="leading-[14px] text-[12px] text-[#8A8A8A] font-[400]"
                        >
                          {{ item.team3Name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div class="w-full pt-[62px]">
              <div
                class="leading-[36px] text-[26px] text-[#fff] font-[400] mb-[34px]"
              >
                更多赛事信息
              </div>
              <div
                class="w-full h-[140px] bg-contain bg-no-repeat bg-[url('@/assets/images/dataCenter/datacenter_bottombg.jpg')]"
              ></div>
            </div>
          </div>
          <!-- 内容头部 -->
          <img v-lazyLoad="contentTop" src="" alt="" class="w-full h-[216px]" />
          <!-- 底纹 -->
          <div class="w-full h-[1880px] datacenter-content-footer">
            <content-vap />
          </div>
        </div>
      </template>
      <template #footer>
        <data-center-footer />
      </template>
    </top-center-bottom>
  </div>
</template>
<script lang="ts" setup>
import contentTop from '@/assets/images/dataCenter/datacenter_content_top.png'
import team1 from '@/assets/images/dataCenter/datacenter_team1.png'
import team2 from '@/assets/images/dataCenter/datacenter_team2.png'
import oneth from '@/assets/images/dataCenter/datacenter_oneth.png'
import twoth from '@/assets/images/dataCenter/datacenter_twoth.png'
import threeth from '@/assets/images/dataCenter/datacenter_threeth.png'
import MapEchart from './MapEchart.vue'
import ContentVap from './ContentVap.vue'
import DataCenterFooter from './DataCenterFooter.vue'
import BannerVap from './BannerVap.vue'
import { NSelect, NInput } from 'naive-ui'
// 控制mapVap
const animateFlag = ref<boolean>(true)
// 赛事数据标题
const titleData = ref<string[]>(['全部赛事', '进行中', '已结束'])
// 当前选中赛事
const checkIndex = ref<number>(0)
// 游戏下拉框
const palyOptions = ref<any[]>([
  {
    label: 'CS2',
    value: 1,
  },
  {
    label: 'Dota2',
    value: 2,
  },
  {
    label: 'LOL',
    value: 3,
  },
])
// 当前选中游戏
const palyValue = ref<any>(1)
// 举办方下拉框
const organizerOptions = ref<any[]>([
  {
    label: '所有举办方',
    value: 1,
  },
  {
    label: '官方举办',
    value: 2,
  },
  {
    label: '政府举办',
    value: 3,
  },
  {
    label: '高校举办',
    value: 4,
  },
  {
    label: '玩家举办',
    value: 5,
  },
  {
    label: '企业举办',
    value: 6,
  },
])
// 当前选中举办方
const organizerValue = ref<any>(1)
// 年份下拉框
const yearOptions = ref<any[]>([
  {
    label: '2024',
    value: 1,
  },
  {
    label: '所有年份',
    value: 2,
  },
])
// 当前选中年份
const yearValue = ref<any>(1)
// 选中实时或赛果
const checkNumber = ref<number>(1)
// 比赛中数据
const teamList = ref<any>([
  [
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '灿天杯高校CS2比赛',
      numName: '小组赛GroupA BO3',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '量子战队',
      team1Name: '武汉大学',
      team2Logo: team2,
      team2Title: '自然选择战队',
      team2Name: '华中科技大学',
      team1Num: 3,
      team2Num: 1,
    },
    {
      wherePaly: '高校举办',
      palycolor: '#1379F3',
      name: '武汉市CS2夏季赛',
      numName: '小组赛GroupA BO3',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '青铜时代战队',
      team1Name: '华中农业大学',
      team2Logo: team2,
      team2Title: '蓝色空间战队',
      team2Name: '中国地质大学',
      team1Num: 3,
      team2Num: 1,
    },
    {
      wherePaly: '玩家举办',
      palycolor: '#00C589',
      name: '襄阳市CS2秋季赛',
      numName: '小组赛GroupA BO3',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '终极规律战队',
      team1Name: '湖北美术学院',
      team2Logo: team2,
      team2Title: '水滴战队',
      team2Name: '武汉理工大学',
      team1Num: 3,
      team2Num: 1,
    },
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '枣阳市CS2夏季赛',
      numName: '小组赛GroupA BO3',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '青铜时代战队',
      team1Name: '华中农业大学',
      team2Logo: team2,
      team2Title: '蓝色空间战队',
      team2Name: '中国地质大学',
      team1Num: 3,
      team2Num: 1,
    },
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '襄阳市CS2高校比赛',
      numName: '小组赛GroupA BO3',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '青铜时代战队',
      team1Name: '华中农业大学',
      team2Logo: team2,
      team2Title: '蓝色空间战队',
      team2Name: '中国地质大学',
      team1Num: 3,
      team2Num: 1,
    },
  ],
  [
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '襄阳市CS2高校比赛',
      numName: '小组赛GroupA BO3',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '青铜时代战队',
      team1Name: '华中农业大学',
      team2Logo: team2,
      team2Title: '蓝色空间战队',
      team2Name: '中国地质大学',
      team1Num: 3,
      team2Num: 1,
    },
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '枣阳市CS2夏季赛',
      numName: '小组赛GroupA BO3',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '青铜时代战队',
      team1Name: '华中农业大学',
      team2Logo: team2,
      team2Title: '蓝色空间战队',
      team2Name: '中国地质大学',
      team1Num: 3,
      team2Num: 1,
    },
    {
      wherePaly: '政府举办',
      palycolor: '#EC2424',
      name: '襄阳市CS2秋季赛',
      numName: '小组赛GroupA BO3',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '终极规律战队',
      team1Name: '湖北美术学院',
      team2Logo: team2,
      team2Title: '水滴战队',
      team2Name: '武汉理工大学',
      team1Num: 3,
      team2Num: 1,
    },
    {
      wherePaly: '企业举办',
      palycolor: '#EC8224',
      name: '武汉市CS2夏季赛',
      numName: '小组赛GroupA BO3',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '量子战队',
      team1Name: '武汉大学',
      team2Logo: team2,
      team2Title: '自然选择战队',
      team2Name: '华中科技大学',
      team1Num: 3,
      team2Num: 1,
    },
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '灿天杯高校CS2比赛',
      numName: '小组赛GroupA BO3',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '量子战队',
      team1Name: '武汉大学',
      team2Logo: team2,
      team2Title: '自然选择战队',
      team2Name: '华中科技大学',
      team1Num: 3,
      team2Num: 1,
    },
  ],
])
// 已结束数据
const endList = ref<any>([
  [
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '灿天杯高校CS2比赛',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '量子战队',
      team1Name: '武汉大学',
      team2Logo: team1,
      team2Title: '自然选择战队',
      team2Name: '华中科技大学',
      team3Logo: team1,
      team3Title: '水滴战队',
      team3Name: '武汉理工大学',
    },
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '武汉市CS2夏季赛',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '终极规律战队',
      team1Name: '湖北美术学院',
      team2Logo: team1,
      team2Title: '蓝色空间战队',
      team2Name: '中国地质大学',
      team3Logo: team1,
      team3Title: '青铜时代战队',
      team3Name: '华中农业大学',
    },
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '襄阳市CS2秋季赛',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '量子战队',
      team1Name: '武汉大学',
      team2Logo: team1,
      team2Title: '自然选择战队',
      team2Name: '华中科技大学',
      team3Logo: team1,
      team3Title: '水滴战队',
      team3Name: '武汉理工大学',
    },
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '枣阳市CS2夏季赛',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '终极规律战队',
      team1Name: '湖北美术学院',
      team2Logo: team1,
      team2Title: '蓝色空间战队',
      team2Name: '中国地质大学',
      team3Logo: team1,
      team3Title: '青铜时代战队',
      team3Name: '华中农业大学',
    },
  ],
  [
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '襄阳市CS2高校比赛',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '终极规律战队',
      team1Name: '湖北美术学院',
      team2Logo: team1,
      team2Title: '蓝色空间战队',
      team2Name: '中国地质大学',
      team3Logo: team1,
      team3Title: '青铜时代战队',
      team3Name: '华中农业大学',
    },
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '襄阳市CS2秋季赛',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '量子战队',
      team1Name: '武汉大学',
      team2Logo: team1,
      team2Title: '自然选择战队',
      team2Name: '华中科技大学',
      team3Logo: team1,
      team3Title: '水滴战队',
      team3Name: '武汉理工大学',
    },
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '武汉市CS2夏季赛',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '终极规律战队',
      team1Name: '湖北美术学院',
      team2Logo: team1,
      team2Title: '蓝色空间战队',
      team2Name: '中国地质大学',
      team3Logo: team1,
      team3Title: '青铜时代战队',
      team3Name: '华中农业大学',
    },
    {
      wherePaly: '官方举办',
      palycolor: '#8969FF',
      name: '灿天杯高校CS2比赛',
      time: '07-17 02:30 - 07-17 05:30',
      team1Logo: team1,
      team1Title: '量子战队',
      team1Name: '武汉大学',
      team2Logo: team1,
      team2Title: '自然选择战队',
      team2Name: '华中科技大学',
      team3Logo: team1,
      team3Title: '水滴战队',
      team3Name: '武汉理工大学',
    },
  ],
])
</script>
<style lang="scss" scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.datacenter-show {
  transition: linear 1s;
}
.datacenter-textshow {
  text-shadow: 0px 0 9px #7a6bf0;
}
.datacenter-content-select,
.datacenter-top-select {
  :deep(.v-binder-follower-container) {
    .n-base-select-menu {
      --n-border-radius: 0 !important;
      --n-option-height: 34px !important;
      background-color: #2e2e37;
      .v-vl-items {
        padding: 0 !important;
      }
      .n-base-select-option {
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        &:before {
          width: 100% !important;
          left: 0;
        }
        .n-base-select-option__check {
          display: none;
        }
      }
      .n-base-select-option--pending::before {
        background-color: #383841 !important;
      }
      .n-base-select-option--selected {
        color: #aa93ff !important;
        &:before {
          width: 100%;
          height: 100%;
          background-color: #383841 !important;
        }
      }
    }
  }
}
:deep(.datacenter-select) {
  .n-base-selection {
    position: absolute;
    --n-color: #171720 !important;
    --n-color-active: #171720 !important;
    --n-height: 36px !important;
    --n-font-size: 14px !important;
    --n-text-color: #fff !important;
    --n-border-radius: 0 !important;
    --n-border: 1px solid #4a4a52 !important;
    --n-box-shadow-focus: none !important;
    --n-box-shadow-active: none !important;
    --n-border-hover: 1px solid #aa93ff !important;
    --n-border-focus: 1px solid #aa93ff !important;
    --n-border-active: 1px solid #aa93ff !important;
    --n-padding-single-left: 12px !important;
    .n-base-suffix {
      height: 14px;
      width: 14px;
      right: 10px;
      .n-base-clear {
        height: 14px;
        width: 14px;
      }
      .n-base-suffix__arrow {
        font-size: 16px;
        color: #4c4c53;
      }
    }
  }
}
.datacenter-input {
  width: 218px !important;
  background-color: #171720 !important;
  --n-height: 36px !important;
  --n-font-size: 14px !important;
  --n-text-color: #fff !important;
  --n-border-radius: 0 !important;
  --n-border: 1px solid #4a4a52 !important;
  --n-box-shadow-focus: none !important;
  --n-border-hover: 1px solid #aa93ff !important;
  --n-border-focus: 1px solid #aa93ff !important;
  --n-placeholder-color: #5f5f64 !important;
  --n-caret-color: #fff !important;
  --n-padding-left: 14px !important;
  --n-padding-right: 12px !important;
}
.datacenter-content {
  &-movebox {
    transition: 0.2s all;
  }

  &-select {
    border-bottom: 1px solid #20202a;
  }
  &-numberbox {
    cursor: pointer;
    border: 1px solid #3e3e45;
  }
  &-light {
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: #0bf975;
    box-shadow: 0 0 3px 3px rgba($color: #0bf975, $alpha: 0.5);
    animation: pulse 2s infinite;
  }
  &-end {
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: #585858;
  }
  &-footer {
    &:after {
      content: '';
      border: 30px solid transparent;
      border-top: 30px solid #0f0f19;
      position: absolute;
      bottom: -58px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }
  }
}
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  height: 78px;
  background-color: #3e3e45; /* 设置滑块颜色 */
}
::-webkit-scrollbar-track {
  background-color: #171720; /* 设置轨道颜色 */
}
::-webkit-scrollbar-thumb:hover {
  background-color: #8969ff; /* 鼠标悬浮时滚动条颜色 */
}
</style>
