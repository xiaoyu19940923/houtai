<template>
  <el-form :model="adminForm" ref="adminForm" :rules="rules" class="cotainer">
    <h3>小六后台管理系统{{$store.state.admin.adminName}}</h3>
    <el-form-item prop="adminName">
      <el-input v-model="adminForm.adminName" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="passWord">
      <el-input v-model="adminForm.passWord" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm('adminForm')" :loading="$store.state.isLoading" style="width:100%;" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  name: "login",
  data() {
    return {
      adminForm: {
        adminName: "",
        passWord: ""
      },
      // 规则
      rules: {
        adminName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
     submitForm() {
      //   表单验证
      this.$refs.adminForm.validate(async valid => {
          if(valid){
            //   发送请求登录
              this.isLoading = true;
              const data = await this.$store.dispatch("login",this.adminForm)
              console.log(data)
              if(data.ok===1){
            // 成功  成功调用一下CHANGE_LOGIN_INFO
            this.$store.commit("CHANGE_LOGIN_INFO",data)
        }else{
            // 失败
            this.$message.error(data.msg)
        }

        
          }else{
              this.$message.error("小六给你提示请输入合法的信息")
          }
        // console.log(valid);
      });
    }
  }

};
</script>


<style lang="less">
.cotainer {
  border: 1px solid #eaeaea;
  margin: 200px auto;
  width: 350px;
  padding: 10px 20px;

  h3 {
    text-align: center;
  }
}
</style>