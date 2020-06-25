<template>
  <div id="shopCar_content">
    <div class="header">
      <p>
        已选商品
        <span>(包装费￥{{this.package}})</span>
      </p>
      <p class="clear" @click="clear">
        <van-icon class="iconfont" class-prefix="icon" name="lajitong"/>清空购物车
      </p>
    </div>
    <div v-for="(item, index) in getShopCar" :key="index" class="foods">
      <img :src="item.imgUrl" alt />
      <div class="details">
        <p class="name">{{item.name}}</p>
        <div class="price">
          <div class="totalPrice">￥{{(item.price*item.num).toFixed(2)}}</div>
          <div class="sub_add">
            <div class="sub" v-show="item.num" @click="changeNum(-1,item.id)">-</div>
            <div class="num" v-show="item.num">{{item.num}}</div>
            <div class="add" @click="changeNum(1,item.id)">+</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
  computed: {
    getShopCar() {
      return this.$store.getters.getShopCar;
    },
    package(){
        let num = 0
        this.$store.getters.getShopCar.forEach(item=>{
            num+=item.num
        })
        return num
    },

  },
  methods: {
    // 加减商品数量
    changeNum(num, id) {
      this.$store.commit("changeNum", { num, id });
    },
    clear(){
        this.$store.getters.getShopCar.map(item=>{
          item.num = 0
        })
    }
  }
};
</script>

<style lang="scss">
#shopCar_content {
  .header {
    margin: 0 20px;
    padding: 10px 0;
    border-bottom: 2px solid #f4f5f7;
    display: flex;
    justify-content: space-between;
    span {
      color: red;
    }
  }
  .foods {
    margin: 20px;
    display: flex;
    overflow-y: scroll;
    img {
      width: 60px;
      height: 60px;
    }
    .details {
      width: 100%;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        align-items: center;
        display: flex;
        justify-content: space-between;
        .totalPrice {
          font-size: 20px;
          color: red;
        }
        .sub_add {
          display: flex;
          align-items: center;
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
            color: red;
          }
        }
      }
    }
  }
}
</style>