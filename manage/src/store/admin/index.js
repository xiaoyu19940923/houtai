import axios from "axios";
import bus from "../../bug";

const state = {
    adminName:localStorage.adminName, // 管理员名字
    // adminId:"",  //管理员id
    token:localStorage.token,

    adminLog:[],
    pageIndex:1,
    pageSum:1

}
// 负责跟新登录信息的
const mutations = {
    CHANGE_LOGIN_INFO(state,info){
        state.adminName =localStorage.adminName=info.adminName;
        state.token =localStorage.token=info.token;
    },
    // 退出登录
    OUT_LOGIN(state){
        localStorage.clear();
        state.adminName = state.token = null;
    },
    //  更改管理员日志                adminLog要更改的参数
    CHANGE_ADMIN_LOG(state,adminLog){
        state.adminLog = adminLog;
        // state.pageIndex = info.pageIndex;
        // state.pageSum = info.pageSum;


    }
}

const actions = {


    async login({commit},params){
        const data = await axios.post("/login",params)
        return data;
    },
    async getAdminLog({commit},query= {}){
        const {pageIndex=1} = query;
        // 调用的接口
        const data = await axios.get("/adminLog",{
            params:{
                pageIndex
            }
        });
        commit("CHANGE_ADMIN_LOG",data.adminLog);
        // 修改当前页与总页数
        // commit("CHANGE_PAGE_INFO",data)
        return data;
    },

    // 删除
    async deleteAdminLog({dispatch},query){
        const {id,pageIndex=1} = query;
        const data = await axios.delete("/adminLog/"+id);
        dispatch("getAdminLog",{pageIndex})
    }





    // async login({commit},params){
    //     const data = await axios.post("/login",params)
    //     if(data.ok===1){
    //         // 成功  成功调用一下CHANGE_LOGIN_INFO
    //         commit("CHANGE_LOGIN_INFO",data)
    //     }else{
    //         // 失败
    //         bus.$message.error("小六给你提示请输入合法的信息")
    //     }
    //     console.log(data);
    // }








    // async login({commit},_this){
    //     const data = await axios.post("/login",_this.adminForm)
    //     if(data.ok===1){
    //         // 成功  成功调用一下CHANGE_LOGIN_INFO
    //         commit("CHANGE_LOGIN_INFO",data)
    //     }else{
    //         // 失败
    //         _this.$message.error("小六给你提示请输入合法的信息")
    //     }
    //     console.log(data);
    // }
}


export default {
    state,
    actions,
    mutations
}