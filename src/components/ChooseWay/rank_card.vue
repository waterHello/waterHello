<template>
  <div class="rankCardPage">
    <div class="top">
      <van-nav-bar title="等级卡牌"
                   left-arrow
                   fixed
                   placeholder
                   @click-left="onClickLeft" />
    </div>
    <!-- 有等级卡牌 -->
    <div class="haveRankCard">
      <van-tabs v-model="RankCardActive"
                background="#121933"
                title-inactive-color="#666"
                title-active-color="#fff"
                swipeable>
        <van-tab title="已拥有"
                 name="3">
          <div class="nowaitcard"
               v-if="!rankCardFlag1">
            <van-empty class="custom-image"
                       :image="require('../../assets/img/cardPage/cardNull.png')"
                       description="暂无权益卡牌" />
          </div>
          <div v-if="rankCardFlag1"
               class="owncard">
            <div class="itemcard">
              <div class="img">
                <img src="../../assets/img/blindbox/card1.png"
                     alt="卡片">
              </div>
              <p class="title">5级黄金甲犀牛</p>
              <p class="num">#000005</p>
            </div>
            <div class="itemcard">
              <div class="img">
                <img src="../../assets/img/blindbox/card1.png"
                     alt="卡片">
              </div>
              <p class="title">5级黄金甲犀牛</p>
              <p class="num">#000005</p>
            </div>
            <div class="itemcard">
              <div class="img">
                <img src="../../assets/img/blindbox/card1.png"
                     alt="卡片">
              </div>
              <p class="title">5级黄金甲犀牛</p>
              <p class="num">#000005</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="待领取"
                 name="2">
          <div class="nowaitcard"
               v-if="!rankCardFlag2">
            <van-empty class="custom-image"
                       :image="require('../../assets/img/cardPage/cardNull.png')"
                       description="暂无权益卡牌" />
          </div>
          <div v-if="rankCardFlag2"
               class="waitcard">
            <div class="waitcarditem">
              <div class="left">
                <img src="../../assets/img/blindbox/card1.png"
                     alt="">
              </div>
              <div class="right">
                <div>
                  <span>5级黄金甲犀牛</span>
                  <span>
                    <van-checkbox icon-size="16px"
                                  v-model="ischecked"></van-checkbox>
                  </span>
                </div>
                <div>#000005</div>
                <div>5级黄金甲犀牛5级黄金甲犀牛5级黄金甲犀牛5级黄金甲犀牛5级…</div>
              </div>
            </div>
            <div class="waitcarditem">
              <div class="left">
                <img src="../../assets/img/blindbox/card1.png"
                     alt="">
              </div>
              <div class="right">
                <div>
                  <span>5级黄金甲犀牛</span>
                  <span>
                    <van-checkbox icon-size="16px"
                                  v-model="ischecked"></van-checkbox>
                  </span>
                </div>
                <div>#000005</div>
                <div>5级黄金甲犀牛5级黄金甲犀牛5级黄金甲犀牛5级黄金甲犀牛5级…</div>
              </div>
            </div>
          </div>
           <!-- 页脚 -->
          <div class="waitfooter" v-if="waitfooter">
            <div class="left">
              <p>已选择 {{ selecked }} 个</p>
              <p>提示:选择同种类NFT</p>
            </div>
            <div class="right">
              <van-button
                round
                :disabled="isselect"
                block
                type="info"
                @click="getCard()"
                >领取</van-button
              >
            </div>
          </div>
        </van-tab>
        <van-tab name="1"
                 title="待铸造">
          <div class="nowaitcard"
               v-if="!rankCardFlag3">
            <van-empty class="custom-image"
                       :image="require('../../assets/img/cardPage/cardNull.png')"
                       description="暂无权益卡牌" />
          </div>
          <div v-if="rankCardFlag3"
               class="coined">
            <div v-for="(cast,index) in castDataList" :key="cast.castid" class="coineditem">
              <div class="left">
                <img :src="cast.castimg"
                     alt="卡牌">
              </div>
              <div class="right">
                <div>{{cast.castname}}</div>
                <div>数量：{{cast.castnum}}</div>
                <div v-if="currentIndex == index ? fontFlag : !fontFlag">
                  <span @click="coincardHandler(cast,index)"><img :src="cast.casticon"
                         alt="铸造">铸造</span>
                </div>
                <div v-else
                     class="waitrank">
                  <p>铸造中…</p>
                  <p>铸造完成后可在待领取中进行领取</p>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 遮罩 -->
    <div v-show="maskFlag1"
         class="rankmask">
      <div class="maskbox">
        <div>
          本次铸造需要扣除20-50不等的TRX
          现在立即铸造？
        </div>
        <div>
          <p @click="cancelHandler">取消</p>
          <p @click="confirmHandler">确定</p>
        </div>
        <img class="img"
             src="../../assets/img/coincard/icon1.png"
             alt="警告">
      </div>
    </div>
    <div v-show="maskFlag2"
         class="rankmask">
      <div class="maskbox">
        <div>
          当前卡牌后期合成会销毁或升级，建议不进行铸造，未铸造仍可以在平台进行合成及交易，现在进行铸造？
        </div>
        <div>
          <p @click="jumpHandler">跳过铸造</p>
          <p @click="confirmRankHandler">确定铸造</p>
        </div>
        <img class="img"
             src="../../assets/img/coincard/icon1.png"
             alt="警告">
      </div>
    </div>
    <div v-show="maskFlag3"
         class="rankmask">
      <div class="maskbox">
        <div>
          已成功提交铸造，请等待铸造铸造完成后即可领取至钱包
        </div>
        <div>
          <p @click="cancelHandler">取消</p>
          <p @click="confirmSuccHandler">确定</p>
        </div>
        <img class="img"
             src="../../assets/img/coincard/icon2.png"
             alt="确认">
      </div>
    </div>

  </div>

