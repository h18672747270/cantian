<template>
  <div class="pagebox">
    <div class="banner">
      <div class="contentwarp">
        <div class="bannerul">
          <div class="bigbanner">
            <ul>
              <li
                v-for="(item, index) in bigbannerlist"
                :key="index"
                :style="{
                  background: `url('${item}')  no-repeat`,
                  backgroundSize: 'cover',
                }"
                :class="{ activeimg: activeBanner === index }"
              ></li>
            </ul>
          </div>
          <div class="bannertitle">
            <ul>
              <li
                v-for="(item, index) in bannertitlelist"
                :key="index"
                :class="{ activetitle: activeBanner === index }"
                @mouseover="e => changebanner(e, index)"
              >
                <div class="lefttitle">
                  <img v-lazyLoad="item.url" src="" />
                </div>
                <div class="righttitle">
                  <p>
                    {{ item.title1 }}
                  </p>
                  <p>
                    {{ item.title2 }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="titleimg"></div>
        <a class="newdown">
          <p>立即下载</p>
          <span>当前版本 7.1.43</span>
        </a>
        <a class="update"> +更新日志 </a>
      </div>
    </div>
    <div class="maincontent">
      <div class="schedule">
        <div
          class="changebtnl"
          :style="{
            backgroundColor: carouselIndex === 0 ? '#ababab' : '#347af0',
            cursor: carouselIndex === 0 ? 'default' : 'pointer',
          }"
          @click="nextteams('pre')"
        >
          <svg-icon class-name="leftarrow" color="#fff" />
        </div>
        <div
          class="changebtnr"
          :style="{
            backgroundColor:
              carouselIndex === schedulelist.length - 1 ? '#ababab' : '#347af0',
            cursor:
              carouselIndex === schedulelist.length - 1 ? 'default' : 'pointer',
          }"
          @click="nextteams('next')"
        >
          <svg-icon class-name="leftarrow" color="#fff" />
        </div>
        <n-carousel :current-index="carouselIndex" :show-dots="false">
          <div
            v-for="(item, index) in schedulelist"
            :key="index"
            class="schedulebox"
          >
            <div v-for="value in item" :key="value.id" class="schdules">
              <div
                class="schdules_head"
                :style="{
                  backgroundColor:
                    value.state === '进行中' ? '#8C39F1' : '#347AF0',
                }"
              >
                <div class="headstate">{{ value.state }}</div>
                <div class="headtime">{{ value.time }}</div>
              </div>
              <div class="schdules_body">
                <div class="teamlogo">
                  <img v-lazyLoad="value.team1logo" class="teams" src="" />
                  <div class="nums">
                    <p>{{ value.bonumber }}</p>
                    <div class="numsvs">
                      <div class="teamlnums">{{ value.team1number }}</div>
                      <div class="centernums">:</div>
                      <div class="teamrnums">{{ value.team2number }}</div>
                    </div>
                  </div>
                  <img v-lazyLoad="value.team2logo" class="teams" src="" />
                </div>
                <div class="nowstate">
                  <div
                    :style="{
                      background:
                        value.state === '进行中'
                          ? `url(${nowl}) no-repeat `
                          : `url(${waitl}) no-repeat `,
                      backgroundSize: 'cover',
                    }"
                  >
                    视频
                  </div>
                  <div
                    :style="{
                      background:
                        value.state === '进行中'
                          ? `url(${nowr}) no-repeat`
                          : `url(${waitr}) no-repeat `,
                      backgroundSize: 'cover',
                      color: value.state === '进行中' ? '#8C39F1' : '#347AF0',
                    }"
                  >
                    数据
                  </div>
                </div>
                <div class="bottomtitle">{{ value.content }}</div>
              </div>
            </div>
          </div>
        </n-carousel>
      </div>
      <div class="hotdot">
        <div class="hotlist">
          <div class="hotlist_head">
            <div
              v-for="(item, index) in newstablist"
              :key="index"
              class="newstabs"
              :class="{
                checktab: newtabindex === index,
                nobefore: newtabindex > 0 && index === newtabindex - 1,
              }"
              @click="
                () => {
                  newtabindex = index
                }
              "
            >
              {{ item }}
            </div>
          </div>
          <div
            v-for="(item, index) in newtitlelist"
            :key="index"
            class="hotlist_body"
            :class="{ hide: newtabindex !== index }"
          >
            <div v-for="(val, inx) in item" :key="inx" class="newsbox">
              <div class="firsttilte">
                {{ val[0].title }}
              </div>
              <div v-for="(vals, inxs) in val" :key="inxs" class="titlebox">
                <div v-if="inxs !== 0 && inxs < 7" class="othertitle">
                  <div class="titleleft">
                    <div class="titlepoint"></div>
                    <svg-icon v-if="vals.icon" :class-name="vals.icon" />
                    <div class="titleword">{{ vals.title }}</div>
                  </div>
                  <div class="titletime">06/17</div>
                </div>
              </div>
            </div>
          </div>
          <div class="hotlist_foot">点击查看更多</div>
        </div>
        <div class="hotimg">
          <div class="imgbox">
            <img
              v-for="(item, index) in hotimgList"
              :key="index"
              v-lazyLoad="item"
              src=""
              alt=""
              :class="{ activehotimg: hotimgIndex === index }"
              :fetchpriority="index === 0 ? 'high' : 'low'"
            />
          </div>
          <div class="changeimg">
            <div
              v-for="(item, index) in hotimgtitle"
              :key="index"
              class="hotimgtitle"
              :class="{
                hotactive: hotimgIndex === index,
                beforenone: hotimgIndex > 0 && index === hotimgIndex - 1,
              }"
              @mouseover="e => changehotImg(e, index)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="videobox">
        <div class="video_left">
          <div class="commtitle">
            <div class="titleleft">
              <div class="titleicon"></div>
              <div class="titleword">精彩视频</div>
            </div>
            <div class="titleright">更多></div>
          </div>
          <div class="somevideo">
            <div class="videos">
              <div
                v-for="(item, index) in videolist[0]"
                :key="index"
                class="speacevide"
              >
                <div class="imgbox">
                  <img v-lazyLoad="videoright" src="" alt="" class="rightimg" />
                  <img v-lazyLoad="item.url" src="" alt="" class="playimg" />
                </div>

                <div class="videotitle">
                  <div class="videoword">
                    {{ item.title }}
                  </div>
                  <div class="looknumber">
                    <svg-icon class-name="video" />{{ item.looknumber }}
                  </div>
                </div>
              </div>
            </div>
            <div class="videos">
              <div
                v-for="(item, index) in videolist[1]"
                :key="index"
                class="speacevide"
              >
                <div class="imgbox">
                  <img v-lazyLoad="videoright" src="" alt="" class="rightimg" />
                  <img v-lazyLoad="item.url" src="" alt="" class="playimg" />
                </div>

                <div class="videotitle">
                  <div class="videoword">
                    {{ item.title }}
                  </div>
                  <div class="looknumber">
                    <svg-icon class-name="video" />{{ item.looknumber }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="video_right">
          <div class="commtitle">
            <div class="titleleft">
              <div class="titleicon"></div>
              <div class="titleword">大神直播</div>
            </div>
            <div class="titleright">更多></div>
          </div>
          <div class="goodvideo" @mouseleave="e => reperIndex(e)">
            <div v-for="(item, index) in goodvideoList" :key="index">
              <div v-if="hoverIndex === index" class="bigonevideo">
                <div class="left">
                  <div class="top">
                    <div class="userbox">
                      <img v-lazyLoad="userimg" src="" alt="" />
                    </div>
                    <div class="userinfo">
                      <p>{{ item.name }}</p>
                      <i class="ms">{{ item.title }}</i>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="word">{{ item.lookNumber }}</div>
                    <div class="imgbox">
                      <img v-lazyLoad="videologo" src="" alt="" />
                    </div>
                  </div>
                </div>
                <img v-lazyLoad="userinfo" class="right" src="" />
              </div>
              <div
                v-else
                class="onevideo"
                @mouseover="e => changHoverIndex(e, index)"
              >
                <div class="left">
                  <div class="userbox">
                    <img v-lazyLoad="userimg" src="" alt="" />
                  </div>
                  <div class="userinfo">
                    <p>{{ item.name }}</p>
                    <i class="ms">{{ item.title }}</i>
                  </div>
                </div>
                <div class="right">
                  <div class="word">{{ item.lookNumber }}</div>
                  <div class="imgbox">
                    <img v-lazyLoad="videologo" src="" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fleftbox">
        <div class="commtitle">
          <div class="titleleft">
            <div class="titleicon"></div>
            <div class="titleword">赛事大数据</div>
          </div>
          <div class="titleright">
            <div
              v-for="(item, index) in playeydata"
              :key="index"
              class="changebox"
              :class="{ checkbox: checkplayIndex === index }"
              @click="checkplayIndex = index"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="fleftbody">
          <div
            v-for="(item, index) in playList"
            :key="index"
            class="playerinfobox"
          >
            <div class="player">
              <img v-lazyLoad="item.playimg" src="" alt="" class="playimg" />
              <img v-lazyLoad="item.playth" src="" alt="" class="playth" />
            </div>
            <div class="playinfo">
              <div class="playname">{{ item.playname }}</div>
              <div class="playzj">{{ item.playinfo }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="eventrelated">
        <div class="eventleft">
          <div class="commtitle">
            <div class="titleleft">
              <div class="titleicon"></div>
              <div class="titleword">赛事日历</div>
            </div>
            <div class="titleright">
              <div
                v-for="(item, index) in eventtabs"
                :key="index"
                class="changebox"
                :class="{ checkbox: checkEventIndex === index }"
                @click="checkEventIndex = index"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <div
            v-for="(item, index) in eventdatas"
            :key="index"
            class="eventteams"
            :style="{
              marginBottom: index === eventdatas.length - 1 ? '0' : '40px',
            }"
          >
            <div class="datebox">{{ item.date }}</div>
            <div v-for="(vals, inx) in item.boxs" :key="inx" class="onedayteam">
              <div
                class="onedaybox"
                :style="{
                  borderBottom:
                    inx === item.boxs.length - 1 ? 'none' : '2px solid #EBEBEB',
                }"
              >
                <div class="time">
                  <p class="realtime">{{ vals.times }}</p>
                  <p class="realstate">{{ vals.state }}</p>
                </div>
                <div class="where">
                  {{ vals.whereplay }}
                </div>
                <div class="teamnums">
                  <div class="team1">
                    <div class="teamname">{{ vals.team1name }}</div>
                    <img v-lazyLoad="vals.team1logo" src="" class="teamlogo" />
                  </div>
                  <div class="numbers">{{ vals.numbers }}</div>
                  <div class="team2">
                    <img v-lazyLoad="vals.team2logo" src="" class="teamlogo" />
                    <div class="teamname">{{ vals.team2name }}</div>
                  </div>
                </div>
                <div class="eventstate">
                  <div class="stateboxl">视频</div>
                  <div class="stateboxr">数据</div>
                </div>
              </div>
            </div>
          </div>
          <div class="lookmore">&gt;&gt;查看更多&lt;&lt;</div>
        </div>
        <div class="eventright">
          <div class="commtitle">
            <div class="titleleft">
              <div class="titleicon"></div>
              <div class="titleword">大赛预告</div>
            </div>
          </div>
          <div class="willcome">
            <div class="comehead">即将到来</div>
            <div class="comebody">
              <div
                v-for="(item, index) in comelist"
                :key="index"
                class="onecome"
              >
                <img v-lazyLoad="item.logo" src="" alt="" />
                <div class="comeinfo">
                  <div class="comename">
                    {{ item.comename }}
                  </div>
                  <div class="cometime">
                    {{ item.cometime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="gameover">
            <div class="comehead">已经结束</div>
            <div class="comebody">
              <div
                v-for="(item, index) in overlist"
                :key="index"
                class="onecome"
              >
                <img v-lazyLoad="item.logo" src="" alt="" />
                <div class="comeinfo">
                  <div class="comename">
                    {{ item.comename }}
                  </div>
                  <div class="cometime">
                    {{ item.cometime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ranking">
            <div class="commtitle">
              <div class="titleleft">
                <div class="titleicon"></div>
                <div class="titleword">战队排名</div>
              </div>
            </div>
            <div class="rankbody">
              <div class="posr">
                <a class="moreteam">更多></a>
                <i></i>
              </div>
              <div
                v-for="(item, index) in ranklist"
                :key="index"
                class="rankone"
              >
                <div class="num" :class="{ fortnum: index < 3 }">
                  {{ item.no }}
                </div>
                <div class="teams">
                  <a href="">
                    <div class="logos">
                      <img v-lazyLoad="item.url" src="" alt="" />
                    </div>
                    <span class="teamname"> {{ item.teamname }}</span>
                  </a>
                </div>
                <div class="inter">{{ item.number }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import videoright from '@/assets/images/csgoCab/videoright.png'
import userimg from '@/assets/images/csgoCab/userimg.jpg'
import videologo from '@/assets/images/csgoCab/videologo.png'
import userinfo from '@/assets/images/csgoCab/userinfo.png'

import nowl from '../../assets/images/csgoCab/nowl.png'
import nowr from '../../assets/images/csgoCab/nowr.png'
import waitl from '../../assets/images/csgoCab/waitl.png'
import waitr from '../../assets/images/csgoCab/waitr.png'

import banner1 from '../../assets/images/csgoCab/banner1.png'
import banner3 from '../../assets/images/csgoCab/banner3.png'
import banner2 from '../../assets/images/csgoCab/banner2.png'
import banner4 from '../../assets/images/csgoCab/banner4.png'

import l_banner1 from '../../assets/images/csgoCab/l_banner1.png'
import l_banner2 from '../../assets/images/csgoCab/l_banner2.png'
import l_banner3 from '../../assets/images/csgoCab/l_banner3.png'
import l_banner4 from '../../assets/images/csgoCab/l_banner4.png'

import team1 from '../../assets/images/csgoCab/team1.png'
import team2 from '../../assets/images/csgoCab/team2.png'
import team3 from '../../assets/images/csgoCab/team3.png'
import team4 from '../../assets/images/csgoCab/team4.png'
import team5 from '../../assets/images/csgoCab/team5.png'
import team6 from '../../assets/images/csgoCab/team6.png'
import team7 from '../../assets/images/csgoCab/team7.png'
import team8 from '../../assets/images/csgoCab/team8.png'

import hotimg from '../../assets/images/csgoCab/hotimg.png'
import hotimg1 from '../../assets/images/csgoCab/hotimg1.jpg'
import hotimg2 from '../../assets/images/csgoCab/hotimg2.jpg'
import hotimg3 from '../../assets/images/csgoCab/hotimg3.jpg'

import video1 from '../../assets/images/csgoCab/video1.png'
import video2 from '../../assets/images/csgoCab/video2.png'
import video3 from '../../assets/images/csgoCab/video3.png'
import video4 from '../../assets/images/csgoCab/video4.png'
import video5 from '../../assets/images/csgoCab/video5.png'
import video6 from '../../assets/images/csgoCab/video6.png'

import firstp from '../../assets/images/csgoCab/firstp.png'
import secondp from '../../assets/images/csgoCab/secondp.png'
import threep from '../../assets/images/csgoCab/threep.png'
import fourp from '../../assets/images/csgoCab/fourp.png'
import fivep from '../../assets/images/csgoCab/fivep.png'
import sixp from '../../assets/images/csgoCab/sixp.png'
import sevenp from '../../assets/images/csgoCab/sevenp.png'
import eightp from '../../assets/images/csgoCab/eightp.png'
import ninep from '../../assets/images/csgoCab/ninep.png'
import tenp from '../../assets/images/csgoCab/tenp.png'

import oneth from '../../assets/images/csgoCab/oneth.png'
import twoth from '../../assets/images/csgoCab/twoth.png'
import threeth from '../../assets/images/csgoCab/threeth.png'
import fourth from '../../assets/images/csgoCab/fourth.png'
import fiveth from '../../assets/images/csgoCab/fiveth.png'
import sixth from '../../assets/images/csgoCab/sixth.png'
import seventh from '../../assets/images/csgoCab/seventh.png'
import eight from '../../assets/images/csgoCab/eight.png'
import nineth from '../../assets/images/csgoCab/nineth.png'
import tenth from '../../assets/images/csgoCab/tenth.png'

import come1 from '../../assets/images/csgoCab/come1.png'
import come2 from '../../assets/images/csgoCab/come2.png'
import come3 from '../../assets/images/csgoCab/come3.png'
import over1 from '../../assets/images/csgoCab/over1.png'
import over2 from '../../assets/images/csgoCab/over3.png'
import over3 from '../../assets/images/csgoCab/over3.png'
import no1 from '../../assets/images/csgoCab/no1.png'
import no2 from '../../assets/images/csgoCab/no2.png'
import no3 from '../../assets/images/csgoCab/no3.png'
import no4 from '../../assets/images/csgoCab/no4.png'
import no5 from '../../assets/images/csgoCab/no5.png'
import no6 from '../../assets/images/csgoCab/no6.png'
import no7 from '../../assets/images/csgoCab/no7.png'
import no8 from '../../assets/images/csgoCab/no8.png'
import no9 from '../../assets/images/csgoCab/no9.png'
import no10 from '../../assets/images/csgoCab/no10.png'

import teamlogo1 from '../../assets/images/csgoCab/teamlogo1.png'
import teamlogo2 from '../../assets/images/csgoCab/teamlogo2.png'
import teamlogo3 from '../../assets/images/csgoCab/teamlogo3.png'
import teamlogo4 from '../../assets/images/csgoCab/teamlogo4.png'
import teamlogo5 from '../../assets/images/csgoCab/teamlogo5.png'
import teamlogo6 from '../../assets/images/csgoCab/teamlogo6.png'
import teamlogo7 from '../../assets/images/csgoCab/teamlogo7.png'
import teamlogo8 from '../../assets/images/csgoCab/teamlogo8.png'
import teamlogo9 from '../../assets/images/csgoCab/teamlogo9.png'
import teamlogo10 from '../../assets/images/csgoCab/teamlogo10.png'
import teamlogo11 from '../../assets/images/csgoCab/teamlogo11.png'
import teamlogo12 from '../../assets/images/csgoCab/teamlogo12.png'
import teamlogo13 from '../../assets/images/csgoCab/teamlogo13.png'
import teamlogo14 from '../../assets/images/csgoCab/teamlogo14.png'
import teamlogo15 from '../../assets/images/csgoCab/teamlogo15.png'
import teamlogo16 from '../../assets/images/csgoCab/teamlogo16.png'
import teamlogo17 from '../../assets/images/csgoCab/teamlogo17.png'
import teamlogo18 from '../../assets/images/csgoCab/teamlogo18.png'
import teamlogo19 from '../../assets/images/csgoCab/teamlogo19.png'
import teamlogo20 from '../../assets/images/csgoCab/teamlogo20.png'

import { NCarousel } from 'naive-ui'
interface TitleState {
  url: string
  title1: string
  title2: string
}
const bigbannerlist = ref<string[]>([banner1, banner2, banner3, banner4])
const bannertitlelist = ref<TitleState[]>([
  {
    url: l_banner1,
    title1: '5EPLAY APP',
    title2: '数据助力观赛',
  },
  {
    url: l_banner2,
    title1: '各大直播平台',
    title2: '知名主播常驻',
  },
  {
    url: l_banner3,
    title1: '国内声名鹊起',
    title2: '知名战队入驻',
  },
  {
    url: l_banner4,
    title1: '5E 优先排位',
    title2: '绿色品质竞技',
  },
])
const carouselIndex = ref<number>(0)
const activeBanner = ref<number>(0)
const schedulelist = ref<any>([
  [
    {
      id: 1,
      state: '进行中',
      time: '06月17日 16:00',
      team1logo: team1,
      team2logo: team2,
      bonumber: 'BO3',
      team1number: '1',
      team2number: '1',
      content: 'United21 联赛 第16赛季-淘汰赛',
    },
    {
      id: 2,
      state: '未开始',
      time: '06月18日 16:00',
      team1logo: team3,
      team2logo: team4,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'United21 联赛 第16赛季-淘汰赛',
    },
    {
      id: 3,
      state: '未开始',
      time: '6月19日 04:00',
      team1logo: team5,
      team2logo: team6,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'Dust2 Liga 第3赛季 巴西-淘汰赛',
    },
    {
      id: 4,
      state: '未开始',
      time: '6月19日 07:00',
      team1logo: team7,
      team2logo: team8,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'Dust2 Liga 第3赛季 巴西-淘汰赛',
    },
    {
      id: 5,
      state: '未开始',
      time: '6月20日 16:00',
      team1logo: team8,
      team2logo: team8,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'Dust2 Liga 第3赛季 巴西-淘汰赛',
    },
  ],
  [
    {
      id: 6,
      state: '进行中',
      time: '06月17日 16:00',
      team1logo: team1,
      team2logo: team2,
      bonumber: 'BO3',
      team1number: '1',
      team2number: '1',
      content: 'United21 联赛 第16赛季-淘汰赛',
    },
    {
      id: 7,
      state: '未开始',
      time: '06月18日 16:00',
      team1logo: team3,
      team2logo: team4,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'United21 联赛 第16赛季-淘汰赛',
    },
    {
      id: 8,
      state: '未开始',
      time: '6月19日 04:00',
      team1logo: team5,
      team2logo: team6,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'Dust2 Liga 第3赛季 巴西-淘汰赛',
    },
    {
      id: 9,
      state: '未开始',
      time: '6月19日 07:00',
      team1logo: team7,
      team2logo: team8,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'Dust2 Liga 第3赛季 巴西-淘汰赛',
    },
    {
      id: 10,
      state: '未开始',
      time: '6月20日 16:00',
      team1logo: team8,
      team2logo: team8,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'Dust2 Liga 第3赛季 巴西-淘汰赛',
    },
  ],
  [
    {
      id: 11,
      state: '进行中',
      time: '06月17日 16:00',
      team1logo: team1,
      team2logo: team2,
      bonumber: 'BO3',
      team1number: '1',
      team2number: '1',
      content: 'United21 联赛 第16赛季-淘汰赛',
    },
    {
      id: 12,
      state: '未开始',
      time: '06月18日 16:00',
      team1logo: team3,
      team2logo: team4,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'United21 联赛 第16赛季-淘汰赛',
    },
    {
      id: 13,
      state: '未开始',
      time: '6月19日 04:00',
      team1logo: team5,
      team2logo: team6,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'Dust2 Liga 第3赛季 巴西-淘汰赛',
    },
    {
      id: 14,
      state: '未开始',
      time: '6月19日 07:00',
      team1logo: team7,
      team2logo: team8,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'Dust2 Liga 第3赛季 巴西-淘汰赛',
    },
    {
      id: 15,
      state: '未开始',
      time: '6月20日 16:00',
      team1logo: team8,
      team2logo: team8,
      bonumber: 'BO3',
      team1number: '',
      team2number: '',
      content: 'Dust2 Liga 第3赛季 巴西-淘汰赛',
    },
  ],
])
const newstablist = ref<string[]>(['热点', '专栏', '社区'])
const newtitlelist = ref<any>([
  [
    [
      { title: '外媒:FURIA即将签下SKULLZ' },
      { title: '官宣:LIQUID正式下放CADIAN' },
      { title: 'NEXA谈被G2下放:渴望征战下个赛季，愿接..' },
      { title: '官宣:G2下放NEXA' },
      { title: '5EPLAY现场专访DONK:赢得冠军像是梦想...' },
    ],
    [
      { title: 'B1AD3采访:NAVI选手们都很努力...' },
      { title: '多名CS业内人士评价SPIRIT战队 MANIAC:' },
      { title: 'OVERDRIVE:现在是SH1RO职业生涯最快乐的..' },
      { title: 'ALEKSIB采访:我们又一次证明了自己的能力' },
      { title: '5EPLAY现场专访EIIGE:这个冠军证明我的...', icon: 'bluevideo' },
      { title: 'GABE FOLLOWER:CS1.6地图泳池日或将回归' },
      { title: 'HLTV出品:两颗烟雾弹助力NIP窥破天机' },
    ],
  ],
  [
    [
      { title: '外媒:FURIA即将签下SKULLZ' },
      { title: '官宣:LIQUID正式下放CADIAN' },
      { title: 'NEXA谈被G2下放:渴望征战下个赛季，愿接..' },
      { title: '官宣:G2下放NEXA' },
      { title: '5EPLAY现场专访DONK:赢得冠军像是梦想...' },
    ],
    [
      { title: 'B1AD3采访:NAVI选手们都很努力...' },
      { title: '多名CS业内人士评价SPIRIT战队 MANIAC:' },
      { title: 'OVERDRIVE:现在是SH1RO职业生涯最快乐的..' },
      { title: 'ALEKSIB采访:我们又一次证明了自己的能力' },
      { title: '5EPLAY现场专访EIIGE:这个冠军证明我的...' },
      { title: 'GABE FOLLOWER:CS1.6地图泳池日或将回归' },
      { title: 'HLTV出品:两颗烟雾弹助力NIP窥破天机' },
    ],
  ],
  [
    [
      { title: '外媒:FURIA即将签下SKULLZ' },
      { title: '官宣:LIQUID正式下放CADIAN' },
      { title: 'NEXA谈被G2下放:渴望征战下个赛季，愿接..' },
      { title: '官宣:G2下放NEXA' },
      { title: '5EPLAY现场专访DONK:赢得冠军像是梦想...' },
    ],
    [
      { title: 'B1AD3采访:NAVI选手们都很努力...' },
      { title: '多名CS业内人士评价SPIRIT战队 MANIAC:' },
      { title: 'OVERDRIVE:现在是SH1RO职业生涯最快乐的..' },
      { title: 'ALEKSIB采访:我们又一次证明了自己的能力' },
      { title: '5EPLAY现场专访EIIGE:这个冠军证明我的...' },
      { title: 'GABE FOLLOWER:CS1.6地图泳池日或将回归' },
      { title: 'HLTV出品:两颗烟雾弹助力NIP窥破天机' },
    ],
  ],
])
const newtabindex = ref<number>(0)
const hotimgList = ref<string[]>([hotimg, hotimg1, hotimg2, hotimg3])
const hotimgtitle = ref<string[]>([
  '全民联赛双buff狂欢周',
  '全民联赛第二周门票获取',
  '投票选图规则更新',
  '集钥匙拿宝箱抽万元大奖',
])
const hotimgIndex = ref<number>(0)
const videolist = ref<any>([
  [
    {
      url: video1,
      title: '5EPLAY现场专访GLA1VE：相信ENCE...',
      looknumber: '5640次观看',
    },
    {
      url: video2,
      title: '5EPLAY现场专访JABBI:现在团队...',
      looknumber: '6260次观看',
    },
    {
      url: video3,
      title: '5EPLAY现场专访B1AD3：找到了...',
      looknumber: '8262次观看',
    },
  ],
  [
    {
      url: video4,
      title: '5EPLAY现场专访IM：希望以好成绩...',
      looknumber: '7866次观看',
    },
    {
      url: video5,
      title: '5EPLAY现场专访DONK：赢得冠军...',
      looknumber: '14810次观看',
    },
    {
      url: video6,
      title: '5EPLAY现场专访B1T：NAVI每场...',
      looknumber: '9696次观看',
    },
  ],
])
const goodvideoList = ref<any>([
  { name: 'Big茄子', title: '5E白给精英', lookNumber: '254.27w观看' },
  { name: '椰汁冬瓜强', title: '5EPL精英', lookNumber: '201.27w观看' },
  { name: '椰汁冬瓜强', title: '5EPL精英', lookNumber: '201.27w观看' },
  { name: '椰汁冬瓜强', title: '5EPL精英', lookNumber: '201.27w观看' },
  { name: '椰汁冬瓜强', title: '5EPL精英', lookNumber: '201.27w观看' },
])
const hoverIndex = ref<number>(0)
const changebanner = (e: any, index: number) => {
  console.log(e)
  activeBanner.value = index
}
const playeydata = ref<any>([
  'ECL延雪平2024',
  'FIRELEAGUE2024全球总决赛',
  'BLAST春季总决赛',
  'YALLA COMPASS 2024',
  'ESLlLMAPCT 联赛 第5赛季 决赛',
])
const checkplayIndex = ref<number>(0)
const playList = ref<any>([
  {
    playimg: firstp,
    playth: oneth,
    playname: 'Senzu',
    playinfo: 'Rating 1.44',
  },
  {
    playimg: secondp,
    playth: twoth,
    playname: 'Dupreeh',
    playinfo: 'Rating 1.41',
  },
  {
    playimg: threep,
    playth: threeth,
    playname: 'Elige',
    playinfo: 'Rating 1.40',
  },
  {
    playimg: fourp,
    playth: fourth,
    playname: 'SunPayus',
    playinfo: 'Rating 1.25',
  },
  {
    playimg: fivep,
    playth: fiveth,
    playname: 'Hallzerk',
    playinfo: 'Rating 1.25',
  },
  {
    playimg: sixp,
    playth: sixth,
    playname: 'Deko',
    playinfo: 'Rating 1.23',
  },
  {
    playimg: sevenp,
    playth: seventh,
    playname: 'Saffee',
    playinfo: 'Rating 1.21',
  },
  {
    playimg: eightp,
    playth: eight,
    playname: 'Maden',
    playinfo: 'Rating 1.21',
  },
  {
    playimg: ninep,
    playth: nineth,
    playname: 'Grim',
    playinfo: 'Rating 1.19',
  },
  {
    playimg: tenp,
    playth: tenth,
    playname: 'Norwi',
    playinfo: 'Rating 1.13',
  },
])
const checkEventIndex = ref<number>(0)
const eventtabs = ref<string[]>(['赛事预告', '已结束'])
const eventdatas = ref<any>([
  {
    date: '06.19 周三',
    boxs: [
      {
        times: '06:45',
        state: '已结束',
        whereplay: 'Dust2 Liga 第3赛季 巴西',
        team1name: 'Galorys',
        team1logo: teamlogo1,
        team2name: 'inSanity',
        team2logo: teamlogo2,
        numbers: '2 : 0',
      },
      {
        times: '04:00',
        state: '已结束',
        whereplay: 'Dust2 Liga 第3赛季 巴西',
        team1name: 'Case',
        team1logo: teamlogo3,
        team2name: 'Solid',
        team2logo: teamlogo4,
        numbers: '0 : 2',
      },
    ],
  },
  {
    date: '06.18 周二',
    boxs: [
      {
        times: '16:00',
        state: '已结束',
        whereplay: 'United21 联赛 第16赛季',
        team1name: 'kONO',
        team1logo: teamlogo5,
        team2name: 'UNITY',
        team2logo: teamlogo6,
        numbers: '2 : 0',
      },
      {
        times: '07:40',
        state: '已结束',
        whereplay: 'Dust2 Liga 第3赛季 巴西',
        team1name: 'inSanitY',
        team1logo: teamlogo7,
        team2name: 'Dusty Ro...',
        team2logo: teamlogo8,
        numbers: '2 : 1',
      },
      {
        times: '04:00',
        state: '已结束',
        whereplay: 'Dust2 Liga 第3赛季 巴西',
        team1name: 'ex-Corinth..',
        team1logo: teamlogo9,
        team2name: 'Solid',
        team2logo: teamlogo10,
        numbers: '1 : 2',
      },
    ],
  },
  {
    date: '06.17 周一',
    boxs: [
      {
        times: '19:25',
        state: '已结束',
        whereplay: 'United21 联赛 第16赛季',
        team1name: 'UNITY',
        team1logo: teamlogo11,
        team2name: 'EXO',
        team2logo: teamlogo12,
        numbers: '2 : 1',
      },
      {
        times: '19:00',
        state: '已结束',
        whereplay: 'Regional Clash Arena 欧洲 ...',
        team1name: '5W',
        team1logo: teamlogo13,
        team2name: '3DMAX',
        team2logo: teamlogo14,
        numbers: '3 : 1',
      },
      {
        times: '16:00',
        state: '已结束',
        whereplay: 'United21 联赛 第16赛季',
        team1name: 'kONO',
        team1logo: teamlogo15,
        team2name: 'EXO',
        team2logo: teamlogo16,
        numbers: '2 : 1',
      },
      {
        times: '09:00',
        state: '已结束',
        whereplay: 'ECL S47 北美 升降级赛',
        team1name: 'E-Xolos L...',
        team1logo: teamlogo17,
        team2name: 'OMiT',
        team2logo: teamlogo18,
        numbers: '2 : 0',
      },
      {
        times: '07:40',
        state: '已结束',
        whereplay: 'FiReLEAGUE2024全球总决赛',
        team1name: '9z',
        team1logo: teamlogo19,
        team2name: 'fnatic',
        team2logo: teamlogo20,
        numbers: '2 : 1',
      },
    ],
  },
])
const comelist = ref<any>([
  {
    logo: come1,
    comename: '电竞世界杯2024',
    cometime: '07.17-07.21',
  },
  {
    logo: come2,
    comename: 'Skyesports 竞标赛...',
    cometime: '07.23-07.28',
  },
  {
    logo: come3,
    comename: 'BLAST Premier 秋...',
    cometime: '07.29-08.04',
  },
])
const overlist = ref<any>([
  {
    logo: over1,
    comename: 'FiReLEAGUE2024全球...',
    cometime: '06.14-06.17',
  },
  {
    logo: over2,
    comename: 'BLAST春季总决赛',
    cometime: '06.12-06.17',
  },
  {
    logo: over3,
    comename: 'ECL延雪平2024',
    cometime: '06.14-06.16',
  },
])
const ranklist = ref<any>([
  {
    no: 'NO.1',
    url: no1,
    teamname: 'Sprint',
    number: '997',
  },
  {
    no: 'NO.2',
    url: no2,
    teamname: 'Vitality',
    number: '917',
  },
  {
    no: 'NO.3',
    url: no3,
    teamname: 'MOUZ',
    number: '887',
  },
  {
    no: 'NO.4',
    url: no4,
    teamname: 'FaZe',
    number: '794',
  },
  {
    no: 'NO.5',
    url: no5,
    teamname: 'NAVI',
    number: '739',
  },
  {
    no: 'NO.6',
    url: no6,
    teamname: 'G2',
    number: '570',
  },
  {
    no: 'NO.7',
    url: no7,
    teamname: 'VP',
    number: '393',
  },
  {
    no: 'NO.8',
    url: no8,
    teamname: 'Astralis',
    number: '381',
  },
  {
    no: 'NO.9',
    url: no9,
    teamname: 'COL',
    number: '332',
  },
  {
    no: 'NO.10',
    url: no10,
    teamname: 'Heroic',
    number: '288',
  },
])
const nextteams = (value: string) => {
  if (
    (value === 'pre' && carouselIndex.value === 0) ||
    (value === 'next' && carouselIndex.value === schedulelist.value.length - 1)
  ) {
    return
  }
  carouselIndex.value =
    value === 'next' ? carouselIndex.value + 1 : carouselIndex.value - 1
}
const changehotImg = (e: any, index: number) => {
  console.log(e)
  hotimgIndex.value = index
}
const changHoverIndex = (e: any, index: number) => {
  console.log(e)
  hoverIndex.value = index
}
const reperIndex = (e: any) => {
  console.log(e)
  hoverIndex.value = 0
}
</script>
<style lang="scss" scoped>
ul {
  list-style: none !important;
  margin: 0;
  padding: 0;
}

.pagebox {
  width: 100%;

  .maincontent {
    flex-flow: column;
    display: flex;
    align-items: center;
    padding-top: 60px;
    background-color: #f6f6f6;
  }
}
</style>
