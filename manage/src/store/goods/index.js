import axios from "axios";

const actions = {
    async addGoodsTypeList({},params){
       const data=  await axios.post("/goodsTypeList",params)
    },

}


export default {
    actions
}