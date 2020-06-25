<template>
  <div id="header">
    <div id="bg"></div>
    <div id="content" v-if="details.supports">
      <van-image width="75" height="75" radius="5" :src="logo" class="logo" />
      <div class="center">
        <p class="title">
          <van-image width="35" height="20" :src="brandImg" />
          {{details.title}}
        </p>
        <p class="delivery">
          <span>{{details.description}}</span>/
          <span>{{details.deliveryTime}}分钟送达</span>
        </p>
        <div class="supports">
          <van-image width="15" height="15" :src="subImg" />
          {{details.supports[1]}}
          <p class="right">{{details.supports.length}}个 ></p>
        </div>
      </div>
    </div>
    <div id="bottom">
      <van-image width="30" height="16" :src="bulletinImg" />
      <p>{{details.bulletin}}</p>
      <span>></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("../../assets/images/logo.png"),
      brandImg: require("../../assets/images/brand@2x.png"),
      subImg: require("../../assets/images/decrease_1@2x.png"),
      bulletinImg: require("../../assets/images/bulletin@2x.png"),
      details: {
        supports: ["单人精彩套餐", "VC无限橙果汁全场8折", "在线支付满28减5"]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
#header {
  height: 155px;
  position: relative;
  #bg {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/logo.png") no-repeat;
    background-size: cover;
    background-position: center;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
  }
  #content {
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    height: 115px;
    padding: 20px 20px;
    color: white;
    flex: 1;
    .center {
      flex: 1;
      margin-left: 20px;
      .van-image {
        margin-right: 5px;
      }
      .title {
        display: flex;
        font-size: 16px;
        align-items: center;
        font-weight: bold;
        p {
          margin-left: 5px;
        }
      }
    }
    .delivery {
      font-size: 14px;
      margin: 7.5px 0;
      color: #d2cecd;
    }
    .supports {
      display: flex;
      align-items: center;
      font-size: 14px;
      position: relative;
      color: #d2cecd;
      p {
        margin-left: 5px;
      }
      .right {
        position: absolute;
        right: 30px;
        margin-left: 20px;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 20px;
        background: #383838;
      }
    }
  }
  #bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    padding: 5px 0;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    height: 20px;
    width: 100%;
    color: #b7b8bb;
    font-size: 14px;
    p {
      width: 100%;
      flex: 1;
      padding-right: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    span {
      margin-right: 10px;
    }
    .van-image {
      margin: 0 5px 0 20px;
    }
  }
}
</style>