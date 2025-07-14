<template>
  <div class="enfold-box competition-club flex">
    <div class="left-box">
      <div class="schools-box competition-club-title flex">
        <span>百校电竞</span>
        <span class="club-font">俱</span>
        <span class="club-font">乐</span>
        <span class="club-font">部</span>
        <span class="club-font">计</span>
        <span class="club-font">划</span>
      </div>
      <div class="handin-box">
        共同携手，推动电竞事业的发展，共同见证这一新兴产业的
        <br />
        辉煌未来
      </div>
      <div class="btn-box">加入我们</div>
    </div>
    <div class="right-box">
      <div
        v-for="(row, rowIndex) of hexagonRows"
        :key="rowIndex"
        class="honeycomb"
      >
        <Hexagon
          v-for="(hex, hexIndex) in row"
          :id="hex.id"
          :key="hexIndex"
          :image-path="hex.imagePath"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import imgUrl_one from '../../assets/images/competition/join3.png'
import imgUrl_tow from '../../assets/images/competition/join8.png'
import imgUrl_three from '../../assets/images/competition/join1.png'
import imgUrl_four from '../../assets/images/competition/join6.png'
import imgUrl_five from '../../assets/images/competition/join11.png'
import imgUrl_six from '../../assets/images/competition/join4.png'
import imgUrl_sevsn from '../../assets/images/competition/join9.png'
import imgUrl_eight from '../../assets/images/competition/join2.png'
import imgUrl_nine from '../../assets/images/competition/join7.png'
import imgUrl_ten from '../../assets/images/competition/join12.png'
import imgUrl_eleven from '../../assets/images/competition/join5.png'
import imgUrl_twelve from '../../assets/images/competition/join10.png'
import Hexagon from './hexagon.vue'
const hexagonRows = ref([
  // 第一列
  [
    { id: 1, imagePath: imgUrl_one },
    { id: 6, imagePath: imgUrl_tow },
  ],
  // 第二列
  [
    { id: 2, imagePath: imgUrl_three },
    { id: 7, imagePath: imgUrl_four },
    { id: 11, imagePath: imgUrl_five },
  ],
  // 第三列
  [
    { id: 3, imagePath: imgUrl_six },
    { id: 8, imagePath: imgUrl_sevsn },
  ],
  // 第四列
  [
    { id: 4, imagePath: imgUrl_eight },
    { id: 9, imagePath: imgUrl_nine },
    { id: 12, imagePath: imgUrl_ten },
  ],
  // 第五列
  [
    { id: 5, imagePath: imgUrl_eleven },
    { id: 10, imagePath: imgUrl_twelve },
  ],
])
</script>
<style lang="scss" scoped>
.enfold-box {
  background-color: #f3f3f3;
  padding: 0 260px 45px;
  .left-box,
  .right-box {
    width: 50%;
  }
  .right-box {
    position: relative;
    bottom: -200px;
    opacity: 0;
    transition: all 0.3s linear;
  }
  .left-box {
    .schools-box {
      font-weight: bold;
      font-size: 42px;
      color: #333;
      margin-bottom: 50px;
    }
    .club-font {
      position: relative;
      bottom: -600px;
      transition: all 0.3s linear;
    }
    .handin-box {
      font-weight: normal;
      font-size: 20px;
      color: #333;
      margin-bottom: 80px;
    }
    .btn-box {
      width: 180px;
      height: 60px;
      background: #4924ea;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font: 400 22px Arial, sans-serif;
      color: #fff;
    }
  }
  .right-box {
    display: flex;
    justify-content: center;
    gap: 17px;
  }
}
</style>
