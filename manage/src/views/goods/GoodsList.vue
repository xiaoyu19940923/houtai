<template>
    <div>
         <div class="toolbar">
            <el-button @click="visible=true" type="success">添加商品</el-button>
        </div>
  



        <ShopDialog v-if="visible" :visible.sync="visible"></ShopDialog>

    </div>
</template>


<script>
export default {
    name:"goodslist",
    data() {
        return {
            visible:false
        }
    },
}
</script>


<style lang="">
    
</style>