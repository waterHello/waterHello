<template>
  <div class="wrapper"
       ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core'
export default {
  name: 'BetterScroll',

  data() {
    return {
      scroll: null
    }
  },
  // created
  // mounted() {
  //   this.scroll = new BScroll(this.$refs.wrapper, {
  //     // wheel: true
  //   })
  // },
  beforeUpdate() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    })
  }
  // created() {
  //   this.$nextTick(() => {
  //     this.scroll = new BScroll(this.$refs.wrapper, {
  //       click: true
  //     })
  //   })
  // }
}
</script>
<style lang="less" scoped>
</style>