</template>
<script>
export default {
  data() {
    return {
      rankCardFlag1: true, //拥有无卡片状态
      rankCardFlag2: true, //待领取无卡片状态
      rankCardFlag3: true, //待铸造无卡片状态
      RankCardActive: '1',
      cardState: [],
      ischecked: false,
      maskFlag1: false, //遮罩第一次状态
      maskFlag2: false, //遮罩第二次状态
      maskFlag3: false, //遮罩第三次状态
      fontFlag: false, //字体状态
      cardData:[],//接收卡牌数据
      currentIndex:-1,
      index:-2,
      waitfooter:true,
      // 定义卡牌数据
      castDataList:[
        {
          castid:1+'',
          castname:"三级青铜甲犀牛",
          castnum:'1',
          casticon:require('../../assets/img/coincard/icon3.png'),
          castimg:require('../../assets/img/coincard/card1.png'),
        },
        {
          castid:2+'',
          castname:"三级青铜甲犀牛",
          castnum:'1',
          casticon:require('../../assets/img/coincard/icon3.png'),
          castimg:require('../../assets/img/coincard/card1.png'),
        },
        {
          castid:3+'',
          castname:"三级青铜甲犀牛",
          castnum:'1',
          casticon:require('../../assets/img/coincard/icon3.png'),
          castimg:require('../../assets/img/coincard/card1.png'),
        },
        {
          castid:4+'',
          castname:"三级青铜甲犀牛",
          castnum:'1',
          casticon:require('../../assets/img/coincard/icon3.png'),
          castimg:require('../../assets/img/coincard/card1.png'),
        }
      ]
    }
  },
  methods: {
    getCard(){
      console.log('88');
    },
    onClickLeft() {
      this.$router.back()
    },
    coincardHandler(id,index) {
      this.index=null
      this.index=index
      this.maskFlag1 = true
    },
    cancelHandler() {
      this.maskFlag1 = false
      this.maskFlag3 = false
    },
    confirmHandler() {
      console.log('7')
      this.maskFlag2 = true
      this.maskFlag1 = false
    },
    jumpHandler() {
      this.maskFlag2 = false
    },
    confirmRankHandler() {
       this.currentIndex=this.index
      this.maskFlag2 = false
      this.maskFlag3 = true
    },
    confirmSuccHandler() {
      this.maskFlag3 = false
    }
  },
   computed: {
    Not_activatedList() {
      return this.cardList.filter((card) => card.Activate === "0");
    },
    pd_card() {
      return this.cardList.filter((card) => card.Activate === "1");
    },
    selecked() {
      return this.cardState.filter((card) => card.ischecked === true).length;
    },
    isselect() {
    // return this.selecked > 0 ? false : true;
      return true;
    },
  },
}
</script>
<style lang="less" scoped>
.rankCardPage {
  // 头部样式
  .top {
    /deep/ .van-nav-bar__content {
      background-color: #1B2945;
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
  // 有卡片样式
  .haveRankCard {
    /deep/ .van-tabs__wrap {
      margin-bottom: 0 !important;
    }
    /deep/ .van-tabs__nav {
      background-color: none !important;
    }
    /deep/ .van-tab__text {
      font-size: 36px;
    }
    /deep/ .van-tabs__line {
      background-color: #237ff8;
    }
    /deep/ .van-tabs__wrap {
      margin-bottom: 39px;
    }
    .owncard {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 40px 30px;
      box-sizing: border-box;
      background: linear-gradient(174deg, #121933 0%, #121933 0%, #06070a 100%);

      .itemcard {
        width: 330px;
        height: 587px;
        background: #1b2333;
        padding: 15px;
        margin-bottom: 30px;
        box-sizing: border-box;
        border-radius: 16px;
        img {
          width: 300px;
          height: 436px;
        }
        .title {
          margin-top: 20px;
          font-size: 32px;
          font-weight: 400;
          color: #ffffff;
          text-align: left;
        }
        .num {
          margin-top: 10px;
          font-size: 24px;
          font-weight: 400;
          color: #858992;
          text-align: left;
        }
      }
    }
    .waitcard {
      width: 100%;
      padding-top: 40px;
      background: linear-gradient(174deg, #121933 0%, #121933 0%, #06070a 100%);
      .waitcarditem {
        width: 690px;
        padding: 30px;
        margin: 0 auto 30px;
        background: #1b2333;
        border-radius: 16px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .left {
          margin-right: 30px;
          img {
            width: 160px;
            height: 232px;
          }
        }
        .right {
          div {
            &:nth-child(1) {
              display: flex;
              justify-content: space-between;
              color: #fff;
              font-size: 32px;
              margin-bottom: 20px;
            }
            &:nth-child(2) {
              font-size: 28px;
              color: #858992;
              margin-bottom: 20px;
            }
            &:nth-child(3) {
              font-size: 28px;
              color: #858992;
              margin-bottom: 20px;
            }
          }
        }
      }
    }
    .waitfooter {
    width: 100vw;
    height: 120px;
    background: #11192b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 11;
    .left {
      margin-left: 40px;
      p {
        &:nth-child(1) {
          color: white;
          font-size: 28px;
        }
        &:nth-child(2) {
          color: #858992;
          font-size: 22px;
          margin-top: 10px;
        }
      }
    }
    .right {
      margin-right: 20px;
      /deep/ .van-button {
        width: 260px;
      }
    }
  }
    .coined {
      width: 100%;
      padding-top: 40px;
      background: linear-gradient(174deg, #121933 0%, #121933 0%, #06070a 100%);

      .coineditem {
        width: 690px;
        margin: 0 auto 30px;
        background: #1b2333;
        border-radius: 16px;
        border: 1px solid #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px;
        box-sizing: border-box;
        .left {
          img {
            width: 160px;
            height: 232px;
          }
        }
        .right {
          div {
            &:nth-of-type(1) {
              font-size: 32px;
              color: #ffffff;
              margin-bottom: 24px;
            }
            &:nth-of-type(2) {
              width: 440px;
              height: 40px;
              margin-bottom: 43px;
              font-size: 28px;
              color: #ffffff;
            }
            &:nth-of-type(3) {
              width: 440px;
              font-size: 28px;
              color: #227aee;
              display: flex;
              justify-content: flex-end;
              span {
                width: 210px;
                height: 80px;
                line-height: 80px;
                border-radius: 48px 48px 48px 48px;
                background: #112a4a;
                text-align: center;
                img {
                  vertical-align: middle;
                  width: 40px;
                  height: 43px;
                  margin-right: 10px;
                }
              }
            }
            &.waitrank {
              display: block;
              p {
                color: #fc7542;
                font-size: 28px;
              }
            }
          }
        }
      }
    }
  }
  // 遮罩样式
  .rankmask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    .maskbox {
      width: 590px;
      background-color: #fff;
      border-radius: 20px;
      position: relative;

      div {
        &:nth-child(1) {
          padding: 100px 30px 40px 30px;
          color: #333333;
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
  //无卡样式
  .nowaitcard {
    background: linear-gradient(174deg, #121933 0%, #121933 0%, #06070a 100%);
    .custom-image /deep/ .van-empty__image {
      width: 400px;
      height: 300px;
    }
    .custom-image /deep/ .van-empty__description {
      font-size: 28px;
    }
  }
}
</style>