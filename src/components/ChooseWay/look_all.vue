<template>
  <div class="lookall">
    <div class="top">
      <van-nav-bar title="我的盲盒"
                   :border="false"
                   fixed
                   placeholder
                   z-index="111"
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <div class="lookallcontent">
      <div class="openbox">
        <img src="../../assets/img/blindbox/box1.png"
             alt="" />
      </div>
      <p class="title">总数 {{ openBox }}/{{ totalBoxNum }}</p>
      <div class="scorllItem">
        <ul>
          <li :class="{ blindboxActive: box.ID === '70' }"
              v-for="(box, i) in filter_boxList"
              :key="i">
            #{{ box.ID.padStart(6, 0) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { myNft } from '@/api/newReqets'
export default {
  data() {
    return {
      boxList: []
    }
  },
  created() {
    this.getBox()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async getBox() {
      const { data } = await myNft(2)
      this.boxList = data
    }
  },
  computed: {
    totalBoxNum() {
      return this.boxList.length
    },
    openBox() {
      return this.boxList.reduce((total, pre) => (pre.Activate === '0' ? (total += 1) : total), 0)
    },
    filter_boxList() {
      return this.boxList.filter((card) => card.Activate === '0')
    }
  }
}
</script>
<style lang="less" scoped>
.lookall {
  width: 100vw;
  overflow: hidden;
  background: linear-gradient(174deg, #437fff 0%, #172d5a 0%, #06070a 100%);
  .top {
    /deep/ .van-nav-bar__content {
      background-color: #1b2945;
    }
    /deep/ .van-nav-bar {
      background-color: none;
    }
    /deep/ .van-icon {
      color: #fff;
    }
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
  }
  .lookallcontent {
    .openbox {
      width: 560px;
      height: 320px;
      margin: 85px auto 0;
      background: url('../../assets/img/blindbox/bg.png') no-repeat center center;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 230px;
        height: 194px;
        text-align: center;
      }
    }
    .title {
      text-align: center;
      color: #fff;
      font-size: 32px;
      position: absolute;
      top: 34%;
      left: 50%;
      transform: translateX(-50%);
    }
    .scorllItem {
      width: 100%;
      height: 100%;
      margin-top: 40px;
      // height: 100vh;
      // height: 250px;
      // height: 100%;
      // overflow-y: auto;
    }
    ul {
      width: 100%;
      color: #fff;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 40px;
      li {
        width: 160px;
        height: 64px;
        border: 1px solid #84878c;
        margin-bottom: 30px;
        margin-right: 17px;
        font-size: 24px;
        text-align: center;
        line-height: 64px;
        border-radius: 50px;
        box-sizing: border-box;
      }
    }
    .blindboxActive {
      color: #ffb942;
      border: 1px solid #ffb942;
    }
  }
}
</style>