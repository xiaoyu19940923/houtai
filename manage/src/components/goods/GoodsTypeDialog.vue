<template>
   <el-dialog title="添加商品类别" :visible="visible" @update:visible="(bol)=>$emit('update:visible',bol)" >
      <el-form>
        <el-form-item label="商品类别名称" label-width="120px">
          <el-input style="width:240px" v-model="goodsTypeForm.goodsTypeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <el-form>
        <el-form-item label="商品所属店铺" label-width="120px">
            <el-select @change="goodsTypeForm.shopId='';$store.dispatch('getShopListByTypeId',goodsTypeForm.shopTypeId)" 
            v-model="goodsTypeForm.shopTypeId" placeholder="请选择店铺的类别">
                <el-option  
                v-for="item in $store.state.shop.allShopTypeList"
                 :key="item._id"
                 :value="item._id"
                 :label="item.shopTypeName"
                ></el-option>
            </el-select>
            <el-select v-model="goodsTypeForm.shopId" placeholder="请选择店铺">
                <el-option 
                v-for="item in $store.state.shop.shopListByID" 
                :key="item._id"
                :value="item._id"
                :label="item.shopName"
                ></el-option>
            </el-select>
        </el-form-item>
      </el-form>



      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible',false)">取 消</el-button>
        <el-button type="primary" @click="addGoodsTypeList">提 交</el-button>
      </div>
    </el-dialog>
</template>


<script>
export default {
    name:"goodstypedialog",
    props:["visible","shopTypeId","shopId"],

    data() {
        return {
            goodsTypeForm:{
                goodsTypeName:"",
                shopTypeId:"",
                shopId:"",

            }
        }
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
      addGoodsTypeList(){
        this.$store.dispatch("addGoodsTypeList",this.goodsTypeForm);
        this.$emit('update:visible',false)
      }
    },
    mounted() {
        if(this.$store.state.shop.allShopTypeList.length<1){
             this.$store.dispatch("getAllShopTypeList")
        }
        if(this.shopTypeId){
          this.$store.dispatch("getShopListByTypeId",this.shopTypeId);
        }
       
    },
}
</script>


<style lang="">
    
</style>