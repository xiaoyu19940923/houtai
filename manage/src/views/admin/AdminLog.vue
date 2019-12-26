<template>
    <div>
        <el-table 
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.admin.adminLog"
                style="width: 100%">
            <el-table-column label="ID" width="250">
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.loginTime | date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="管理员名称">
                <template slot-scope="scope">
                    {{scope.row.adminName}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- <el-button size="mini">编辑</el-button> -->
                    <!-- <el-button size="mini" type="danger" @click="deleteadminLog()">删除</el-button> -->
                    <Delete :_id="scope.row._id" actions-name="deleteAdminLog"></Delete>

                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
    <PageInfo actions-name="getAdminLog"></PageInfo>

    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "admin-log",
        data(){
           return {
               pageSum:1,
               pageIndex:1,
               adminLog:[]
           }
        },
        methods:{
            // getAdminLog(pageIndex= 1){
            //     this.$store.dispatch("getAdminLog",pageIndex)
            // }

            // async getAdminLog(pageIndex=1){
            //     const data= await axios.get("/adminLog",{
            //         params:{
            //             pageIndex
            //         }
            //     });
            //     this.adminLog = data.adminLog;
            //     this.pageIndex = data.pageIndex;
            //     this.pageSum = data.pageSum;
            // }
          

        },
        async mounted(){
            
            // this.getAdminLog();
            // this.$store.dispatch("getAdminLog");


            // const data = await this.$store.dispatch("getAdminLog");
            // console.log(this.$store.state.admin.adminLog);
        }
    }
</script>

<style scoped>

</style>