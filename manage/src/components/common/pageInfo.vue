<template>
        <!-- 分页 -->
    <div class="toolbar">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-count="$store.state.pageSum"
                    :current-page="$store.state.pageIndex"
                    @current-change="pageIndex=>{$store.dispatch(actionsName,{
                        ...{pageIndex},
                        ...query
                    })}"
                   >
            </el-pagination>
        </div>
</template>

<script>
export default {
    name:"pageinfo",
    props:{
        actionsName:{
            type:String,
            default:""
        },
        query:{
            // 设置的类型是一个对象或数组，那需要默认值通过工厂模式进行生产
            type:Object,
            default:()=>{return {}}
        },
    },

 
    mounted() {

        this.$store.dispatch(this.actionsName,this.query);
    },
}
</script>

<style lang="">
    
</style>