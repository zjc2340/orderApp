import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from "../pages/index/Goods.vue"
Vue.use(VueRouter)
export default new VueRouter({
  routes:[{
    path: '/',
    name: "goods",
    component: Goods,
  },
  {
    path: '/evaluation',
    name: "evaluation",
    component: (reslove) => require(["../pages/index/Evaluation.vue"],reslove)
  },
  {
    path: '/merchant',
    name: "merchant",
    component: (reslove) => require(["../pages/index/Merchant.vue"],reslove)
  }]
})
// const routes = [{
//   path: '/',
//   name: "index",
//   component: Index,
// },{
//   path: '/goods',
//   name: "goods",
//   component: (reslove) => require(["../pages/index/Goods.vue"],reslove)
// },
// {
//   path: '/evaluation',
//   name: "valuation",
//   component: (reslove) => require(["../pages/index/Evaluation.vue"],reslove)
// },
// {
//   path: '/merchant',
//   name: "merchant",
//   component: (reslove) => require(["../pages/index/Merchant.vue"],reslove)
// }
// ]
// const router = new VueRouter({
//   routes
// })

// export default router