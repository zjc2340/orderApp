<template>
  <div id="goods_content">
    <ul class="menu">
      <div>
        <li
          :class="{menuActive:currentIndex==index}"
          v-for="(item,index) in getGoodsList"
          :key="index"
          @click="clickMenu(index)"
          ref="menuList"
        >{{item.name}}</li>
      </div>
    </ul>
    <ul class="itemList">
      <div>
        <li class="foods_li" :id="index" v-for="(item,index) in getGoodsList" :key="index">
          <h4>{{item.name}}</h4>
          <ul class="foods_type">
            <li v-for="(food,i) in item.foods" :key="i">
              <img :src="food.imgUrl" alt  @click="food_details(food.id)"/>
              <div class="details">
                <p class="name" @click="food_details(food.id)">{{food.name}}</p>
                <!-- <p class="goodsDesc">{{food.goodsDesc}}</p> -->
                <p class="sellNum" @click="food_details(food.id)">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </p>
                <div class="price">
                  ￥
                  <span>{{food.price}}</span>
                  <div class="sub_add">
                    <div class="sub" v-show="food.num" @click="changeNum(-1,food.id)">-</div>
                    <div class="num" v-show="food.num">{{food.num}}</div>
                    <div class="add" @click="changeNum(1,food.id)">+</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </div>
    </ul>
    <van-overlay :show="show">
      <div class="food_details">
        <span class="back" @click="show = false">X</span>
        <img :src="getfoodDetails.imgUrl" alt width="100%" height="250px" />
        <div class="details">
          <h3 class="name">{{getfoodDetails.name}}</h3>
          <p class="sellNum">
            <span>月售{{getfoodDetails.sellCount}}份</span>
            <span>好评率{{getfoodDetails.rating}}%</span>
          </p>
          <div class="price">
            ￥
            <span>{{getfoodDetails.price}}</span>
            <div class="sub_add">
              <div
                class="sub"
                v-show="getfoodDetails.num"
                @click="changeNum(-1,getfoodDetails.id)"
              >-</div>
              <div class="num" v-show="getfoodDetails.num">{{getfoodDetails.num}}</div>
              <div class="add" @click="changeNum(1,getfoodDetails.id)">+</div>
            </div>
          </div>
        </div>
        <div class="introduce">
          <h3 class="name">商品介绍</h3>
          <p class="goodsDesc">{{getfoodDetails.goodsDesc}}</p>
        </div>
        <div id="ratings">
          <!-- 满意度 -->
          <div class="satis">
            <van-button color="#00A0DC">
              全部
              <span>{{all_satis}}</span>
            </van-button>
            <van-button color="#CCECF7">
              满意
              <span>{{satis}}</span>
            </van-button>
            <van-button color="#EAEBED">
              不满意
              <span>{{no_satis}}</span>
            </van-button>
          </div>
          <!-- 根据有没有评价内容查看评价列表 -->
          <div class="check">
            <van-checkbox v-model="checked" @click="check">只看有内容的评价</van-checkbox>
          </div>
          <ul class="ratings">
            <li class="ratings_single" v-for="(item,index) in getfoodDetails.ratings" :key="index">
              <div class="right">
                <div class="name_time">
                  <span class="time">{{item.rateTime}}</span>
                  <p class="name">
                    {{item.username}}
                    <van-image round width="2.5rem" height="2.5rem" :src="item.avatar" />
                  </p>
                </div>
                <p class="last">
                  <van-icon
                    class="iconfont"
                    class-prefix="icon"
                    :name="item.score>=4?'good':'bad-fill'"
                  />
                  {{item.text}}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </van-overlay>
    <div class="goods_footer"></div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import "../../assets/styles/icon.css";
import { API_GOODS_LIST, SERVEIP } from "../../api/apis";
export default {
  data() {
    return {
      all_satis: 0,
      satis: 0,
      no_satis: 0,
      checked: false,
      show: false,
      food_num: null,
      active: 0,
      items: [],
      minNum: 0,
      currentIndex: 0
    };
  },
  methods: {
    check() {
      if (this.checked) {
        this.getfoodDetails.ratings = this.getfoodDetails.ratings.filter(item => {
          return item.text != "";
        });
      }else {
        this.getfoodDetails.ratings = this.getfoodDetails.ratings.filter(item => {
          return item.text == ""||item.text != "";
        });
      }
    },
    // 加减商品数量
    changeNum(num, id) {
      this.$store.commit("changeNum", { num, id });
    },
    // 点击树菜单
    clickMenu(index) {
      this.currentIndex = index;
      // console.log(name);
      this.itemList.scrollToElement(document.getElementById(index), 1000);
    },
    // 点击商品
    food_details(id) {
      this.show = true;
      this.$store.commit("getfoodDetail", id);
      this.satis = 0;
      this.no_satis = 0;
      this.all_satis = 0;
      this.getfoodDetails.ratings.forEach((item,index) => {
        if (item.score >= 4) {
          this.satis++;
        } else {
          this.no_satis++;
        }
        this.all_satis++;
        this.getfoodDetails.ratings[index].rateTime = JSON.stringify(new Date(item.rateTime))
            .toString()
            .substr(1, 19)
            .replace("T", " ");
      });
    },
    getList() {
      API_GOODS_LIST().then(res => {
        let arr = res.data.goodsList;
        arr.map(item => {
          item.foods.forEach(obj => {
            obj.num = 0;
            obj.imgUrl = obj.imgUrl.replace("http://127.0.0.1:5000", SERVEIP);
          });
        });
        this.$store.commit("getgoodsList", arr);
      });
    }
  },
  created() {
    this.getList();
  },
  mounted() {
    this.menu = new BScroll(".menu", { click: true });
    this.itemList = new BScroll(".itemList", { click: true, probeType: 3 });
    this.itemList.on("scroll", obj => {
      let _y = Math.abs(obj.y);
      for (const obj of this.getHight) {
        if (_y >= obj.min && _y < obj.max) {
          this.currentIndex = obj.index;
          break;
        }
      }
    });
  },
  computed: {
    getHight() {
      let arr = [];
      let totalHeight = 0;
      for (let i = 0; i < this.getGoodsList.length; i++) {
        let iHeight = document.getElementById(i).offsetHeight;
        arr.push({ index: i, min: totalHeight, max: iHeight + totalHeight });
        totalHeight += iHeight;
      }
      return arr;
    },
    getGoodsList() {
      return this.$store.state.goodsList;
    },
    getfoodDetails() {
      return this.$store.state.foodDetail;
    }
  }
};
</script>

