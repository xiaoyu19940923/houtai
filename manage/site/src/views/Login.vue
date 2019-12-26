<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/img/logo.png" alt="my login image">
        </div>
        <!-- 手机号 -->
        <div class="text_group">
            <div class="input_group" :class="{'is-invalid':!phoneIdVali}">
                <input type="input" ref="phoneId" placeholder="手机号">
            </div>
            <div v-show="!phoneIdVali" class="invalid-feedback">请输入手机号</div>
        </div>
        <!-- 验证码 -->
        <div class="text_group">
            <div class="input_group" :class="{'is-invalid':!phoneIdVali}">
                <input type="input" ref="code" placeholder="验证码">
                <button @click="getCode" :disabled="Number.isInteger(btnValue)">{{btnValue}}</button>
            </div>
            <div  v-show="!phoneIdVali" class="invalid-feedback">请输入验证码</div>
        </div>
        <div class="login_des">
            <p>
                新用户登录即自动注册，并表示已同意
                <span>《用户服务协议》</span>和<span>《隐私权政策》</span>
            </p>
        </div>
        <!-- 登录按钮 -->
        <div class="login_btn">
            <button>登录</button>
        </div>
    </div>

</template>
<script>
    export default {
        name: "login",
        data(){
            return {
                // 验证手机号是否符合要求
                phoneIdVali:true,
                btnValue:"获取验证码",

            }
        },
        methods:{
            async getCode(){
                // 发送验证码
                const  data = await this.$axios.get("/send",{
                    params:{
                        phoneId:this.$refs.phoneId.value
            }
        })
        if(data.ok ===1){
            this.$refs.code.value = data.code;
            this.btnValue = 300;
            const timer = setInterval(()=>{
                if(Number.isInteger(this.btnValue)){
                    this.btnValue--;
                    if(this.btnValue < 1){
                        this.btnValue = "获得验证码";
                        clearInterval(timer);
                    }
                }
                
            },1000)

        }else{
            alert(data.msg)
        }
        console.log(data);


     






                // this.phoneIdVali = false;
                // if(this.$refs.phoneId.value.length>0){
                //     this.phoneIdVali = true;
                //     const  data = await this.$axios.get("/send",{
                //         params:{
                //             phoneId:this.$refs.phoneId.value
                //         }
                //     })
                // }
            }
        }
    }
</script>

<style scoped>
    .login {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        background: #fff;
    }
    .logo {
        text-align: center;
    }
    .logo img {
        width: 150px;
    }
    .text_group,
    .login_des,
    .login_btn {
        margin-top: 20px;
    }
    .login_des {
        color: #aaa;
        line-height: 22px;
    }
    .login_des span {
        color: #4d90fe;
    }
    .login_btn button {
        width: 100%;
        height: 40px;
        background-color: #4cd96f;
        border-radius: 4px;
        color: white;
        font-size: 14px;
        border: none;
        outline: none;
    }
    .login_btn button[disabled] {
        background-color: #8bda81;
    }


    .input_group {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .input_group input {
        height: 100%;
        width: 60%;
        border:none;
        outline: none;
    }
    .input_group button {
        border: none;
        outline: none;
        background: #fff;
    }
    .input_group button[disabled] {
        color: #aaa;
    }
    .is-invalid {
        border: 1px solid red;
    }
    .invalid-feedback {
        color: red;
        padding-top: 5px;
    }
</style>