<template>
  <div class="footboss">
    <div class="footbox">
      <div class="footinfo">
        <div class="guide">
          <p>
            <img v-lazyLoad="guideIcon1" scr="" alt="" />
            <span class="tex1">网站导航</span>
          </p>
          <div class="wordbox">
            <div class="guid-herf">
              <a>天梯排行榜</a>
            </div>
            <div class="guid-herf">
              <a>5EPL</a>
            </div>
            <div class="guid-herf">
              <a>5E商城</a>
            </div>
            <div class="guid-herf">
              <a>封禁榜</a>
            </div>
            <div class="guid-herf">
              <a>在线帮助</a>
            </div>
            <div class="guid-herf">
              <a>5E锦标赛</a>
            </div>
            <div class="guid-herf">
              <a>5E社区</a>
            </div>
          </div>
        </div>
        <div class="guide">
          <p>
            <img v-lazyLoad="guideIcon2" src="" alt="" />
            <span class="tex1">合作伙伴</span>
          </p>
          <div class="swpper">
            <n-carousel :autoplay="true">
              <img v-lazyLoad="sponsors0" src="" alt="" />
              <img v-lazyLoad="sponsors1" src="" alt="" />
            </n-carousel>
          </div>
        </div>
        <div class="guide">
          <p>
            <img v-lazyLoad="guideIcon3" src="" alt="" />
            <span class="tex1">5EPlay App</span>
          </p>
          <img v-lazyLoad="guideApp" class="appimg" src="" alt="" />
        </div>
      </div>
    </div>
    <div class="footdown">
      <div class="footwords">
        <div class="link">
          <ul>
            <li><a>关于5EPlay</a></li>
            <li><a>联系我们</a></li>
            <li><a>商务合作</a></li>
            <li><a>服务条款</a></li>
            <li><a>个人信息保护政策</a></li>
            <li><a>个人信息保护指引</a></li>
            <li><a>友情链接</a></li>
            <li><a>加入我们</a></li>
          </ul>
        </div>
        <p class="marp">
          平台适合年满17岁以上的用户使用：为了您的健康，请合理控制游戏时间
        </p>
        <div class="marp">
          <div class="copyright">
            ©2011-2024 咸宁市志帆科技有限公司
            <a href="">鄂ICP备2023019279号-3</a>
            <a href="" class="blank">鄂公网安备42120202000498号</a>
            <a href="" class="blank">营业执照</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NCarousel } from 'naive-ui'
import guideIcon1 from '@/assets/images/csgoCab/guide-icon1.png'
import guideIcon2 from '@/assets/images/csgoCab/guide-icon2.png'
import guideIcon3 from '@/assets/images/csgoCab/guide-icon3.png'
import sponsors0 from '@/assets/images/csgoCab/sponsors0.png'
import sponsors1 from '@/assets/images/csgoCab/sponsors1.png'
import guideApp from '@/assets/images/csgoCab/guide-app.png'
</script>
<style>
.n-carousel__dot {
  width: 8px !important;
  height: 8px !important;
  background-color: #fff !important;
}
.n-carousel__dot--active {
  background-color: #347af0 !important;
}
</style>
