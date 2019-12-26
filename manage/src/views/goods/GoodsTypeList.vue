<template>
    <div>
        <div class="toolbar">
            <el-button @click="goodsTypeVisible=true" type="success">添加商品类别</el-button>
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
            <el-table-column label="商品类别名称">
                <template slot-scope="scope">
                    {{scope.row.shopTypeName}}
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

            <el-table-column label="操作" width="350">
                <template slot-scope="scope">
                    <el-button @click="$router.push({name:'ShopList',params:{shopTypeId:scope.row._id}})" size="mini" type="success" >查看该类别下的店铺</el-button>
                    <el-button @click="shopTypeId=scope.row._id;shopListVisible=true" size="mini" type="success" >添加店铺</el-button>
                    <el-button size="mini" type="danger" >删除</el-button>
                    
                </template>
            </el-table-column>
        </el-table>





        <GoodsTypeDialog v-if="goodsTypeVisible" :visible.sync="goodsTypeVisible"></GoodsTypeDialog>
    </div>

    
</template>


<script>
export default {
    name:"goodstypelist",
    data() {
        return {
            goodsTypeVisible:false
        }
    },
}
</script>


<style lang="">
    
</style>