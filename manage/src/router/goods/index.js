export default [
    {
        path:"/goodsList",
        name:"goodsList",
        component:()=>import("../../views/goods/GoodsList.vue")
    },
    {
        path:"/goodsTypeList",
        name:"goodsTypeList",
        component:()=>import("../../views/goods/GoodsTypeList.vue")
    },
]