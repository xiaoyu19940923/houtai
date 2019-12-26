const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

function _connct() {
    return new Promise((resolve, reject) => {
        mongoClient.connect("mongodb://127.0.0.1:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err, client) {
            if (err)
                reject(err);
            else {
                const db = client.db("ele1916");
                resolve(db);
            }
        })
    })

}

/*
* 添加一条记录
* collName:指定的集合
* insertObj:添加的文档*/
module.exports.insertOne = async function (collName, insertObj) {
    const db = await _connct();
    return new Promise((resolve, reject) => {
        db.collection(collName).insertOne(insertObj, function (err, results) {
            if (err)
                reject(err);
            else
                resolve(results)
        })
    })

}
/*
* 根据条件，获得文档的数量
* 1、collName:集合名
* 2、whereObj:条件，默认为空对象*/
module.exports.count = async function (collName, whereObj = {}) {
    const db = await  _connct();
    return new Promise((resolve, reject) => {
        db.collection(collName).countDocuments(whereObj).then(count => {
            resolve(count);
        })
    })
}

module.exports.findOneById = async function (collName,id){
    const db= await _connct();
    return new Promise((resolve,reject)=>{
         db.collection(collName).findOne({_id:mongodb.ObjectId(id)},function(err,results){
            if (err)
            reject(err);
        else
            resolve(results);
         })
    })
   
}



module.exports.findOne = async function (collName,WhereObj={}){
    const db= await _connct();
    return new Promise((resolve,reject)=>{
         db.collection(collName).findOne(WhereObj,function(err,results){
            if (err)
            reject(err);
        else
            resolve(results);
         })
    })
}

/*
* 根据条件获得文档列表*/
module.exports.find = async function (collName, {whereObj = {}, limit = 0, skip = 0, sortObj = {}}) {
    const db = await _connct();
    return new Promise((resolve, reject) => {
        db.collection(collName).find(whereObj).limit(limit).skip(skip).sort(sortObj).toArray((err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        })
    })
}

module.exports.updateOne = async function(collName,whereObj,updateObj){
    const db = await _connct();
    return new Promise((resolve, reject) => {
        db.collection(collName).updateOne(whereObj,updateObj, function (err, results) {
            if (err)
                reject(err);
            else
                resolve(results);
        })
    })
}



/*
* 根据ID修改指定内容。*/
module.exports.updateOneById = async function (collName, id, upObj) {
    const db = await _connct();
    return new Promise((resolve, reject) => {
        db.collection(collName).updateOne({
            _id: mongodb.ObjectId(id)// 将字符串，转为ObjectId格式。
        }, upObj, function (err, results) {
            if (err)
                reject(err);
            else
                resolve(results);
        })
    })
}
/*根据ID进行删除*/
module.exports.deleteOneById = async function (collName, id) {
    const db = await _connct();
    return new Promise((resolve, reject) => {
        db.collection(collName).deleteOne({_id: mongodb.ObjectId(id)}, function (err, results) {
            if (err)
                reject(err);
            else
                resolve(results);
        })
    })


}
module.exports.count("contextList");