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
      <div
        class="event-cneter-container px-[260px] pt-[90px] pb-[60px] relative bg-no-repeat"
      >
        <event-banner-vap
          class="w-full h-[648px] absolute top-0 left-1/2 -translate-x-1/2 -z-[0]"
        />
        <div class="relative inline-block mb-[104px]">
          <p class="w-[400px] text-pretty text-white font-bold text-[40px]">
            灿天杯第一届电竞赛事热烈举办中
          </p>
          <div
            class="w-[134px] h-[40px] absolute right-[6px] -bottom-[2px] bg-[#3e3948] leading-[40px] text-white text-[16] text-center cursor-pointer"
            @click="verifyLogin"
          >
            立即参与
          </div>
        </div>
        <div class="flex justify-start items-center relative z-[1] mb-[34px]">
          <div class="mr-[40px] leading-[36px] text-[26px] text-white">
            全部赛事
          </div>
          <div
            class="w-[88px] h-[28px] mr-[16px] flex justify-center items-center rounded-[14px] text-center leading-[1] text-[#9e9e9e] hover:text-white cursor-pointer"
            :class="{ 'bg-[#4b21f4] !text-white': eventTypeActive === 'CS2' }"
            @click="eventTypeChange('CS2')"
          >
            <span>CS2</span>
          </div>
          <div
            class="w-[88px] h-[28px] mr-[16px] flex justify-center items-center rounded-[14px] text-center leading-[1] text-[#9e9e9e] hover:text-white cursor-pointer"
            :class="{ 'bg-[#4b21f4] !text-white': eventTypeActive === 'DOTA' }"
            @click="eventTypeChange('DOTA')"
          >
            <span>DOTA</span>
          </div>
          <div
            class="w-[88px] h-[28px] flex justify-center items-center rounded-[14px] text-center leading-[1] text-[#9e9e9e] hover:text-white cursor-pointer"
            :class="{ 'bg-[#4b21f4] !text-white': eventTypeActive === 'LOL' }"
            @click="eventTypeChange('LOL')"
          >
            <span>LOL</span>
          </div>
        </div>
        <div
          class="flex justify-between relative z-[1] mb-[22px] p-[18px_20px_16px] bg-[#121219]"
        >
          <div class="flex p-[2px_0_4px]">
            <div class="flex justify-start items-center mr-[96px]">
              <div class="mr-[22px] text-white text-[14px]">举办方</div>
              <div
                class="mr-[14px] px-[14px] leading-[30px] text-[14px] text-[#878787] hover:text-white cursor-pointer"
                :class="{ 'bg-[#26262f] !text-white': hostTypeActive === 1 }"
                @click="hostTypeChange(1)"
              >
                全部
              </div>
              <div
                class="mr-[14px] px-[14px] leading-[30px] text-[14px] text-[#878787] hover:text-white cursor-pointer"
                :class="{ 'bg-[#26262f] !text-white': hostTypeActive === 2 }"
                @click="hostTypeChange(2)"
              >
                政府
              </div>
              <div
                class="mr-[14px] px-[14px] leading-[30px] text-[14px] text-[#878787] hover:text-white cursor-pointer"
                :class="{ 'bg-[#26262f] !text-white': hostTypeActive === 3 }"
                @click="hostTypeChange(3)"
              >
                企业
              </div>
              <div
                class="mr-[14px] px-[14px] leading-[30px] text-[14px] text-[#878787] hover:text-white cursor-pointer"
                :class="{ 'bg-[#26262f] !text-white': hostTypeActive === 4 }"
                @click="hostTypeChange(4)"
              >
                高校
              </div>
              <div
                class="px-[14px] text-[14px] leading-[30px] text-[#878787] hover:text-white cursor-pointer"
                :class="{ 'bg-[#26262f] !text-white': hostTypeActive === 5 }"
                @click="hostTypeChange(5)"
              >
                玩家
              </div>
            </div>
            <div class="flex justify-start items-center">
              <div class="mr-[22px] text-white text-[14px]">赛事规模</div>
              <div
                class="mr-[14px] px-[14px] leading-[30px] text-[14px] text-[#878787] hover:text-white cursor-pointer"
                :class="{ 'bg-[#26262f] !text-white': levelTypeActive === 1 }"
                @click="levelTypeChange(1)"
              >
                全部
              </div>
              <div
                class="mr-[14px] px-[14px] leading-[30px] text-[14px] text-[#878787] hover:text-white cursor-pointer"
                :class="{ 'bg-[#26262f] !text-white': levelTypeActive === 2 }"
                @click="levelTypeChange(2)"
              >
                S级赛事
              </div>
              <div
                class="mr-[14px] px-[14px] leading-[30px] text-[14px] text-[#878787] hover:text-white cursor-pointer"
                :class="{ 'bg-[#26262f] !text-white': levelTypeActive === 3 }"
                @click="levelTypeChange(3)"
              >
                A级赛事
              </div>
              <div
                class="mr-[14px] px-[14px] leading-[30px] text-[14px] text-[#878787] hover:text-white cursor-pointer"
                :class="{ 'bg-[#26262f] !text-white': levelTypeActive === 4 }"
                @click="levelTypeChange(4)"
              >
                B级赛事
              </div>
              <div
                class="px-[14px] text-[14px] leading-[30px] text-[#878787] hover:text-white cursor-pointer"
                :class="{ 'bg-[#26262f] !text-white': levelTypeActive === 5 }"
                @click="levelTypeChange(5)"
              >
                C级赛事
              </div>
            </div>
          </div>
          <n-input
            v-model:value="eventSearch"
            class="event-search !w-[218px] !bg-transparent !rounded-none !border-[#4a4a52]"
            placeholder="输入赛事名称搜索"
          >
            <template #suffix>
              <svg-icon
                class-name="search"
                color="#fff"
                class="cursor-pointer"
                @click="handleEventSearch"
              />
            </template>
          </n-input>
        </div>
        <div class="mb-[62px]">
          <div
            class="flex justify-start h-[62px] pl-[62px] relative bg-[#121219] text-[#919191] text-[14px]"
          >
            <div
              class="flex justify-center items-center w-[60px] mr-[66px] cursor-pointer hover:text-white"
              :class="{
                '!text-[16px] font-bold !text-white': eventStatusActive === 1,
              }"
              @click="eventStatusChange(1)"
            >
              报名中
            </div>
            <div
              class="flex justify-center items-center w-[60px] mr-[66px] cursor-pointer hover:text-white"
              :class="{
                '!text-[16px] font-bold !text-white': eventStatusActive === 2,
              }"
              @click="eventStatusChange(2)"
            >
              进行中
            </div>
            <div
              class="flex justify-center items-center w-[60px] cursor-pointer hover:text-white"
              :class="{
                '!text-[16px] font-bold !text-white': eventStatusActive === 3,
              }"
              @click="eventStatusChange(3)"
            >
              已结束
            </div>
            <div
              class="status-bar w-[60px] h-[3px] px-[10px] absolute left-0 bottom-0"
              :style="`left: ${
                ((62 + 126 * (eventStatusActive - 1)) / 1920) * 100
              }vw`"
            >
              <div class="w-full h-full bg-[#8969ff]"></div>
            </div>
          </div>
          <div
            class="flex justify-center p-[22px_0_26px] bg-white relative z-[1]"
          >
            <div
              class="event-list-container flex flex-wrap justify-start w-[1356px]"
            >
              <div
                v-for="(item, index) in eventFilterList"
                :key="item"
                class="w-[330px] mb-[24px] mr-[12px] shadow-[3px_0_10px_rgba(0,0,0,0.07)]"
              >
                <div
                  class="h-[186px] mb-[14px] relative overflow-hidden flex justify-center items-center"
                >
                  <div
                    class="flex justify-between items-center w-full h-[30px] absolute left-0 top-0 z-[2] bg-[#000000cc] bg-[rgba(0, 0, 0, 0.8)]"
                  >
                    <div class="flex items-center pl-[14px]">
                      <span
                        class="inline-block w-[10px] h-[10px] mr-[4px] bg-black rotate-45"
                        :style="{ 'background-color': item.hostColor }"
                      ></span>
                      <p class="text-white font-bold text-[14px]">
                        {{ `${item.host}举办` }}
                      </p>
                    </div>
                    <div class="flex items-center pr-[12px]">
                      <span class="text-[#c3c3c3] text-[12px]">赛事地点</span>
                      <span
                        class="w-[1px] h-[10px] mx-[6px] bg-[#838282]"
                      ></span>
                      <span class="mr-[4px] text-white font-bold text-[12px]">{{
                        item.location
                      }}</span>
                      <svg-icon
                        class="text-[12px]"
                        color="#fff"
                        class-name="index_location"
                      />
                    </div>
                  </div>
                  <img
                    v-lazyLoad="item.bg"
                    :src="default_image"
                    class="event-imgage w-full h-full object-cover cursor-pointer hover:w-[396px] hover:h-[224px]"
                    alt=""
                  />
                </div>
                <div class="px-[18px] pb-[18px]">
                  <div class="flex justify-between">
                    <div>
                      <p
                        class="mb-[16px] leading-[20px] text-[#333] text-[14px]"
                      >
                        {{ item.name }}
                      </p>
                      <div class="flex items-end mb-[24px]">
                        <p class="leading-[20px] text-[#8b8b8b] text-[14px]">
                          赛事奖金<span
                            class="ml-[8px] text-[#ef8f12] font-bold"
                            >￥</span
                          >
                        </p>
                        <p
                          class="leading-[24px] text-[#ef8f12] font-bold text-[16px]"
                        >
                          {{ item.bonus }}
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-col items-center">
                      <svg-icon
                        v-if="!item.state"
                        class-name="event_like"
                        class="text-[18px] text-black cursor-pointer hover:text-[#e32828]"
                        @click="handleCollectTeam(index)"
                      />
                      <svg-icon
                        v-else
                        class-name="event_like_active"
                        class="text-[18px] text-[#e32828] cursor-pointer"
                        @click="handleCollectTeam(index)"
                      />
                      <span>{{ item.like }}</span>
                    </div>
                  </div>
                  <div class="w-full h-[1px] mb-[10px] bg-[#efefef]"></div>
                  <p class="mb-[12px] leading-[20px] text-[12px] text-[#333]">
                    {{ item.date }}
                  </p>
                  <div class="flex justify-between">
                    <p class="leading-[16px] text-[12px]">
                      <span class="mr-[8px] text-[#8b8b8b]">报名数</span>
                      <span>{{ item.apply }}</span>
                    </p>
                    <p
                      class="leading-[16px] text-[12px] text-[#333]"
                      :class="{ '!text-[#e13737]': item.deadline <= 7 }"
                    >
                      报名还剩
                      <span class="mx-[4px]">
                        {{ item.deadline }}
                      </span>
                      天
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center pt-[14px] pb-[26px] bg-white">
            <n-pagination
              v-model:page="eventPaginationPage"
              :page-count="10"
              class="event-list-pagination"
            />
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center mb-[34px]">
            <p class="leading-[36px] text-[26px] text-[#232323]">推荐战队</p>
            <div class="flex items-center">
              <div
                class="recommend-refresh flex items-center mr-[30px] cursor-pointer text-[#232323] hover:text-[#4f27fc]"
              >
                <svg-icon
                  class="mr-[4px] text-[16px]"
                  class-name="loop_refresh"
                />
                <span>换一换</span>
              </div>
              <div
                class="flex items-center h-[36px] px-[20px] text-white border-[1px_solid_#5126ff] bg-[#4b21f4] cursor-pointer hover:bg-[#5126ff]"
              >
                <svg-icon class="text-[16px]" class-name="plus_sign" />
                <span class="text-[16px]" @click="verifyLogin">组建战队</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between mb-[64px]">
            <div
              v-for="(item, index) in recommendTeamListReactive"
              :key="item"
              class="recommend-team-item w-[264px] pb-[22px] bg-white shadow-[3px_0_10px_rgba(0,0,0,0.07)]"
            >
              <img
                v-lazyLoad="item.bg"
                :src="default_image"
                class="w-full h-[204px] mb-[20px] object-cover cursor-pointer"
                alt=""
              />
              <p
                class="pl-[24px] mb-[14px] leading-[24px] text-[#2d2d2d] font-bold text-[16px]"
              >
                {{ item.name }}
              </p>
              <p
                class="pl-[24px] mb-[44px] leading-[16px] text-[#777] text-[14px]"
              >
                <span>组建时间：</span>
                <span>{{ item.date }}</span>
              </p>
              <div class="flex justify-between pr-[18px]">
                <div class="flex items-center pl-[22px]">
                  <svg-icon
                    class="mr-[20px] text-[18px] text-black cursor-pointer"
                    class-name="event_share"
                    @click="verifyLogin"
                  />
                  <svg-icon
                    v-if="!item.collectState"
                    class="mr-[4px] text-[18px] text-black cursor-pointer hover:text-[#e32828]"
                    class-name="event_like"
                    @click="handleCollectRecommendTeam(index)"
                  />
                  <svg-icon
                    v-else
                    class="mr-[4px] text-[18px] text-[#e32828] cursor-pointer"
                    class-name="event_like_active"
                    @click="handleCollectRecommendTeam(index)"
                  />
                  <span class="text-[#161616] text-[12px]">{{
                    item.like
                  }}</span>
                </div>
                <div
                  class="recommend-join flex justify-center items-center w-[100px] h-[40px] cursor-pointer"
                  :class="{
                    applying: item.state === 2,
                    joined: item.state === 3,
                  }"
                >
                  <span
                    class="text-white text-[14px]"
                    @click="joinUs(item.state)"
                  >
                    {{
                      item.state === 1
                        ? '加入我们'
                        : item.state === 2
                        ? '申请中'
                        : '已加入'
                    }}
                  </span>
                </div>
              </div>
              <div class="recommend-item-mask bg-white">
                <div class="w-full h-[196px] mb-[24px] p-[6px_6px_0]">
                  <img
                    v-lazyLoad="item.bg"
                    :src="default_image"
                    class="w-full h-full mb-[20px] object-cover cursor-pointer"
                    alt=""
                  />
                </div>
                <div class="flex mb-[26px] pl-[20px]">
                  <img
                    v-lazyLoad="item.bg"
                    :src="default_image"
                    class="w-[50px] h-[50px] mr-[12px] object-cover rounded-full"
                    alt=""
                  />
                  <div class="pt-[2px]">
                    <p
                      class="mb-[10px] leading-[20px] text-[#2d2d2d] text-[16px]"
                    >
                      {{ item.name }}
                    </p>
                    <p class="flex items-center">
                      <svg-icon
                        class="mr-[4px] text-[14px] text-[#008843]"
                        class-name="event_school"
                      />
                      <span>{{ item.school }}</span>
                    </p>
                  </div>
                </div>
                <div
                  class="flex items-center mb-[16px] pl-[20px] text-[14px] text-[#7b7b7b]"
                >
                  <svg-icon class="mr-[4px]" class-name="event_clock" />
                  <span class="">组建时间：</span>
                  <span>{{ item.date }}</span>
                </div>
                <div
                  class="flex items-center mb-[6px] pl-[20px] text-[14px] text-[#777]"
                >
                  <svg-icon class="mr-[4px]" class-name="event_clock" />
                  <span class="">战队口号：</span>
                  <span>{{ item.slogan }}</span>
                </div>
                <div class="flex justify-between items-center mb-[36px]">
                  <div
                    class="flex items-center mb-[6px] pl-[20px] text-[14px] text-[#878787]"
                  >
                    <svg-icon class="mr-[4px]" class-name="event_user" />
                    <span>状态：</span>
                    <span class="text-[#2d2d2d]">{{ item.status }}</span>
                  </div>
                  <div class="flex">
                    <div class="flex">
                      <img
                        v-lazyLoad="item.bg"
                        :src="default_image"
                        class="w-[28px] h-[28px] object-cover rounded-full"
                        alt=""
                      />
                      <img
                        v-lazyLoad="item.bg"
                        :src="default_image"
                        class="w-[28px] h-[28px] -ml-[10px] relative z-[1] object-cover rounded-full"
                        alt=""
                      />
                      <img
                        v-lazyLoad="item.bg"
                        :src="default_image"
                        class="w-[28px] h-[28px] -ml-[12px] relative z-[2] object-cover rounded-full"
                        alt=""
                      />
                    </div>
                    <div class="flex items-center">
                      <span class="-mt-[4px] mx-[6px] text-[#878787]">...</span>
                      <svg-icon
                        class="mr-[4px] text-[28px] text-[#c7c7c7]"
                        class-name="event_add_user"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex justify-between pr-[18px]">
                  <div class="flex items-center pl-[22px]">
                    <svg-icon
                      class="mr-[20px] text-[18px] text-black cursor-pointer"
                      class-name="event_share"
                      @click="verifyLogin"
                    />
                    <svg-icon
                      v-if="!item.collectState"
                      class="mr-[4px] text-[18px] text-black cursor-pointer hover:text-[#e32828]"
                      class-name="event_like"
                      @click="handleCollectRecommendTeam(index)"
                    />
                    <svg-icon
                      v-else
                      class="mr-[4px] text-[18px] text-[#e32828] cursor-pointer"
                      class-name="event_like_active"
                      @click="handleCollectRecommendTeam(index)"
                    />
                    <span class="text-[#161616] text-[12px]">{{
                      item.like
                    }}</span>
                  </div>
                  <div
                    class="recommend-join flex justify-center items-center w-[100px] h-[40px] cursor-pointer"
                    :class="{
                      applying: item.state === 2,
                      joined: item.state === 3,
                    }"
                  >
                    <span
                      class="text-white text-[14px]"
                      @click="joinUs(item.state)"
                    >
                      {{
                        item.state === 1
                          ? '加入我们'
                          : item.state === 2
                          ? '申请中'
                          : '已加入'
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex mb-[56px]">
            <div class="flex flex-col w-[548px]">
              <div class="flex justify-between mb-[30px]">
                <p class="leading-[36px] text-[#232323] text-[26px]">
                  精彩资讯
                </p>
                <n-select
                  v-model:value="infoSelectValue"
                  :options="infoSelectOptions"
                  class="event-info-select w-[144px] h-[36px]"
                  style="--n-border-radius: 0"
                />
              </div>
              <div class="grow p-[16px_24px_24px] bg-white">
                <div
                  v-for="item in infoTitleList"
                  :key="item"
                  class="info-list-item flex justify-between p-[20px_4px_20px_24px] relative border-b border-solid border-[#e8e8e8] cursor-pointer"
                >
                  <p class="text-[#333]">
                    {{ item }}
                  </p>
                  <p class="text-[#8b8b8b]">7/6</p>
                </div>
                <div class="flex justify-end items-center pt-[36px]">
                  <svg-icon
                    class="mr-[4px] text-[18px] text-[#dbdbdb] cursor-pointer rotate-180"
                    class-name="event_page_right"
                  />
                  <span class="mx-[24px] text-[#333]">1/16</span>
                  <svg-icon
                    class="mr-[4px] text-[18px] text-[#4c4c53] cursor-pointer hover:text-[#5126ff]"
                    class-name="event_page_right"
                  />
                </div>
              </div>
            </div>
            <div class="w-[832px] pl-[20px]">
              <div class="flex justify-between mb-[30px]">
                <p class="leading-[36px] text-[#232323] text-[26px]">
                  赛事直达
                </p>
                <div class="flex items-center">
                  <n-select
                    v-model:value="infoVideoTypeValue"
                    :options="infoVideoTypeOptions"
                    class="event-video-select w-[160px] mr-[10px]"
                  />
                  <n-input
                    v-model:value="infoVideoSearchValue"
                    class="event-video-search !w-[218px] !bg-white"
                    placeholder="输入赛事名称搜索"
                  >
                    <template #suffix>
                      <svg-icon
                        class-name="search"
                        color="#878787"
                        class="cursor-pointer"
                      />
                    </template>
                  </n-input>
                </div>
              </div>
              <div
                class="w-full game-video-container flex justify-between flex-wrap"
              >
                <div
                  v-for="(item, index) in videoList"
                  :key="index"
                  class="game-video-item w-[264px] h-[224px]"
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
              <div class="flex justify-center pt-[30px]">
                <n-pagination
                  v-model:page="eventPaginationPage"
                  :page-count="5"
                  class="event-video-pagination"
                />
              </div>
            </div>
          </div>
        </div>
        <img
          v-lazyLoad="bg_footer"
          :src="default_image"
          class="w-[1400px] h-[140px] object-cover"
          alt=""
        />
      </div>
    </template>
    <template #footer>
      <common-footer />
    </template>
  </top-center-bottom>
</template>
<script lang="ts">
import EventBannerVap from './EventBannerVap.vue'
import WondefulVideo from '../index/WondefulVideo.vue'
import { NInput, NPagination, NSelect } from 'naive-ui'
export default {
  name: 'EventCenter',
  components: {
    EventBannerVap,
    NInput,
    NPagination,
    NSelect,
    WondefulVideo,
  },
}
</script>
<script lang="ts" setup>
import default_image from '@/assets/images/common/default.png'
import bg_footer from '@/assets/images/eventCenter/bg_footer.jpg'
import videobg1 from '@/assets/images/eventCenter/videobg1.jpg'
import videobg2 from '@/assets/images/eventCenter/videobg2.jpg'
import videobg3 from '@/assets/images/eventCenter/videobg3.jpg'
import videobg4 from '@/assets/images/eventCenter/videobg4.jpg'
import videobg5 from '@/assets/images/eventCenter/videobg5.jpg'
import videobg6 from '@/assets/images/eventCenter/videobg6.jpg'
import {
  eventList,
  recommendTeamList,
  infoSelectOptions,
  infoTitleList,
  infoVideoTypeOptions,
} from './eventData'
import { verifyLogin } from '@/utils/isLoginJump'

const eventTypeActive = ref<string>('CS2')
const hostTypeActive = ref<number>(1)
const levelTypeActive = ref<number>(1)
const eventStatusActive = ref<number>(1) // 赛事状态 1-报名中 2-进行中 3-已结束
const eventSearch = ref<string>('')
const eventFilterList = ref<any[]>(eventList)
const recommendTeamListReactive = ref<any[]>(recommendTeamList)
const eventPaginationPage = ref<number>(1)
const infoSelectValue = ref<number>(1)
const infoVideoTypeValue = ref<number>(1)
const infoVideoSearchValue = ref<string>('')
// @ts-ignore
// eslint-disable-next-line no-undef
const assetsPrefix = GLOBAL_VARIABLE.VITE_APP_ASSETS_BASE_URL
// video弹窗（显隐、标题、视频）
const videoModal = ref<boolean>(false)
const videoTitle = ref<string>('')
const videoPath = ref<string>('')

const videoList = ref<any[]>([
  {
    title: 'b1t无解双杀突破二楼',
    viewNumber: 4692,
    time: '2024-7-23',
    bg_video: videobg1,
    videoPath: assetsPrefix + 'web/video/event_video1.mp4',
  },
  {
    title: 'flameZ 1V2绝境翻盘',
    viewNumber: 3212,
    time: '2024-7-23',
    bg_video: videobg2,
    videoPath: assetsPrefix + 'web/video/event_video2.mp4',
  },
  {
    title: 'm0NESY-大狙近距离4杀',
    viewNumber: 4152,
    time: '2024-7-24',
    bg_video: videobg3,
    videoPath: assetsPrefix + 'web/video/event_video3.mp4',
  },
  {
    title: 'm0NESY快速1V3为G2锁定胜局',
    viewNumber: 3965,
    time: '2024-7-23',
    bg_video: videobg4,
    videoPath: assetsPrefix + 'web/video/event_video4.mp4',
  },
  {
    title: 'w0nderful 防守AK4杀',
    viewNumber: 3667,
    time: '2024-7-23',
    bg_video: videobg5,
    videoPath: assetsPrefix + 'web/video/event_video5.mp4',
  },
  {
    title: 'zont1x-usp爆头3杀',
    viewNumber: 5724,
    time: '2024-7-22',
    bg_video: videobg6,
    videoPath: assetsPrefix + 'web/video/event_video6.mp4',
  },
])
const eventTypeChange = (type: string) => {
  eventTypeActive.value = type
}

const hostTypeChange = (type: number) => {
  hostTypeActive.value = type
}

const levelTypeChange = (type: number) => {
  levelTypeActive.value = type
}

const eventStatusChange = (status: number) => {
  eventStatusActive.value = status
}

// const handleEventSearch = () => {
//   eventFilterList.value = eventList.filter((item: any) => {
//     if (item.name.indexOf(eventSearch.value) > -1) return true
//     return false
//   })
// }

const handleCollectTeam = (index: number) => {
  const token = localStorage.getItem('token')
  if (token) {
    eventFilterList.value[index].state = !eventFilterList.value[index].state
    if (eventFilterList.value[index].state) {
      eventFilterList.value[index].like++
    } else {
      eventFilterList.value[index].like--
    }
  } else {
    verifyLogin()
  }
}

const handleCollectRecommendTeam = (index: number) => {
  const token = localStorage.getItem('token')
  if (token) {
    recommendTeamListReactive.value[index].collectState =
      !recommendTeamListReactive.value[index].collectState
    if (recommendTeamListReactive.value[index].collectState) {
      recommendTeamListReactive.value[index].like++
    } else {
      recommendTeamListReactive.value[index].like--
    }
  } else {
    verifyLogin()
  }
}

const joinUs = (state: any) => {
  if (state === 1) {
    verifyLogin()
  }
}

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
</script>

<style lang="scss" scoped>
.event-cneter-container {
  background-color: #f2f2f2;
  .status-bar {
    transition: 0.3s ease-in-out;
  }
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
.event-list-container {
  > div:nth-child(4n) {
    margin-right: 0;
  }
}
.event-imgage {
  transition: 0.2s linear;
}
.recommend-refresh {
  &:hover {
    .svg-icon span {
      color: #4f27fc;
    }
  }
}
.recommend-team-item {
  position: relative;
  .recommend-item-mask {
    width: 264px;
    height: 384px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0;
    box-shadow: 3px 0px 7px rgba(0, 0, 0, 0.22);
  }
  &:hover {
    .recommend-item-mask {
      width: 354px;
      height: 476px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      z-index: 1;
      opacity: 1;
    }
  }
}
.recommend-join {
  background-color: #4b21f4;
  &:hover {
    background-color: #5930ff;
  }
}
.recommend-join.applying {
  background-color: #727182;
  color: #fff;
  &:hover {
    background-color: #727182;
  }
}
.recommend-join.joined {
  background-color: #e8e8e8;
  color: #fff;
  &:hover {
    background-color: #e8e8e8;
  }
}
.info-list-item {
  p:nth-child(1) {
    &::before {
      content: '';
      width: 6px;
      height: 6px;
      margin-left: 6px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      background-color: #c4c4c4;
    }
  }
  &:hover {
    p {
      color: #5126ff;
      &::before {
        background-color: #5126ff;
      }
    }
  }
}
:deep(.footer) {
  .common-footer {
    opacity: 1;
    bottom: 0;
  }
}
.game-video-container > div {
  &:nth-child(1) {
    margin-bottom: 20px;
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
</style>
