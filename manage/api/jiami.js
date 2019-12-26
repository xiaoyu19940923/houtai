// md5   颜料
// const md5 = require("md5");


// const password = "111";
// const str = "*"

// console.log(md5(password+str))


// jwt
// const jwt = require("jwt-simple");

// // 加密  当你注册的时候生成token  荷载(承载的内容)
// // 荷载的内容包含个人信息
// const payload = {
//     adminName:"admin",
//     lastTime:Date.now()+1000*60*60*2
// }
// const key = "&*&";
// const token = jwt.encode(payload,key)

// // console.log(jwt.encode(payload,key))

// // 解密 解析token

// const adminInfo = jwt.decode(token,key) 
// console.log(payload)


// db.adminList.insert({adminName:'xiao',passWord:'d4e3f54c527fc7560ce8f1346a96a305'})



// 二维数组
// const arr=[1,2,3,4,5,6,7,8,9,10,11];

// const newArr =[];
// for(var i=0;i<arr.length;i+=10){
//     newArr.push(arr.slice(i,i+10))
// }
// console.log(newArr)