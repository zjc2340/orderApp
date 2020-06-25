import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    goodsList: [],
    foodDetail:{}
  },
  mutations: {
    getgoodsList(state, val) {
      store.state.goodsList = val
    },
    changeNum(state, numObj) {
      for (const obj of store.state.goodsList) {
        for (const child of obj.foods) {
          if (child.id == numObj.id) {
            child.num += numObj.num
            return
          }
        }
      }
    },
    getfoodDetail(state,val){
      for (const obj of store.state.goodsList) {
        for (const child of obj.foods) {
          if (child.id == val) {
            store.state.foodDetail = child
            return 
          }
        }
      }
    }
  },
  actions: {},
  modules: {},
  getters: {
    getShopCar() {
      let arr = []
      for (const obj of store.state.goodsList) {
        for (const child of obj.foods) {
          if (child.num > 0) {
            arr.push(child)
          }
        }
      }
      return arr
    }
  }
})
export default store