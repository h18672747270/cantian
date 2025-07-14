<template>
  <div class="hexagon logo" :data-logo-id="props.id">
    <img v-lazyLoad="props.imagePath" class="location" src="" alt="" />
    <div
      v-for="n in 6"
      :key="n"
      :class="['line' + n, 'box-shadow' + id + n]"
    ></div>
  </div>
</template>
<script>
export default {
  name: 'Hexagon',
}
</script>
<script setup>
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  imagePath: {
    type: String,
    default: '',
  },
})
</script>
<style lang="scss">
.location {
  position: absolute;
  z-index: 2;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: auto;
}
.hexagon {
  position: relative;
  display: inline-block;
  margin: 1px 18px;
  background-color: #fff;
  text-align: center;
}
.hexanone {
  position: relative;
  display: inline-block;
  width: 67px;
  height: 116px;
  margin: 1px 18px;
}
.honeycomb {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
.hexagon,
.hexagon::before,
.hexagon::after {
  width: 67px;
  height: 116px;
  border-radius: 8%/1%;
}
.hexagon::before {
  background-color: inherit;
  content: '';
  position: absolute;
  left: 0;
  transform: rotate(-60deg);
  z-index: 1;
}
.hexagon::after {
  background-color: inherit;
  content: '';
  position: absolute;
  left: 0;
  transform: rotate(60deg);
  z-index: 1;
}

.hexagon {
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  .line1 {
    width: 102%;
    position: absolute;
    border: 1px solid transparent;
    transform: rotate(180deg);
    display: none;
  }

  .line2 {
    width: 102%;
    position: absolute;
    border: 1px solid transparent;
    bottom: -1px;
    display: none;
  }
  .line3 {
    width: 102%;
    position: absolute;
    border: 1px solid transparent;
    left: -43px;
    top: 30px;
    transform: rotate(120deg);
    display: none;
  }
  .line4 {
    width: 102%;
    position: absolute;
    border: 1px solid transparent;
    right: -43px;
    bottom: 31px;
    transform: rotate(-60deg);
    display: none;
  }
  .line5 {
    width: 102%;
    position: absolute;
    border: 1px solid transparent;
    right: -45px;
    bottom: 85px;
    transform: rotate(240deg);
    display: none;
  }
  .line6 {
    width: 102%;
    position: absolute;
    border: 1px solid transparent;
    left: -46px;
    top: 79px;
    transform: rotate(60deg);
    display: none;
  }
}
.hexagon:hover {
  cursor: pointer;
  z-index: 2;
  transform: scale(1.2);
}
.hexagon:hover img {
  transform-origin: center center;
  transform: scale(1.3) translateY(-40%);
}
.hexagon:hover .line1,
.hexagon:hover .line2,
.hexagon:hover .line3,
.hexagon:hover .line4,
.hexagon:hover .line5,
.hexagon:hover .line6 {
  display: block;
  z-index: -5 !important;
}

$colors: #74ce35, #ff9a39, #f72437, #7b2d2e, #00c389, #e94940, #e22236, #a322ac,
  #48d2ff, #5084fc, #e0281e, #a21830;

@for $i from 1 through length($colors) {
  $color: nth($colors, $i);
  $j: 1;
  @while $j <= 6 {
    @if $j == 1 {
      .box-shadow#{$i}#{$j} {
        box-shadow: $color 1px 3px 3px 0px;
      }
    } @else if $j == 2 {
      .box-shadow#{$i}#{$j} {
        box-shadow: $color 0px 2px 3px 0px;
      }
    } @else if $j == 3 {
      .box-shadow#{$i}#{$j} {
        box-shadow: $color 2px 8px 3px 0px;
      }
    } @else if $j == 4 {
      .box-shadow#{$i}#{$j} {
        box-shadow: $color 1px 9px 3px 0px;
      }
    } @else if $j == 5 {
      .box-shadow#{$i}#{$j} {
        box-shadow: $color -1px 6px 3px 0px;
      }
    } @else if $j == 6 {
      .box-shadow#{$i}#{$j} {
        box-shadow: $color 4px 8px 3px 0px;
      }
    }
    $j: $j + 1;
  }
}
</style>
