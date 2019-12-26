<template>
  <div>
    <div class="toolbar">

        <el-select v-model="shopTypeId" @change="$store.dispatch('getShopList',{shopTypeId})">
            <el-option v-for="item in $store.state.shop.allShopTypeList"
             :key="item._id"
             :value="item._id"
             :label="item.shopTypeName"
            ></el-option>
        </el-select>


        <el-button type="success" @click="isShopType=true">添加店铺类别</el-button>

        <el-button type="success" @click="shopListVisible=true">添加店铺</el-button>
    </div>
         <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.shop.shopList"
                style="width: 100%">
            <el-table-column label="ID" width="250">
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column
                    label="上传日期"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime | date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺名称">
                <template slot-scope="scope">
                    {{scope.row.shopName}}
                </template>
            </el-table-column>

            <el-table-column label="店铺类别名称">
                <template slot-scope="scope">
                    {{scope.row.shopTypeName}}
                </template>
            </el-table-column>

            <el-table-column label="店铺图片">
                <template slot-scope="scope">
                    <img style="width:50px" :src="'/ele/'+scope.row.shopPic" alt="">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button
                     @click="shopId=scope.row._id;shopTypeDialog=scope.row.shopTypeId;goodsTypeVisible=true"  size="mini" type="success" >添加商品类别</el-button>
                    <!-- <el-button size="mini" type="danger" >删除</el-button> -->
                    <Delete :_id="scope.row._id" actions-name="deleteShopList"></Delete>

                </template>
            </el-table-column>
        </el-table>



    <PageInfo :query="{shopTypeId}" actions-name="getShopList"></PageInfo>


    <GoodsTypeDialog :shop-id="shopId" :shop-type-id="shopTypeDialog" v-if="goodsTypeVisible" :visible.sync="goodsTypeVisible"></GoodsTypeDialog>

<!-- 
    <ShopListDialog @update:shop-list-visible="bol=>shopListVisible=bol" 
        :shop-list-visible="shopListVisible"></ShopListDialog> -->
    <ShopListDialog v-if="shopListVisible" :shop-list-visible.sync="shopListVisible"></ShopListDialog>

    <ShopTypeDialog ref="shopTypeDialog"></ShopTypeDialog>

  <ShopTypeDialog v-if="isShopType" :visible.sync="isShopType"></ShopTypeDialog>

  </div>
</template>


<script>
export default {
  name: "shoplist",
  methods: {
      fn(bol){
         this.shopListVisible = bol;
      }
  },
  data() {  
      return {
          shopListVisible:false,
          isShopType:false,
          shopTypeId:"",
          goodsTypeVisible:false,
          shopTypeDialog:"",
          shopId:"",

      }
  },
  created() {
      console.log(this.$route.params.shopTypeId);
      if(this.$route.params.shopTypeId){
           this.shopTypeId = this.$route.params.shopTypeId;
      }
  },

  mounted() {
      if(this.$store.state.shop.allShopTypeList.length<1){
          this.$store.dispatch("getAllShopTypeList")
      }
      
  },
};
</script>

<style lang="">
</style>