<template>
    <el-button size="mini" type="danger" @click="open">删除</el-button>
</template>


<script>
export default {
    name:"delete",
    props:["_id","actionsName"],
    methods: {
      open() {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this._id)
          this.$store.dispatch(this.actionsName,{id:this._id,pageIndex:this.$store.state.pageIndex});
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
}
</script>


<style>


</style>