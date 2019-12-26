<template>
  <div class="home">
    <EleHeader></EleHeader>
    <Search></Search>
    <!--轮播图-->

    <!-- 分类 -->

    <mt-swipe style="height:47.2vw;" :auto="4000">
      <mt-swipe-item class="entries" v-for="(item,index) in shopTypeList" :key="index">
        <div class="entry_wrap" v-for="infoList in item" :key="infoList._id">
          <div class="foodentry">
            <div class="img_wrap">
              <img :src="'/ele/'+infoList.shopTypePic" />
            </div>
            <span>{{infoList.shopTypeName}}</span>
          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>

    <!-- 推荐商家 -->

    <div class="shoplist-title">推荐商家</div>

    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div v-for="item in shopList" class="index-container" :key="item._id">
        <div class="index-shopInfo">
          <!-- 左侧图片 -->
          <div class="logo_container">
            <img :src="'/ele/'+item.shopPic" />
          </div>
          <!-- 右侧内容 -->
          <div class="index_main">
            <!-- 第一行 品牌 -->
            <div class="index_shopname">
              <i>品牌</i>
              <span>{{item.shopName}}</span>
            </div>

            <!-- 第二行 星级 -->
            <div class="index-rateWrap">
              <div>
                <span>月售12单</span>
              </div>
              <div class="delivery">
                <span class="icon-hollow">蜂鸟专送</span>
              </div>
            </div>

            <!-- 第三行 配送 -->
            <div class="index-moneylimit">
              <div>
                <span>¥20起送</span>
                |
                <span>配送费¥5</span>
              </div>
              <div class="index-distanceWrap">
                <span>1.5km</span>
                |
                <span>10分钟</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "home",
  data() {
    return {
      shopTypeList: [],
      pageIndex: 1,
      shopList:[],
      allLoaded:false,
    

    };
  },
  methods: {
    loadTop() {
       this.getShopList().then(data=>{
          // console.log(data);
          this.$refs.loadmore.onTopLoaded();

       })
      // console.log(111111111);
    },
    loadBottom(){
      // 上拉加载      
      // console.log(22222222);
      this.getShopList().then(data=>{
        // 合并数据
        this.shopList = [
          ...this.shopList,
          ...data.shopList
        ];
        if(data.pageSum===this.pageIndex){
          this.allLoaded = true
        }else{
          this.pageIndex++;
        }
        if(this.$refs.loadmore){
          this.$refs.loadmore.onBottomLoaded();
        }

        
      })
    },

    async getShopList() {
      const data = await this.$axios.get("/shopList", {
        params: {
          pageIndex: this.pageIndex
        }
      });
      // this.shopList = data.shopList;
      console.log(data);

      return data;
    }
  },
  components: {
    EleHeader: () => import("../components/Home/EleHeader"),
    Search: () => import("../components/Home/Search")
  },

  async mounted() {

    Toast({
      message: "小六操作成功",
      iconClass: "icon icon-success"
    });
    const data = await this.$axios.get("/shopTypeList", {
      params: {
        limit: 30
      }
    });
    this.shopTypeList = data.shopTypeList;
    console.log(data);
  }
};
</script>



<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}
/* 商家列表 */
.index-container {
  background: #fff;
  color: #666;
  padding: 4vw 0;
  border-bottom: 0.133333vw solid #eee;
}
.index-shopInfo {
  display: flex;
  justify-content: flex-start;
  padding: 0 2.666667vw;
  align-items: stretch;
}
.logo_container {
  width: 17.333333vw;
  height: 17.333333vw;
}
.logo_container img {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
  border-radius: 0.533333vw;
}
.index_main {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-direction: column;
  padding-left: 2.666667vw;
  font-size: 0.2rem;
  flex-grow: 1;
}
.index_shopname {
  align-items: center;
  color: #333;
  font-weight: 700;
  font-size: 0.9rem;
}
.index_shopname i {
  background: #ffe800;
  margin-right: 1.333333vw;
  padding: 0.266667vw 0.666667vw;
  text-align: center;
  white-space: nowrap;
  font-size: 0.6rem;
}
.index_shopname span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index-rateWrap {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}

.index-rateWrap .rate {
  margin-right: 1.066667vw;
}
.index-moneylimit {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.index-moneylimit .index-distanceWrap {
  color: #999;
}
.delivery {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  margin-left: 1.066667vw;
}
.delivery .icon-hollow {
  color: #fff;
  background-color: #2395ff;
  padding: 2px;
  box-sizing: border-box;
}
</style>