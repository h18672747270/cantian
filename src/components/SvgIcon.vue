<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
export default {
  name: 'SvgIcon',
}
</script>
<script lang="ts" setup>
const props = defineProps({
  className: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
})

const iconName = computed(() => `#icon-${props.className}`)
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon svg-icon-${props.className}`
  }
  return 'svg-icon'
})
</script>

<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
