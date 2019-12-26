import axios from "axios"

const state= {
    shopTypeList:[],
    allShopTypeList:[],  //所有店铺类别信息
    shopList:[], //店铺的列表 分页
    shopListByID:[], 
    
};


const mutations = {
    CHANGE_SHOP_TYPE_LIST(state,shopTypeList){
        state.shopTypeList = shopTypeList;
    },
    CHANGE_ALL_SHOP_TYPE_LIST(state,shopTypeList){
        state.allShopTypeList = shopTypeList;
    },

    CHANGE_SHOP_LIST(state,shopList){
        state.shopList = shopList;
    },
    CHANGE_SHOP_LIST_BYID(state,shopList){
        state.shopListByID= shopList;
    }
}


const actions = {
    async getShopTypeList({commit},query = {}){
        const {pageIndex=1,shopTypeName=""} = query;
        const data = await axios.get("/shopTypeList?a=1",{
            params:{
                pageIndex,
                shopTypeName
            }
        })
        // console.log(data.shopTypeList)
        commit("CHANGE_SHOP_TYPE_LIST",data.shopTypeList)
    },

    async getAllShopTypeList({commit}){
        const data = await axios.get("/allShopTypeList");
        commit('CHANGE_ALL_SHOP_TYPE_LIST',data.shopTypeList)
    },

    async getShopList({commit},query={}){
        const {pageIndex=1,shopTypeId=""} =  query;
        // console.log(shopTypeId)
        const data =await axios.get("/shopList",{
            params:{
                pageIndex,
                shopTypeId
            }
        });
        commit('CHANGE_SHOP_LIST',data.shopList)
    },

    async getShopListByTypeId({commit},shopTypeId){
        const data =await axios.get("/shopListByTypeId/"+shopTypeId);
        commit("CHANGE_SHOP_LIST_BYID",data.shopList)
    },

    // 删除店铺类别名称
    async deleteShopTypeList({dispatch},query){
        const {id,pageIndex=1} = query;
        const data = await axios.delete("/shopTypeList/"+id);
        dispatch("getShopTypeList",{pageIndex})
    },
    // 删除店铺名称
    async deleteShopList({dispatch},query){
        const {id,pageIndex=1} = query;
        const data = await axios.delete("/shopList/"+id);
        dispatch("getShopList",pageIndex)
    }
}

export default {
    state,
    mutations,
    actions
}