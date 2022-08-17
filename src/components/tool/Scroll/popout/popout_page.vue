<template>
  <div class="popout">
    <!-- <van-overlay :show="show1" :key="1.1" @click="show1 = false"> -->
    <div class="wrapper" @click.stop>
      <div class="maskbox">
        <div>
          <slot></slot>
        </div>
        <div>
          <p @click="show1 = false">取消</p>
          <p @click="confirmHandler">确定</p>
        </div>
        <img class="img" src="~@/assets/img/coincard/icon1.png" alt="警告" />
      </div>
    </div>
    <!-- </van-overlay> -->
  </div>
</template>
<script>
export default {
  props: {
    show: Boolean,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  .maskbox {
    width: 590px;
    background-color: #fff;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    div {
      &:nth-child(1) {
        padding: 100px 30px 40px 30px;
        color: #fc7542;
        font-size: 32px;
        line-height: 53px;
        text-align: center;
      }
      &:nth-child(2) {
        width: 100%;
        height: 95px;
        line-height: 95px;
        display: flex;
        align-items: center;
        font-size: 32px;
        border-top: 1px solid #f3f4f5;

        p {
          flex: 1;
          text-align: center;
          font-size: 32px;
          height: 100%;
          &:nth-child(1) {
            color: #666666;
            border-right: 1px solid #f3f4f5;
          }
          &:nth-child(2) {
            color: #1b2945;
          }
        }
      }
    }
    .img {
      width: 200px;
      height: 200px;
      position: absolute;
      top: -25%;
      left: 50%;
      transform: translate(-50%, 0%);
    }
  }
}
</style>