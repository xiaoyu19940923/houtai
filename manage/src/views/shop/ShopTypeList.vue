<template>
  <div>
    <div class="toolbar">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="店铺类别名称">
          <el-input v-model="shopTypeName" placeholder="店铺类别名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="$store.dispatch('getShopTypeList',{shopTypeName})" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="shopTypeId='';isShopType=true">添加店铺类别</el-button>
        </el-form-item>
      </el-form>
    </div>

       <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.shop.shopTypeList"
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
            <el-table-column label="店铺类别名称">
                <template slot-scope="scope">
                    {{scope.row.shopTypeName}}
                </template>
            </el-table-column>

            <el-table-column label="店铺类别图片">
                <template slot-scope="scope">
                    <img style="width:50px" :src="'/ele/'+scope.row.shopTypePic" alt="">
                </template>
            </el-table-column>



            <el-table-column label="操作" width="400">
                <template slot-scope="scope">
                    <el-button @click="$router.push({name:'ShopList',params:{shopTypeId:scope.row._id}})" size="mini" type="success" >查看该类别下的店铺</el-button>
                    <el-button @click="shopTypeId=scope.row._id;shopListVisible=true" size="mini" type="success" >添加店铺</el-button>
                    <el-button @click="shopTypeId=scope.row._id;isShopType=true" size="mini" type="danger" >修改</el-button>
                    <!-- <el-button size="mini" type="danger" >删除</el-button> -->
                    <Delete :_id="scope.row._id" actions-name="deleteShopTypeList"></Delete>

                </template>
            </el-table-column>
        </el-table>





    <PageInfo :query="{shopTypeName}" actions-name="getShopTypeList"></PageInfo>
    
  <ShopListDialog :shop-type-id="shopTypeId" v-if="shopListVisible" :shop-list-visible.sync="shopListVisible"></ShopListDialog>


  <ShopTypeDialog :shop-type-id="shopTypeId" v-if="isShopType" :visible.sync="isShopType"></ShopTypeDialog>




    <!-- 弹框 -->
    <!-- <el-dialog title="添加店铺类别" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="店铺名称" label-width="120px">
          <el-input style="width:240px" v-model="shopTypeForm.shopTypeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺图片" label-width="120px">
          <el-upload
            name="shopTypePic" 
            :data="shopTypeForm"
            ref="upload"
            class="upload-demo" 
            :auto-upload="false"
            action="/ele/shopType" 
            :limit="1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addShopType">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>


<script>  
export default {
  name: "shoptypelist",
  data() {
    return {
      isShopType:false,
      shopListVisible:false,
      shopTypeId:"",
      shopTypeName:""
    }
  },
  methods: {
    addShopType(){
      this.isShopType= true;
      setTimeout(()=>{
          this.$refs.shopTypeDialog.dialogFormVisible = true;
      },100)
          // this.$refs.shopTypeDialog=true
     
     
    }
  },
  // data() {
  //   return {
  //     shopTypeForm:{
  //       shopTypeName:""
  //     },
  //     dialogFormVisible: false
  //   };
  // },
  // methods: {
  //     addShopType(){
  //         this.$refs.upload.submit();
  //     }
  // },
};
</script>

<style lang="">
</style>