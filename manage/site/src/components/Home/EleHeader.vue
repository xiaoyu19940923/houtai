<template>
 
    <div class="header">
      <div class="address_map" @click="$router.push('/location')">
        <i class="iconfont iconicon-dibiao"></i>
        <span>{{$store.state.location.formattedAddress}}</span>
        <i class="iconfont iconsanjiaojiantou1"></i>
      </div>
  </div>
</template>


<script>
export default {
  name: "ele-header",
  mounted() {
    this.$store.dispatch("geolocation")
  },







//   data() {
//     // return {
//     //   formattedAddress:"定位中...",

//     // }
//   },
//   mounted() {
//     // console.log(AMap)

//     // const _this = this;
//     // AMap.plugin('AMap.Geolocation', function() {
// //   var geolocation = new AMap.Geolocation({
// //     // 是否使用高精度定位，默认：true
// //     enableHighAccuracy: true,
// //     // 设置定位超时时间，默认：无穷大
// //     timeout: 10000,
   
// //   })

// //   geolocation.getCurrentPosition()
// //   AMap.event.addListener(geolocation, 'complete', onComplete)
// //   AMap.event.addListener(geolocation, 'error', onError)

// //   function onComplete (data) {
// //     // data是具体的定位信息
// //     console.log(1111,data);
// //     _this.formattedAddress = data.formattedAddress;
// //   }

// //   function onError (data) {
// //     // 定位出错
// //     console.log(2222,data);
// //   }
// // }) 
//   }
  
}

</script>


<style scoped>
.header,
.search_wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
</style>