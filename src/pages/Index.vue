<template>
  <div id="index-content">
    <div id="header" @click="show = true">
      <img :src="this.logo" width="100%" height="155" style="filter: blur(2px);" />
      <div id="content">
        <van-image width="75" height="75" radius="5" :src="details.avatar" class="logo" />
        <div class="center">
          <p class="title">
            <van-image width="35" height="20" :src="brandImg" />
            {{details.name}}
          </p>
          <p class="delivery">
            <span>{{details.description}}</span>/
            <span>{{details.deliveryTime}}分钟送达</span>
          </p>
          <div v-if="details.supports" class="supports">
            <van-image width="15" height="15" :src="subImg" />
            {{details.supports[0].msg}}
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
    <!--  @click="show = false" -->
    <van-overlay :show="show">
      <div class="wrapper">
        <p class="name">乡村基(高新金融店)</p>
        <p class="close" @click="show=!show">×</p>
        <van-rate
          v-model="details.score"
          allow-half
          disabled
          disabled-color="#fe9900"
          :size="30"
          :gutter="15"
          void-color="#eee"
        />
        <div class="reduced">
          <p class="divider_msg">
            <span></span>
            <b>优惠信息</b>
            <span></span>
          </p>
          <p class="sup" v-for="(item,index) in details.supports" :key="index">
            <img :src="item.icon" alt />
            {{item.msg}}
          </p>
        </div>
        <div class="notice">
          <p class="divider_msg">
            <span></span>
            <b>优惠信息</b>
            <span></span>
          </p>
          <p class="msg">{{details.bulletin}}</p>
        </div>
      </div>
    </van-overlay>

    <div id="treeSelect" ref="treeSelect">
      <!-- <div class="nav">
        <router-link to="/" class="active">商品</router-link>
        <router-link to="/evaluation">评价</router-link>
        <router-link to="/merchant">商家</router-link>
      </div>-->
      <van-sticky :offset-top="-10">
        <van-tabs title-active-color="red">
          <van-tab title="商品" to="/"></van-tab>
          <van-tab title="评价" to="/evaluation"></van-tab>
          <van-tab title="商家" to="/merchant"></van-tab>
        </van-tabs>
      </van-sticky>
    </div>
    <router-view></router-view>
    <transition name="slide-fade">
      <ShopCar v-show="shopCarShow" id="shopCar_content" />
    </transition>

    <div id="footer">
      <!-- <div class="mRound" @click="shopCarShow = !shopCarShow">-->
      <div class="round">
        <van-icon
          class="iconfont"
          class-prefix="icon"
          :name="this.getShopCar.length?'ai-cart-active':'ai-cart'"
          @click="shopCarShow = !shopCarShow"
        />
      </div>
      <!-- </div> -->
      <div class="left" :class="{shopActive:this.getShopCar.length}">
        <p class="price">{{this.getShopCar.length?'￥'+this.getTotalPrice:"￥0.00"}}</p>
        <p class="msg">￥另需配送费￥4元</p>
      </div>
      <div
        :class="{right:true,shopActive:this.getShopCar.length}"
      >{{this.getShopCar.length?'去结算':'￥20起送'}}</div>
    </div>
  </div>
</template>

<script>
import { API_SHOP_SELLER, SERVEIP } from "../api/apis";
import ShopCar from "./ShopCar";
import "../assets/styles/icon.css";
export default {
  components: {
    ShopCar
  },
  data() {
    return {
      // header
      shopCarShow: false,
      Fixed: false,
      show: false,
      logo: "",
      brandImg: require("../assets/images/brand@2x.png"), //品牌
      subImg: require("../assets/images/decrease_1@2x.png"), //减
      bulletinImg: require("../assets/images/bulletin@2x.png"), //公告
      discount: require("../assets/images/discount_1@2x.png"), //折
      special: require("../assets/images/special_1@2x.png"), //特
      details: {}
    };
  },
  created() {
    API_SHOP_SELLER().then(res => {
      this.details = res.data.data;
      let supImg = [
        require("../assets/images/discount_1@2x.png"),
        require("../assets/images/discount_1@2x.png"),
        require("../assets/images/decrease_1@2x.png"),
        require("../assets/images/discount_1@2x.png")
      ];
      this.logo = this.details.avatar = res.data.data.avatar.replace(
        "http://127.0.0.1:5000",
        SERVEIP
      );
      this.details.supports.map((item, index) => {
        this.details.supports[index] = { icon: supImg[index], msg: item };
      });
    });
  },
  computed: {
    getShopCar() {
      return this.$store.getters.getShopCar;
    },
    package() {
      let num = 0;
      this.$store.getters.getShopCar.forEach(item => {
        num += item.num;
      });
      return num;
    },
    getTotalPrice() {
      let total = 0;
      this.$store.getters.getShopCar.forEach(item => {
        total += item.num * item.price + 4;
      });
      return total.toFixed(2);
    }
  }
};
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
#index-content {
  height: 100%;
  #header {
    width: 100%;
    height: 155px;
    position: relative;
    #content {
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      position: absolute;
      top: 0;
      width: 100%;
      height: 115px;
      padding: 20px 0;
      color: white;
      flex: 1;
      .logo {
        margin-left: 20px;
      }
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
          right: 15px;
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
        margin-right: 15px;
      }
      .van-image {
        margin: 0 5px 0 20px;
      }
    }
  }
  .nav {
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    a {
      color: #5b5f6a;
    }
    .active {
      color: #ec372f;
    }
  }
  #shopCar_content {
    border-top: 1px solid #000;
    width: 100%;
    max-height: 200px;
    background: white;
    position: fixed;
    bottom: 55px;
    z-index: 900;
    overflow: auto;
  }
  #footer {
    width: 100%;
    height: 55px;
    background: #131d26;
    position: fixed;
    z-index: 1000;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #919396;
    .shopActive {
      color: orange;
    }
    .round{
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #131D26;
      bottom: 10px;
      left: 30px;
      .iconfont {
      position: absolute;
      top: 20px;
      left: 20px;
    }
    }
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .price {
        font-size: 20px;
        font-weight: bold;
        margin-left: 30px;
        padding-right: 10px;
        border-right: 1px solid #1f282f;
      }
      .msg {
        padding-left: 10px;
        font-size: 12px;
      }
    }
    .right {
      width: 110px;
      text-align: center;
      line-height: 55px;
      background: #2b343b;
      font-weight: bold;
    }
  }
  .wrapper {
    // height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 10px 50px 10px;
    .close {
      position: absolute;
      color: white;
      font-size: 50px;
      bottom: -50px;
    }
    .name {
      color: white;
      font-size: 18px;
      font-weight: bold;
    }
    .van-rate {
      margin: 20px 0 25px 0;
    }
    .divider_msg {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      span {
        display: block;
        margin: 0 10px;
        width: 30%;
        border: 0.5px solid #b9bcbd;
      }
    }
    .reduced {
      width: 100%;
      margin-bottom: 20px;
      .sup {
        margin-left: 60px;
        color: #b9bcbd;
        line-height: 35px;
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }
    .notice {
      width: 100%;
      .msg {
        padding: 0 50px;
        color: #b9bcbd;
      }
    }
  }
}
</style>