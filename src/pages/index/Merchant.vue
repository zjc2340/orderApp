<template>
  <div id="merchant">
    <!-- 店铺名+评分+销售数+收藏 -->
    <div class="introduce">
      <div class="left">
        <p class="name">{{merchantDatas.name}}</p>
        <p class="score_sellCount">
          <van-rate v-model="merchantDatas.score" disabled disabled-color="#fe9900" :size="20" />
          <span class="score">({{merchantDatas.score}})</span>
          <span>月售{{merchantDatas.sellCount}}单</span>
        </p>
      </div>
      <div class="right" @click="favorite = !favorite">
        <van-icon class="iconfont" class-prefix="icon" :name="favorite?'favorite':'no-favorite'" />
        <p class="text">{{favorite==true?"已收藏":"未收藏"}}</p>
      </div>
    </div>
    <!-- 起送价+配送价格+配送时间 -->
    <div class="delivery">
      <div class="minPrice">
        <p class="name">起送价</p>
        <p class="num">
          {{merchantDatas.minPrice}}
          <span>元</span>
        </p>
      </div>
      <div class="dlvPrice">
        <p class="name">商家配送</p>
        <p class="num">
          {{merchantDatas.deliveryPrice}}
          <span>元</span>
        </p>
      </div>
      <div class="dlvTime">
        <p class="name">平均配送时间</p>
        <p class="num">
          {{merchantDatas.deliveryTime}}
          <span>分钟</span>
        </p>
      </div>
    </div>
    <!-- 公告与活动 -->
    <div class="bul_spu">
      <div class="bul">
        <p class="name">公告与活动</p>
        <p class="details">{{merchantDatas.bulletin}}</p>
      </div>
      <ul class="spu">
        <li v-for="(item,index) in merchantDatas.supports" :key="index"><img :src="item.icon" alt="" width="20" height="20">{{item.msg}}</li>
        <li><img src="../../assets/images/invoice_1@2x.png" width="20" height="20">该商家支持开发票，请在下单时填写好发票抬头</li>
        <li class="last"><img src="../../assets/images/guarantee_1@2x.png" width="20" height="20">已加入"外卖保"计划，食品安全保障</li>
      </ul>
      <!--  -->
    </div>
    <!-- 商家实景 -->
    <div class="pics">
      <p>商家实景</p>
      <div class="person-wrap" ref="personWrap">
        <ul class="person-list" ref="personTab">
          <li class="person-item" v-for="(item,index) in merchantDatas.pics" :key="index">
            <img :src="item" alt width="100%" />
          </li>
        </ul>
      </div>
    </div>
    <!-- 商家信息 -->
    <div class="massage">
      <h3>商家信息</h3>
      <p>该商家支持开发票，请在下单时填写好发票抬头</p>
      <p>品类：其他菜系</p>
      <p>地址：</p>
      <p v-if="merchantDatas.date">营业时间：{{merchantDatas.date[0]}} — {{merchantDatas.date[1]}}</p>
    </div>
  </div>
</template>

<script>
import { API_SHOP_SELLER, SERVEIP } from "../../api/apis";
import BScroll from "better-scroll";
import "../../assets/styles/icon.css";
export default {
  data() {
    return {
      merchantDatas: {},
      favorite: true
    };
  },
  methods: {
    personScroll() {
      // 默认有六个li子元素，每个子元素的宽度为120px
      let width = 6 * 120;
      this.$refs.personTab.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  },
  created() {
    API_SHOP_SELLER().then(res => {
      this.merchantDatas = res.data.data;
      this.merchantDatas.date.map((item, index) => {
        this.merchantDatas.date[index] = item.substr(11);
      });
      this.merchantDatas.pics.forEach((item, index) => {
        this.merchantDatas.pics[index] = item.replace(
          "http://127.0.0.1:5000",
          SERVEIP
        );
      });
      let supImg = [
        require("../../assets/images/discount_1@2x.png"),
        require("../../assets/images/discount_1@2x.png"),
        require("../../assets/images/decrease_1@2x.png"),
        require("../../assets/images/discount_1@2x.png")
      ];
      this.merchantDatas.supports.map((item, index) => {
        this.merchantDatas.supports[index] = { icon: supImg[index], msg: item };
      });
    });
    this.$nextTick(() => {
      this.personScroll();
    });
  }
};
</script>

<style lang="scss" scoped>
$bgc: #fff;
#merchant {
  background: #f4f5f7;
  padding-bottom: 55px;
  .introduce {
    padding: 15px 20px;
    // margin: 0 20px;
    display: flex;
    background: $bgc;
    justify-content: space-between;
    border-bottom: 1px solid #f4f4f4;
    .left {
      .name {
        font-size: 20px;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .score_sellCount {
        display: flex;
        align-items: center;
        .score {
          margin: 0px 10px 0 10px;
        }
      }
    }
    .right {
      text-align: center;
    }
  }
  .delivery {
    background: $bgc;
    padding: 15px 40px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #e6e6e8;
    margin-bottom: 20px;
    .dlvPrice {
      border-left: 1px solid #f7f7f7;
      border-right: 1px solid #f7f7f7;
      padding: 0 30px;
      margin: 0 20px;
    }
    > div {
      text-align: center;

      .name {
        color: #aaadb0;
        font-size: 15px;
        margin-bottom: 5px;
      }
      .num {
        display: flex;
        align-items: flex-end;
        font-size: 30px;
        justify-content: center;
        span {
          margin-bottom: 3px;
          font-size: 14px;
          color: #84898f;
        }
      }
    }
  }
  .bul_spu {
    // padding: 20px 0;
    background: $bgc;
    .bul {
      margin: 0 15px;
      background: $bgc;
      border-bottom: 1px solid #e6e6e8;
      .name {
        font-size: 20px;
        font-weight: bold;
        padding-top: 20px;
      }
      .details {
        margin: 5px 20px 20px 20px;
        color: #f23e3f;
        line-height: 30px;
      }
    }
    .spu {
      li {
        padding: 20px 20px;
        margin: 0 15px;
        border-bottom: 1px solid #e6e6e8;
        display: flex;
        align-items: center;
        &:last-of-type {
          border: none;
        }
      }
    }
  }
  .pics {
    margin: 20px 0;
    padding: 20px 15px;
    background: $bgc;
    border-bottom: 1px solid #e6e6e8;
    border-top: 1px solid #e6e6e8;
    p {
      font-size: 20px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .person-wrap {
      overflow: hidden;
      .person-list {
        overflow: hidden;
        .person-item {
          touch-action: none;
          display: inline-block;
          height: 90px;
          width: 120px;
          margin-right: 10px;
          border: 1px solid #ccc;
        }
      }
    }
  }
  .massage {
    background: $bgc;
    //   padding: 20px 0;
    * {
      margin: 0 15px;
      padding: 20px 0;
      border-bottom: 1px solid #e6e6e8;
      &:last-child {
        border: none;
      }
    }
    h3 {
      font-size: 20px;
    }
    p {
      padding-left: 20px;
    }
  }
}
</style>