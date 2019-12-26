<template>
  <div>
    <div>


      <el-dialog title="商品" :visible="visible" @update:visible="bol=>$emit('update:visible',bol)">
        <el-form >
          <el-form-item label="商品名称：" label-width="120px">
            <el-input  autocomplete="off" v-model="goodsTypeForm.goodsTypeName" style="width:240px;"></el-input>
          </el-form-item>


          <el-form-item label="活动区域" label-width="100px">
            <el-select style="width:150px;"  v-model="goodsTypeForm.shopTypeId"
             @change="$store.dispatch('shopListByTypeId',goodsTypeForm.shpoTypeId)"
             ref="upload"  placeholder="请选择店铺类别">
            <el-option v-for="item in $store.state.shop.allShopTypeList" 
             :key="item._id"
             :value="item._id"
             :label="item.shopTypeName"
            ></el-option>
            </el-select>

            <el-select style="width:150px;"  v-model="goodsTypeForm.shopId" placeholder="请选择店铺">
                <el-option v-for="item in $store.state.shop.shopListByID" 
                :key="item._id"
                :value="item._id"
                :label="item.shopName"
                ></el-option>
            </el-select>


          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="$emit('update:visible',false)">取 消</el-button>
          <el-button type="primary" @click="shopDialog">提 交</el-button>
        </div>
      </el-dialog>


    </div>
  </div>
</template>


<script>
export default {
    name:"shopdialog",
    props:["visible","shopTypeId","shopId"],
  data() {
    return {
        goodsTypeForm:{
            goodsTypeName:"",
            shopTypeId:"",
            shopId:""
        }
    };
  },
  created() {
      if(this.shopTypeId){
          this.goodsTypeForm.shopTypeId = this.shopTypeId;
      }
      if(this.shopId){
          this.goodsTypeForm.shopId = this.shopId;
      }
  },
  methods: {
      shopDialog(){
          this.$refs.upload.submit();
      }
  },
  mounted(){
       if(this.$store.state.shop.allShopTypeList.length<1){
             this.$store.dispatch("getAllShopTypeList")
        }
        if(this.shopTypeId){
          this.$store.dispatch("getShopListByTypeId",this.shopTypeId);
        }
  }
};
</script>


<style lang="">
</style>