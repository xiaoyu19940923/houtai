import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import My from '../views/My.vue'
import Order from '../views/Order.vue'
import Discover from '../views/Discover.vue'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Location from '../views/Location.vue'
import SearchShop from "../views/SearchShop.vue"
import ShopDetail from "../views/shopDetail.vue"

Vue.use(VueRouter)

const routes = [
    {
      path:"/login",
      name:"login",
      component:Login
    },{
      path:"/searchshop",
      name:"searchshop",
      component:SearchShop
    },{
        path:"/shopDetail",
        name:"shopDetail",
        component:ShopDetail
    },
    {
      path:"/location",
      name:"location",
      component:Location,
      meta:{
        isAlive:true
      }
    },
    {
      path:"/",
      name:"index",
      component:Index,
      children:[
        {
          path:"/",
          name:"home",
          component:Home
        },
        {
          path:"/order",
          name:"order",
          component:Order
        },
        {
          path:"/my",
          name:"my",
          component:My,
          meta:{
            isAuthor:true
          }
        }
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass:"is-selected",
  routes
})

export default router
