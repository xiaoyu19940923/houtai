import Vue from 'vue'
import Vuex from 'vuex'
import admin from "./admin"
import shop from "./shop"
import goods from "./goods"

Vue.use(Vuex)

const state = {
  isLoading :false, //是否加载
  pageIndex:1,
  pageSum:1
}
const mutations = {
  CHANGE_ISLOADING(state,bol){
    state.isLoading = bol;
  },
  CHANGE_PAGE_INFO(state,{pageSum,pageIndex}){
    state.pageIndex = pageIndex;
    state.pageSum = pageSum
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {
  },
  modules: {
    admin,
    shop,
    goods
  }
})