<style lang="scss" scoped>
#goods_content {
  flex: 1;
  display: flex;
  // height: calc(100% - 55px);
  height: 100%;
  width: 100%;
  margin-bottom: 55px;
  overflow: hidden;
  position: absolute;
  .menu {
    width: 100px;
    height: 100%;
    background: #f4f5f7;
    overflow-y: scroll;
    li {
      display: inline-block;
      width: 70px;
      padding: 20px 15px;
      border-bottom: 1px solid #e8e9eb;
      font-size: 12px;
      color: #333b43;
      position: relative;
    }
    .menuActive {
      background: white;
      color: black;
      font-weight: bold;
    }
  }
  .itemList {
    height: 100%;
    background: #f4f5f7;
    overflow: auto;
    flex: 1;
    h4 {
      border-left: 2px solid #a2a2a3;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
    }
    .foods_type {
      li {
        position: relative;
        height: 70px;
        padding: 20px 20px;
        background: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        .van-stepper {
          position: absolute;
          right: 10px;
          bottom: 20px;
        }
        img {
          width: 70px;
          height: 70px;
          margin-right: 10px;
        }
        .details {
          width: 100%;
          .name {
            font-size: 16px;
            font-weight: bold;
          }
          .sellNum {
            margin-bottom: 5px;
            font-size: 13px;
            span {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  .price {
    width: 100%;
    color: red;
    display: flex;
    align-items: center;
    position: relative;
    span {
      font-size: 18px;
      font-weight: bold;
    }
    .sub_add {
      display: flex;
      position: absolute;
      align-items: center;
      right: 0;
      font-size: 25px;
      .sub,
      .add {
        display: block;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        border-radius: 50%;
        color: white;
        background: orange;
      }
      .num {
        margin: 0 5px;
      }
    }
  }
  .food_details {
    background: #f4f5f7;
    height: 100%;
    position: relative;
    overflow: auto;
    .back {
      position: absolute;
      top: 10px;
      right: 20px;
      color: red;
      font-size: 20px;
    }
    .details {
      border-bottom: 1px solid #ebeced;
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      .name {
        font-size: 20px;
        font-weight: bold;
      }
      .sellNum {
        color: #bbbfc2;
        margin-bottom: 20px;
        span {
          margin-right: 10px;
        }
      }
    }
    .introduce {
      border-bottom: 1px solid #ebeced;
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      .name {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .goodsDesc {
        color: #bbbfc2;
      }
    }
    #ratings {
      background: white;
      .satis {
        padding: 15px 0;
        margin: 0 15px;
        border-bottom: 1px solid #f9f9f9;
        .van-button {
          margin-right: 15px;
        }
        * {
          color: black;
        }
      }
      .check {
        padding: 15px;
        border-bottom: 1px solid #ebebed;
      }
      .ratings {
        height: 100vh;
        .ratings_single {
          margin: 0 15px;
          height: 110px;
          padding: 15px 0;
          position: relative;
          border-bottom: 1px solid #f3f3f3;
          // .van-image {
          //   position: absolute;
          //   top: 15px;
          //   right: 0px;
          // }
          .right {
            // margin-left: 30px;
            .name_time {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .time {
                color: #c9cbce;
                font-size: 14px;
              }
              .name{
                display: flex;
                align-items: center;
                .van-image{
                  margin-left: 10px;
                }
              }
            }
            .score {
              display: flex;
              align-items: center;
              .van-rate {
                margin-right: 10px;
              }
              .deliveryTime {
                color: #c9cbce;
                font-size: 14px;
              }
            }
            .last {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
  // .goods_footer{
  //   height: 55px;
  // }
}
// .van-sidebar-item--select::before {
//   background-color: #fff;
// }
</style>