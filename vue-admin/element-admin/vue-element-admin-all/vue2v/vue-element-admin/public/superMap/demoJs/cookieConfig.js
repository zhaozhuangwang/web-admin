/*
 * @Author: your name
 * @Date: 2020-11-17 08:38:12
 * @LastEditTime: 2020-11-19 09:47:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\demoJs\cookieConfig.js
 */

 console.log(Cookies.get('username', { domain: 'http://localhost:10086' }),'Cookies')
//  document.cookie="name=username;domain=.sosuo8.com";
//  document.cookie="name=username;domain=http://localhost:10086";
// console.log(document.cookie,'data')
//  Cookies.get('username') ? window.stop() : document.execCommand("Stop");

//Cookie取值
// function readCookie (name)
// {
//     var cookieValue = "";
//     var search = name + "=";
//     if (document.cookie.length > 0)
//     {
//         offset = document.cookie.indexOf (search);
//         if (offset != -1)
//         {
//             offset += search.length;
//             end = document.cookie.indexOf (";", offset);
//             if (end == -1)
//                 end = document.cookie.length;
//             cookieValue = unescape (document.cookie.substring (offset, end))
//         }
//     }
//     console.log(cookieValue,'ssssssssssssssss')
//     return cookieValue;
// }
// readCookie()
// sessionStorage.getItem('username');//取值
// window.parent.postMessage({type: "closeIbooking", fromSource: "turnoffIbooking"}, "*");
// 1、子页面调用父页面方法
　　//调用父页面方法
// 　　window.parent.func(); //调用方法
// 　　2、父页面调用子页面方法
　　//调用子页面方法
// 　　window.frames[iframe序号].func(); //调用方法
// console.log(sessionStorage.getItem('username'),'sssssssssssssssssss')//取值,)
// woshishei()
var USERNAME=''
var password=''
var TOKEN=''
var data={
    loginId:"admin",
    password:'123456'
}
woshishei()
function woshishei() {
    if (Cookies.get('token') && Cookies.get('username') ) {
        // if (!data.loading) {
        //      setTimeout(() => {
        //         data.loading=true
        //         window.parent.postMessage(data,"*");
        //     }, 1000); 
            
        // }
        getData()
    }else{
        login()
        // document.execCommand("Stop");
        // window.stop()
    }
}
// window.addEventListener("message", function(e){
//     if (e.data) {
//         USERNAME=e.data
//         console.log(USERNAME,'USERNAMEUSERNAME')
//         woshishei()
//     }
// }, false) // e是个对象，里面包含了传过来的参数

// var mapApi = 'http://192.168.0.100:8888/'
// 登录
function login() {
    service
	.post(`system/token?loginId=${data.loginId}&password=${data.password}`)
	.then((res) => {
      
        // 如果有数据
        if (res.data.code == 200) {
            // 赋值到大数组中
            Cookies.set('username',data)
            Cookies.set('token',res.data.data)
            woshishei()
        }

	})
	.catch((err) => {
		console.log('222',err)
    })
}
