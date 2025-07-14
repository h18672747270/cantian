<template>
  <svg-icon :class-name="iconName" :color="iconColor" />
</template>

<script lang="ts" setup>
defineComponent({
  name: 'MenuSvg',
})

defineProps({
  iconName: {
    type: String,
    default: () => '',
  },
  iconColor: {
    type: String,
    default: () => '#e5457e',
  },
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 22px;
  height: 22px;
}
</style>
