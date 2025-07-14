<template>
  <div ref="chartContainer" class="w-[1300px] h-[680px] ml-[460px]"></div>
</template>
<script lang="ts">
export default {
  name: 'MapEchart',
}
</script>
<script lang="ts" setup>
import * as echarts from 'echarts'
import EchartTooltip from './EchartTooltip.vue'
import cancheck from '@/assets/images/dataCenter/datacenter_cancheck.jpg'
import ischeck from '@/assets/images/dataCenter/datacenter_ischeck.jpg'
import discheck from '@/assets/images/dataCenter/datacenter_discheck.jpg'
import mapjson from './map.json'
// 用于接收echart
let myChart: any | null = null
// echart配置项
let option: any | null = null
// 对于市中心点位
let unitManagementData: any = []
// 容器ref
const chartContainer = ref<HTMLDivElement | null>(null)
// 创建tooltip组件
let vueAppInstance: any = null
// 需显示市
const showCity = ref<string[]>([
  '十堰市',
  '襄阳市',
  '宜昌市',
  '荆门市',
  '潜江市',
  '武汉市',
])
// 绘制echart并使其自适应
onMounted(() => {
  drawChart()
  window.addEventListener('resize', () => {
    myChart?.resize() //
  })
})
// 销毁echart
onUnmounted(() => {
  myChart?.dispose()
})
// 绘制echart
const drawChart = async () => {
  if (!chartContainer.value) return
  myChart = echarts.init(chartContainer.value)
  myChart.showLoading()
  // 获取湖北地图及对应市点位
  mapjson.features.forEach((element1: any) => {
    if (element1.properties.centroid) {
      element1.properties.centroid[1] = element1.properties.centroid[1] - 0.05
      if (!showCity.value.includes(element1.properties.name)) return
      unitManagementData.push({
        Name: element1.properties.name,
        value: element1.properties.centroid,
      })
    }
  })
  myChart.hideLoading()
  echarts.registerMap('HB', mapjson)
  myChart.setOption(
    (option = {
      select: {
        disabled: true,
      },
      tooltip: {
        trigger: 'item',
        extraCssText: 'padding:0',
        formatter(params: any) {
          if (!params.name) {
            return null
          } else {
            // 返回一个唯一的 ID 以便后续操作
            return `<div id="tooltip-${params.dataIndex}" class="tooltip-box" style='top: -4px;left: -5px;'></div>`
          }
        },
      },
      geo: {
        aspectScale: 0.86,
        map: 'HB',
        itemStyle: {
          borderColor: '#7A6BF0',
          borderWidth: 2,
        },
      },
      series: [
        {
          aspectScale: 0.86,
          name: '湖北地图',
          type: 'map',
          map: 'HB',
          label: {
            show: true,
            color: '#eee',
            offset: [0, -20],
            fontSize: '16px',
            fontStyle: 'italic',
          },
          itemStyle: {
            // 设置普通状态下的样式(地图区域的颜色、边界线颜色)
            areaColor: {
              image: discheck,
              repeat: 'repeat',
            },
            borderColor: '#634E80',
            borderWidth: 1,
          },
          emphasis: {
            // 设置高亮时的的样式(地图区域的颜色、边界线颜色)
            itemStyle: {
              areaColor: {
                image: ischeck,
                repeat: 'repeat',
              },
              borderColor: '#56F2DB',
              shadowColor: '#56F2DB',
              shadowBlur: 4,
            },
            label: {
              show: true,
              color: '#56F2DB',
            },
          },
          nameMap: {
            咸宁市: '',
            神农架林区: '',
            随州市: '',
            孝感市: '',
            天门市: '',
            仙桃市: '',
            黄冈市: '',
            鄂州市: '',
            黄石市: '',
            荆州市: '',
            恩施土家族苗族自治州: '',
          },
          data: [],
          zlevel: 0,
        },
        {
          name: 'HB',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: unitManagementData,
          symbolSize: 8,
          showEffectOn: 'render',
          rippleEffect: {
            number: 2,
            brushType: 'stroke',
            color: '#01fcc2',
            scale: 5, //规模
          },
          itemStyle: {
            color: '#01fcc2',
            shadowColor: '#01fcc2',
            shadowBlur: 10,
          },
          tooltip: {
            show: false,
            triggerOn: 'none',
          },
          silent: true,
          zlevel: 1,
        },
      ],
    }),
  )

  // 鼠标移入事件显示对于tooltip
  myChart.on('mouseover', function (params: any) {
    if (!params.data) {
      myChart.setOption(option)
    } else {
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      })
    }
  })

  // 监听tooltip出现事件渲染对应组件
  myChart.on('showTip', function (params: any) {
    const tooltipElement = document.getElementById(
      `tooltip-${params.dataIndex}`,
    )
    if (tooltipElement) {
      if (vueAppInstance) {
        vueAppInstance.unmount()
      }
      vueAppInstance = createApp({
        render: () => h(EchartTooltip),
      })
      vueAppInstance.mount(tooltipElement)
    }
  })
  showCity.value.forEach((item: any) => {
    option.series[0].data.push({
      name: item,
      itemStyle: { areaColor: { image: cancheck, repeat: 'repeat' } },
      label: {
        fontSize:
          item === '武汉市' || item === '宜昌市'
            ? '14px'
            : item === '潜江市'
            ? '12px'
            : '16px',
      },
    })
  })

  myChart.setOption(option)
}
</script>
<style></style>
<style lang="scss" scoped>
:deep(.tooltip-box) {
  position: absolute;
}
</style>
