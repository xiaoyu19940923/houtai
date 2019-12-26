<template>
  <div id="app">

      <keep-alive include="location">
          <router-view></router-view>
      </keep-alive>


      <!-- <keep-alive>
        <router-view v-if="$route.meta.isAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.isAlive"></router-view> -->
  </div>
</template>

<style lang="less">
 #app {
        width: 100%;
        height: 100%;
        font-size: 14px;
        background: #f1f1f1;
    }

</style>
