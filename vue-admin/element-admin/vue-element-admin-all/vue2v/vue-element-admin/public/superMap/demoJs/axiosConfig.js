/*
 * @Author: your name
 * @Date: 2020-11-16 14:46:18
 * @LastEditTime: 2020-11-20 08:41:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\demoJs\axiosConfig.js
 */
//axios封装post请求

// 地址 //  URL地址与 api文件 配置地址会连接起来
var URL = 'http://192.168.0.100:8888/'
// var URL = 'http://192.168.0.137:8888/'
// 192.168.0.137

var service = axios.create({
	//创建axios实例，在这里可以设置请求的默认配置
	timeout: 15000, // 设置超时时间10s
	baseURL: URL, //根据自己配置的反向代理去设置不同环境的baeUrl
})

//请求拦截器
service.interceptors.request.use(
	function (config) {
        console.log('>---<')
       let sss=userData.token ? userData.token:Cookies.get('token')
      
        // config.headers['authorization'] = `Bearer ` + Cookies.get('token')
        config.headers['X-Access-Token'] =userData.token ? userData.token:Cookies.get('token')
        if (config.method === 'post') {
            config.headers['Content-Type'] = 'application/json'
            // config.headers['Content-Type'] = 'eyJraWQiOiJhZG1pbiIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJleHAiOjE2MDU3MDEyMDF9.6E5KWJfK_aYrPjYJP4UQstTTD6ZMdtVyeD12b6GKQNM'
			//   config.headers['Content-Type'] = 'application/xxxx-form' //过滤成？&=格式
		}
		return config
	},
	function (err) {
		return Promise.reject(err)
	}
)

//响应拦截器
service.interceptors.response.use(
	(response) => {
		return response
	},
	(err) => {
		if (err.response) {
			//  判断状态 响应跳转
			switch (err.response.status) {
				case 401:
                    console.log(Cookies.get('username'),'Cookies')
					Cookies.remove('username') //可能是token过期，清除它
					// router.replace({
					// 	//跳转到登录页面
					// 	path: '/login',
					// 	query: {
					// 		redirect: router.currentRoute.fullPath,
					// 	}, // 将跳转的路由path作为参数，登录成功后跳转到该路由
					// })
			}
		}
		return Promise.reject(err.response)
	}
)
// export default service;




