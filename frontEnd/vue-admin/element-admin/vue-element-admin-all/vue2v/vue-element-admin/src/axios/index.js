import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

let URL = ''
// 判断当前的环境为开发，还是打包
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = '/api';
  URL = '/api'
} else if (process.env_NODE_ENV === 'debug') {
  // axios.defaults.baseURL = '';
  URL = '/api'
} else if (process.env_NODE_ENV === 'production') {
  // 打包后就用这个地址
  URL = process.env.VUE_APP_API_ceshi
}

// const URL = process.env.NODE_ENV === 'production' ? '/api' : '/api'
console.log(URL, 'URL111111111')

const service = axios.create({
  // 创建axios实例，在这里可以设置请求的默认配置
  timeout: 5000, // 设置超时时间10s
  baseURL: URL // 根据自己配置的反向代理去设置不同环境的baseUrl
})

// 请求拦截器
service.interceptors.request.use(
  function(config) {
    console.log(config, '>---<')
    // config.headers['authorization'] = `Bearer ` + Cookies.get('username')

    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/json'
      //   config.headers['Content-Type'] = 'application/xxxx-form' //过滤成？&=格式
    }
    return config
  },
  function(err) {
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          Cookies.remove('username', {
            path: '/'
          }) // 可能是token过期，清除它
          router.replace({
            // 跳转到登录页面
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
    }
    return Promise.reject(err.response)
  }
)

export default service

// service.interceptors.request.use(config => {
//   app.$vux.loading.show({
//       text: '数据加载中……'
//   });

//   config.method === 'post'
//       ? config.data = qs.stringify({...config.data})
//       : config.params = {...config.params};
//   config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

//   return config;
// }, error => {  //请求错误处理
//   app.$vux.toast.show({
//       type: 'warn',
//       text: error
//   });
//   Promise.reject(error)
// })
// service.interceptors.response.use(
//   response => {  //成功请求到数据
//       app.$vux.loading.hide();
//       //这里根据后端提供的数据进行对应的处理
//       if (response.data.result === 'TRUE') {
//           return response.data;
//       } else {
//           app.$vux.toast.show({  //常规错误处理
//               type: 'warn',
//               text: response.data.data.msg
//           });
//       }
//   },
//   error => {  //响应错误处理
//       console.log('error');
//       console.log(error);
//       console.log(JSON.stringify(error));

//       let text = JSON.parse(JSON.stringify(error)).response.status === 404
//           ? '404'
//           : '网络异常，请重试';
//       app.$vux.toast.show({
//           type: 'warn',
//           text: text
//       });

//       return Promise.reject(error)
//  })
// 过滤数据
// export default ({m = 'GET', u = '', p = {}}) => {
//   if (p) {
//     p = filterNull(p);
//   }
//   return new Promise( (resolve, reject) => {
//     service({
//       method: m,
//       url: u,
//       data: m === 'POST' || m === 'PUT' ? p : null,
//       params: m === 'GET' || m === 'DELETE' ? p : null,
//       baseURL: URL,
//       withCredentials: false,
//       // timeout: 30000
//     }).then( res => {
//       // console.log(res,'resresres');
//          if (res.status === 200) {
//            resolve(res);
//          } else {
//            console.log(u, '<--->', res);
//            throw new Error(res.data.message)
//          }
//     }).catch( err => {
//       if (reject) {
//         reject(err);
//       } else {
//         console.log(u, '<--->api error, HTTP CODE: ' + err);
//       }
//     });
//   });
// };
