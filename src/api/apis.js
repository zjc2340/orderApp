import axios from "axios"
export const SERVEIP = "http://192.168.2.189:5000"
axios.defaults.baseURL = SERVEIP


// 获取商品数据
export const API_GOODS_LIST = ()=>axios.get("/goods/goods_list")
// 获取商家
export const API_SHOP_SELLER = ()=>axios.get("/shop/seller")
// 获取评价数据
export const API_SHOP_RATINGS = ()=>axios.get("/shop/ratings")