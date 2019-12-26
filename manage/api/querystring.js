// const querystring = require("querystring");
// // 将对象转为urlencode

// const obj = {
//     a:1,
//     b:2
// }

// console.log(querystring.stringify(obj))


// // 将yrlencode转换为对象
// // querystring.parse



const tools = require("./module/tools");
tools.send("15716528780")
.then(res=>{
    console.log(222,res)
}).catch(err=>{
    console.log(33333,err)
})