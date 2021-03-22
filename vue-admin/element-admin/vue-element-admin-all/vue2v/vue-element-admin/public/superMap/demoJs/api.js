/*
 * @Author: your name
 * @Date: 2020-11-16 15:50:42
 * @LastEditTime: 2020-11-19 21:21:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\demoJs\api.js
 */
//  URL地址与 axiosConfig 配置地址会连接起来
// 获取地图接口  如果有 则加载地图组件

// 所有设备数据 全局都大数组
// axios 插件  封装都拦截器  请求拦截 与 返回拦截

var mapApi = 'http://192.168.0.100:8888/'
// 封装的加载和提示信息。需要时调用传参数 关闭： layer.close(loadingMsgs);
    // 对应的是消息内容，icon 1 是成功  2是失败 0是查询中，time倒计时，0则不关闭
    // loadingMsgs('正在查询，请稍后...',0,0)
    function loadingMsgs(msg, icon, time) {
        var loadingMsg = layer.msg(msg, {
            icon: icon,
            time: time,
            shade: [0.5, '#000', true],
            success: function(layero) {
                if (icon === 0 || icon === '0') {
                    layero.find('.layui-layer-content .layui-layer-ico').remove()
                    layero.find('.layui-layer-content').prepend('<i class="msgTK" style="width:37px;height: 37px;"></i>')
                    layero.find('#layui-layer2 .layui-layer-dialog .layui-layer-padding').css({
                        'font-size': '22px',
                        'border-radius': '5px',
                        'text-align': 'center',
                    });
                }
            }
        });
    }

// 账户密码
var userData={
    loginId:"admin",
    password:'123456',
    token:''
}

window.addEventListener("message", function(e){
    if (e.data) {
        userData=e.data
        tokenIS()
    }
}, false) // e是个对象，里面包含了传过来的参数

tokenIS()
// 判断是否登录
function tokenIS() {
    // 如果登录则获取数据
    if (Cookies.get('token') && Cookies.get('username') || userData.token) {
        // if (!data.loading) {
        //      setTimeout(() => {
        //         data.loading=true
        //         window.parent.postMessage(data,"*");
        //     }, 1000); 
            
        // }
        getData()
        console.log('s1sss1ssss')
    }else{
        console.log('wwww1wwwww1ww')
        // 没登录则去登录
        if (userData.loginId && userData.password) {
            login()
        }else{
            
        }
        
        // document.execCommand("Stop");
        // window.stop()
    }
}

// var mapApi = 'http://192.168.0.100:8888/'
// 登录接口
function login() {
    service
	.post(`system/token?loginId=${userData.loginId}&password=${userData.password}`)
	.then((res) => {
       
        // 如果成功
        if (res.data.code == 200) {
            // 赋值到大数组中
            Cookies.set('username',userData)
            Cookies.set('token',res.data.data)
            userData.token =res.data.data
            console.log(userData,'resresresres')
            // 在调取判断接口 获取数据
            tokenIS()
        }

	})
	.catch((err) => {
		console.log('222',err)
    })
}

// 获取数据的大数组 和遍历之后的数组
var facilityData = [],
	mapData = {
		qiuji: [],
		qiang: [],
		naijie: [],
		weizhen: [],
		weibo: [],
		guangshan: [],
		dili: [],
		quanjing: [],
		zhenCe: [],
		fanzhi: [],
	}

// type     设备类型：0-枪,1-球机,2耐杰光电,3微振动,4微波雷达,5光纤主机,6地埋,7全景雷达,8侦测,9反制
// 遍历数据
function traversalData(data) {
	for (var i = 0; i < data.length; i++) {
		if (data[i].type === 1) {
			mapData.qiuji.push(data[i])
		}
		if (data[i].type === 0) {
			mapData.qiang.push(data[i])
        }
        if (data[i].type === 1) {
			mapData.zhenCe.push(data[i])
		}
	}
}

// type     设备类型：0-枪,1-球机,2耐杰光电,3微振动,4微波雷达,5光纤主机,6地埋,7全景雷达,8侦测,9反制
// 获取数据方法
// 传递都参数
var sendData = {
	type: '',
}
function getData() {
    service
	.post('system/device/web_list',sendData)
	.then((res) => {
        console.log()
        // 如果有数据
        if (res.data.data) {
            // 赋值到大数组中
              facilityData=res.data.data
            traversalData(res.data.data)
            //   执行地图渲染
            console.log('ssssssssss')
            setTimeout(() => {
                 init()
                 addVector()

            }, 400);
        }
	})
	.catch((err) => {
		console.log('222',err)
    })
}

