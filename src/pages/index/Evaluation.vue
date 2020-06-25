<template class="body">
  <div id="evaluation_content">
    <div id="top">
      <div class="left">
        <h1>{{details.score}}</h1>
        <h4>综合评分</h4>
        <h5>高于周边商家69.2%</h5>
      </div>
      <div class="right">
        <p>
          <span>服务态度</span>
          <van-rate
            v-model="details.score"
            :size="15"
            allow-half
            void-color="#eee"
            disabled
            disabled-color="#fe9900"
          />
          <span class="top_score">{{details.score}}</span>
        </p>
        <p>
          <span>服务态度</span>
          <van-rate
            v-model="details.score"
            :size="15"
            allow-half
            void-color="#eee"
            disabled
            disabled-color="#fe9900"
          />
          <span class="top_score">{{details.score}}</span>
        </p>
        <p>
          <span>送达时间</span>
          <span class="top_time">{{details.deliveryTime}}分钟</span>
        </p>
      </div>
    </div>
    <div id="bottom">
      <!-- 满意度 -->
      <div class="satis">
        <van-button color="#00A0DC" @click="all_statis">
          全部
          <span>{{all_satis}}</span>
        </van-button>
        <van-button color="#CCECF7" @click="statis">
          满意
          <span>{{satis}}</span>
        </van-button>
        <van-button color="#EAEBED" @click="no_statis">
          不满意
          <span>{{no_satis}}</span>
        </van-button>
      </div>
      <!-- 根据有没有评价内容查看评价列表 -->
      <div class="check">
        <van-checkbox v-model="checked" @click="check">只看有内容的评价</van-checkbox>
      </div>
      <ul class="ratings">
        <li class="ratings_single" v-for="(item,index) in ratings" :key="index">
          <van-image round width="2.5rem" height="2.5rem" :src="item.avatar" />
          <div class="right">
            <p class="name_time">
              <span class="name">{{item.username}}</span>
              <span class="time">{{item.rateTime}}</span>
            </p>
            <p class="score">
              <van-rate v-model="item.score" disabled disabled-color="#fe9900" :size="15" />
              <span class="deliveryTime">{{item.deliveryTime}}</span>
            </p>
            <p class="msg">{{item.text}}</p>
            <p class="last">
              <van-icon
                class="iconfont"
                class-prefix="icon"
                :name="item.score>=4?'good':'bad-fill'"
              />
              <span v-for="(rec,index) in item.recommend" :key="index">{{rec}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { API_SHOP_RATINGS, API_SHOP_SELLER } from "../../api/apis";
import "../../assets/styles/icon.css";
export default {
  data() {
    return {
      checked: false,
      ratings: [],
      details: {},
      satis: 0, //满意数
      no_satis: 0, //不满意数
      all_satis: 0 //全部评价数
    };
  },
  methods: {
    // 获取全部评价信息
    getRatings() {
      API_SHOP_RATINGS().then(res => {
        this.ratings = res.data.data;
        // console.log(this.ratings);
        this.satis = 0
        this.no_satis = 0
        this.all_satis = 0
        this.ratings.forEach((item, index) => {
          // 获取全部、满意数和不满意数
          if (item.score >= 4) {
            this.satis++;
          } else {
            this.no_satis++;
          }
          this.all_satis++;
          // 时间戳转标准日期格式
          this.ratings[index].rateTime = JSON.stringify(new Date(item.rateTime))
            .toString()
            .substr(1, 19)
            .replace("T", " ");
          // 送达时间判断，没有送达时间就不显示
          if (this.ratings[index].deliveryTime) {
            this.ratings[index].deliveryTime = item.deliveryTime + "分钟送达";
          }
        });
      });
    },
    //   是否查看由内容的评价
    check() {
      if (this.checked) {
        this.ratings = this.ratings.filter(item => {
          return item.text != "";
        });
      }else this.getRatings()
    },
    // 全部评价
    all_statis(){
      this.getRatings()
    },
    // 满意评价
    statis(){
      this.ratings = this.ratings.filter(item => {
          return item.score >= 4;
      });
    },
    // 不满意评价
    no_statis(){
      this.ratings = this.ratings.filter(item => {
          return item.score < 4;
      });
    }
  },
  created() {
    this.getRatings();
    API_SHOP_SELLER().then(res => {
      this.details = res.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
#evaluation_content {
  background: #f4f5f7;
  
  #top {
    background: #fff;
    height: 65px;
    padding: 20px 0 30px 0;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebed;
    margin-bottom: 15px;
    .left {
      text-align: center;
      padding: 0 20px;
      border-right: 1px solid #f4f4f4;
      h1 {
        color: #fe9900;
      }
      h5 {
        margin-top: 5px;
        color: #d1d2d4;
      }
    }
    .right {
      padding-left: 20px;
      p {
        display: flex;
        align-items: center;
        margin-top: 8px;
        span {
          margin-right: 10px;
          &.top_time {
            color: #adb0b3;
          }
          &.top_score {
            color: #fe9900;
            margin-left: 10px;
          }
        }
      }
    }
  }
  #bottom {
    background: #ffffff;
    padding-bottom: 60px;
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
        padding: 15px 15px;
        position: relative;
        border-bottom: 1px solid #f3f3f3;
        .van-image {
          position: absolute;
          top: 15px;
          left: 0px;
        }
        .right {
          margin-left: 30px;
          .name_time {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .time {
              color: #c9cbce;
              font-size: 14px;
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
          .msg {
            font-size: 17px;
            margin: 3px 0;
          }
          .last {
            display: flex;
            align-items: center;
            span {
              display: inline-block;
              font-size: 10px;
              text-align: center;
              border: 1px solid #f3f3f3;
              padding: 2px 5px;
              width: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>