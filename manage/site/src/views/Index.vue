<template>
    <div class="index">

        <!-- <div class="home">
            <div class="header">
                <div class="address_map">
                    <i class="iconfont iconicon-dibiao"></i>
                    <span>北京千锋</span>
                    <i class="iconfont iconsanjiaojiantou1"></i>
                </div>
            </div>
            <div class="search_wrap">
                <div class="shop_search">
                    <i class="iconfont iconxingtaiduICON_sousuo&#45;&#45;"></i>
                    搜索饿了么商家 商品名称
                </div>
            </div>

        </div> -->
        <!--头部-->

        <router-view></router-view>
        <TabBar></TabBar>
    </div>
    <!--<div>-->
        <!--<span class="iconfont iconicon-test2"></span>-->
        <!--<router-view></router-view>-->
        <!--<nav>-->
            <!--<router-link to="/">首页</router-link>|-->
            <!--<router-link to="/order">订单</router-link>|-->
            <!--<router-link to="/my">我的</router-link>-->
        <!--</nav>-->
    <!--</div>-->
</template>

<script>
    export default {
        name: "index",
        components:{
            TabBar:()=>import("@/components/TabBar")
        }
    }
</script>

<style scoped>

    .index {
        width: 100%;
        height: calc(100% - 45px);
    }


    /****************首页*******************************************/
    .home {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
    }
    .header,
    .search_wrap {
        background-color: #009eef;
        padding: 10px 16px;
    }
    .header .address_map {
        color: #fff;
        font-weight: bold;
    }
    .address_map i {
        margin: 0 3px;
        font-size: 18px;
    }
    .address_map span {
        display: inline-block;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .search_wrap .shop_search {
        /* margin-top: 10px; */
        background-color: #fff;
        padding: 10px 0;
        border-radius: 4px;
        text-align: center;
        color: #aaa;
    }

    .search_wrap {
        position: sticky;
        top: 0px;
        z-index: 999;
        box-sizing: border-box;
    }

    .fixedview {
        width: 100%;
        position: fixed;
        top: 0px;
        z-index: 999;
    }

</style>