import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Login from "./Login"
import axios from "axios";
import filters from "./filters"
// import  PageInfo from "../src/components/common/pageInfo.vue"



// 引入ui的主库文件
import ElementUI from 'element-ui';
// 引入样式
import 'element-ui/lib/theme-chalk/index.css';
import components from "./components"



Vue.config.productionTip = false;

// Vue.component("PageInfo",PageInfo)


Vue.use(components);

Vue.use(ElementUI);
Vue.use(filters);


// 使用请求拦截   config请求的配置项,该回调返回的值是你最终请求的配置
axios.interceptors.request.use(function(config){
  // 调用CHANGE_ISLOADING
  store.commit('CHANGE_ISLOADING',true);
  // 
  
  config.url ="/ele"+config.url+(config.url.includes("?")?"&":"?")+"t="+Date.now();

  config.headers = {
    authorization:store.state.admin.token
  }

  return config;
})
// 响应拦截，将返回的结果进行拦截,回调返回的是最终返回的内容  res最终返回的值
axios.interceptors.response.use(function({data}){
 
  store.commit('CHANGE_ISLOADING',false)
  if(data.ok===2){
      // 退出登录
      store.commit("OUT_LOGIN")
  }else{
    //访问接口成功
    if(data.pageIndex){
      store.commit("CHANGE_PAGE_INFO",data)
    }
    return data
  }
  
})

new Vue({
  router,
  store,
  render: function (h) { return h(this.$store.state.admin.token ? App : Login) }
}).$mount('#app')
