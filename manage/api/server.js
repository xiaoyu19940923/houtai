const express = require("express");
const db = require("./module/db");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const tools = require("./module/tools")
const {upPic} = require("./module/upPic")
const shopType = require("./module/shopType");

const app =express();



app.use(express.static(__dirname+"/upload"));

app.use(bodyParser.json());
let adminInfo= null;





// 登录
app.post("/login", async (req, res) => {
    const { adminName, passWord } = req.body;
    // 根据账号和密码进行登录，需要与数据库当中的文档进行匹配
    const results = await db.findOne("adminList", {
        adminName,
        passWord: tools.enMd5(passWord)
    })
    if (results) {
        // 插入
        await db.insertOne("adminLog", {
            adminId: results._id,
            adminName: results.adminName,
            loginTime: Date.now()
        })
        res.json({
            ok: 1,
            adminName: results.adminName,
            token: tools.encode({
                adminName: results.adminName
            })
        })
    } else {
        tools.json(res, -1, "账号或密码错误")
    }
    // console.log(req.body);

})

// 
// app.get("/adminLog", async function (req, res) {
//     // token 1、可以检验接口的来源是否正确
//             // 2、通过token进行传值
//         const deResult = tools.decode(req.headers.authorization);
//     if (deResult.ok === 3) {
//         const adminName = deResult.info.adminName;
//         let pageIndex = req.query.pageIndex / 1;
//         let pageSum = 1;
//         let limit = 5;
//         const count = await db.count("adminLog",{   
//             adminName
//         });
//         pageSum = Math.ceil(count / limit);
//         if (pageSum < 1) {
//             pageSum = 1
//         }
//         if (pageIndex > pageSum) {
//             pageIndex = pageSum
//         }
//         if (pageIndex < 1) {
//             pageIndex = 1
//         }

//         const adminLog = await db.find("adminLog", {
//             whereObj:{
//                 adminName
//             },
//             sortObj: {
//                 loginTime: -1
//             },
//             skip: (pageIndex - 1) * limit,
//             limit
//         })
//         // console.log(adminLog)
//            setTimeout(() => {
//         res.json({
//             ok: 1,
//             adminLog,
//             pageIndex,
//             pageSum
//         })
//     }, 100)
//     }else{
//         tools.json(res,2,"接口请求异常")
//     }
// })




app.all("*",function(req,res,next){
    // 验证token
    const deResult = tools.decode(req.headers.authorization);
    if(deResult.ok===3){
        adminInfo = deResult.info;
         next();
    }else{
        tools.json(res,2,"接口请求异常")
    }
})


app.get("/adminLog", async function (req, res) {

        const adminName = adminInfo.adminName;
        let pageIndex = req.query.pageIndex / 1;
        let pageSum = 1;
        let limit = 5;
        const count = await db.count("adminLog",{   
            adminName
        });
        pageSum = Math.ceil(count / limit);
        if (pageSum < 1) {
            pageSum = 1
        }
        if (pageIndex > pageSum) {
            pageIndex = pageSum
        }
        if (pageIndex < 1) {
            pageIndex = 1
        }

        const adminLog = await db.find("adminLog", {
            whereObj:{
                adminName
            },
            sortObj: {
                loginTime: -1
            },
            skip: (pageIndex - 1) * limit,
            limit
        })
        // console.log(adminLog)
           setTimeout(() => {
        res.json({
            ok: 1,
            adminLog,
            pageIndex,
            pageSum
        })
    }, 100)
    
})


// // 删除店铺登录日志
app.delete("/adminLog/:id",async function(req,res){
    const id = req.params.id;
    db.deleteOneById("adminLog",id)
    .then(results=>{
        tools.json(res,1,"成功")
    }).catch(err=>{
        tools.json(res);
    })
})



// 添加图片
app.post("/shopType",shopType.addShopType);

// 修改
app.get("/getShopTypeById",shopType.getShopTypeById);

// 
app.put("/shopTypeList",shopType.putShopTypeList);

// 渲染
app.get("/shopTypeList",shopType.getShopType)


// 获得所有店铺类别信息
app.get("/allShopTypeList",async function(req,res){
    const shopTypeList =await  db.find("shopTypeList",{
        sortObj:{
            createTime:-1
        }
    })
    res.json({
        ok:1,
        shopTypeList
    })
})


// 店铺接口
app.post("/shopList",async function(req,res){
    const {ok,params} = await upPic(req,"shopPic");
    if(ok === 1){
        // console.log(params);
        // 根据店铺类别id获得店铺类别信息
       const shopType = await db.findOneById("shopTypeList",params.shopTypeId)
        // 将内容放置到数据库
        await db.insertOne("shopList",{
            shopName:params.shopName,
            isTop:params.isTop === "true",
            createTime:Date.now(),
            shopPic:params.newPicName, 
            shopTypeName:shopType.shopTypeName,
            shopTypeId:shopType._id
        })
        tools.json(res,1,"插入成功")
    }else{
        tools.json(res)
    }
})

// 渲染接口店铺列表
app.get("/shopList",async function(req,res){
    let pageIndex = req.query.pageIndex / 1;
    let pageSum = 1;
    let limit = 2;
    let whereObj ={};
    // console.log(req.query)
    if(req.query.shopTypeId.length > 0){
        whereObj.shopTypeId = mongodb.ObjectId(req.query.shopTypeId);
    }
    const count = await db.count("shopList",whereObj);
    pageSum = Math.ceil(count / limit);
    if (pageSum < 1) {
        pageSum = 1
    }
    if (pageIndex > pageSum) {
        pageIndex = pageSum
    }
    if (pageIndex < 1) {
        pageIndex = 1
    }
    const shopList = await db.find("shopList", {
        whereObj,
        sortObj: {
            createTime: -1
        },
        skip: (pageIndex - 1) * limit,
        limit
    });
    res.json({
        ok: 1,
        shopList,
        pageIndex,
        pageSum
    })
})



// 删除店铺类别名称
app.delete("/shopTypeList/:id",async function(req,res){
    const id = req.params.id;
    db.deleteOneById("shopTypeList",id)
    .then(results=>{
        tools.json(res,1,"成功")
    }).catch(err=>{
        tools.json(res);
    })
})

// 删除店铺名称
app.delete("/shopList/:id",async function(req,res){
    const id= req.params.id;
    db.deleteOneById("shopList",id)
    .then(results=>{
        tools.json(res,1,"成功")
    }).catch(err=>{
        toolbar.json(res)
    })
})






// 根据店铺类别id获得店铺列表信息 二级联动
app.get("/shopListByTypeId/:shopTypeId",async function(req,res){
    
    const shopTypeId =mongodb.ObjectId(req.params.shopTypeId);
    const shopList = await db.find("shopList",{
        whereObj:{
            shopTypeId
        },
        sortObj:{
            createTime:-1
        }
    })
    res.json({
        ok:1,
        shopList
    })
})

                    //    商品类别 
// 添加商品类别
app.post("/goodsTypeList",async function(req,res){
    // 根据店铺id查找店铺详情
    const {_id,shopName,shopTypeId,shopTypeName} = await db.findOneById("shopList",req.body.shopId);
    await db.insertOne("goodsTypeList",{
        goodsTypeName:req.body.goodsTypeName,
        shopId:_id,
        shopName,
        shopTypeId,
        shopTypeName,
        createTime:Date.now()
    })
    res.json({
        ok:1,
        msg:"插入成功"
    })
})






app.listen(80, () => {
    console.log("启动成功")
})