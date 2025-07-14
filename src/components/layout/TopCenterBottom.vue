<!--
 * @Author: Wuzl
 * @Date: 2024-07-11 08:57:07
 * @Description: 
-->
<template>
  <div class="layout">
    <header class="header">
      <slot name="header"></slot>
    </header>
    <main class="content">
      <slot name="content"></slot>
    </main>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TopCenterBottom',
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
