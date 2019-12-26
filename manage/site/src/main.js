import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"


import "./assets/style/fonticon/iconfont.css"
import "./assets/style/reset.css"


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.config.productionTip = false

Vue.prototype.$axios = axios;

Vue.use(MintUI);

// 拦截
axios.interceptors.request.use(config=>{
  config.url= "/ele/"+config.url;
  return config;
})

axios.interceptors.response.use(({data})=>{
  return data;
})



// 全局守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.isAuthor){
    // 验证
    next("/login")
  }else{
    next();
  }
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
