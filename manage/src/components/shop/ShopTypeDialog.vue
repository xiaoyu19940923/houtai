<template>
    <!-- <el-dialog title="添加店铺类别" :visible.sync="dialogFormVisible"> -->
    <el-dialog :title="title+'店铺类别'" :visible="visible" @update:visible="(bol)=>$emit('update:visible',bol)" >
      <el-form>
        <el-form-item label="店铺名称" label-width="120px">
          <el-input style="width:240px" v-model="shopTypeForm.shopTypeName" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传 图片 -->
        <el-form-item label="店铺图片" label-width="120px">
          <el-upload
            :on-success="success"
            name="shopTypePic" 
            :data="shopTypeForm"
            :headers="{
              authorization:$store.state.admin.token
            }"
            :file-list="fileList"
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
        <el-button @click="$emit('update:visible',false)">取 消</el-button>
        <el-button type="primary" @click="addShopType">{{title}}</el-button>
      </div>
    </el-dialog>
</template>


<script>
import axios from "axios";

export default {
    name:"shoptypedialog",
    props:{
        visible:{
          type:Boolean,
          default:false
        },
        shopTypeId:{
          type:String,
          default:""
        }
    },
    data() {
        return {
            fileList:[],
            dialogFormVisible:false,
            title:"添加",
            shopTypeForm:{
              shopTypeName:""
            }
        }
    },
    created() {
      if(this.shopTypeId.length>0){
        this.title = "修改";
      }
    },
    async mounted() {
        if(this.shopTypeId.length>0){
          // ajax 根据id获得店铺类别的详情
          const data = await axios.get("/getShopTypeById",{
            params:{
              shopTypeId :this.shopTypeId
            }
          })
          this.shopTypeForm.shopTypeName = data.shopTypeInfo.shopTypeName;
         
         this.$set(this.fileList,0,{
              name:data.shopTypeInfo.shopTypePic,
              url:"/ele/"+data.shopTypeInfo.shopTypePic
         })

         // this.fileList = [
          //   {
          //     name:data.shopTypeInfo.shopTypePic,
          //     url:"/ele/"+data.shopTypeInfo.shopTypePic
          //   }
          // ]
          console.log(data)
        }
        // console.log(11111,this.shopTypeId)
    },
    methods: {
        async addShopType(){
          if(this.shopTypeId.length>0){
            // 修改
            const formdata = new FormData();
            formdata.set("shopTypeId",this.shopTypeId)
            formdata.set("shopTypeName",this.shopTypeForm.shopTypeName)
            formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0])
            const data = await axios.put("/shopTypeList",formdata)
            if(data.ok === 1 ){
              this.success(data);
            }
            console.log(data);
          }else{
            // 添加
            this.$refs.upload.submit();
            // this.$store.dispatch("getShopTypeList");
          }
            
        },
        success(res){

          if(res.ok ===1){
            if(this.$route.name === "ShopTypeList"){
              this.$store.dispatch("getShopTypeList")
            }else{
              this.$router.push({name:"shopTypeList"})
            }
            
            this.$emit("update:visible",false)
          }
        }
    },
}
</script>


<style lang="">
    
</style>