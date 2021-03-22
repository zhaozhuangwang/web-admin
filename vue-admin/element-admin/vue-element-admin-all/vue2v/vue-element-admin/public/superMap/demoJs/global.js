/*
 * @Author: your name
 * @Date: 2020-11-16 14:46:43
 * @LastEditTime: 2020-11-19 20:47:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\demoJs\global.js
 */
// 全局引入   只需要将全局文件引入此文件夹
var url='./demoJs/'
var layui='./../layui-v2.5.6/'
// axios 插件  具体用法百度 官方网址有  
document.write("<link rel='stylesheet' href='"+ layui +"layui/css/layui.css'>");
document.write("<script language='javascript' type='text/javascript' src='"+ layui +"layui/layui.js'></script>");
// babel.插件  ES6语法转换ES5   type='text/babel'
document.write("<script language='javascript' type='text/javascript' src='"+ url +"babel.js'></script>");
// polyfill.插件  axios 兼容IE ES6API 转换
document.write("<script language='javascript' type='text/javascript' src='"+ url +"polyfill.min.js'></script>");
// js-cookie  百度有文档
document.write("<script language='javascript' type='text/javascript' src='"+ url +"cookie.min.js'></script>");
// axios 插件  具体用法百度 官方网址有  
document.write("<script language='javascript'  type='text/javascript' src='"+ url +"axios.min.js'></script>");
// axios 插件  封装都拦截器  请求拦截 与 返回拦截 
document.write("<script language='javascript' type='text/babel' src='"+ url +"axiosConfig.js'></script>");

// js-cookie  设置获取值
// document.write("<script  type='text/babel' src='"+ url +"cookieConfig.js'></script>");
// rem.js   跟随设备 尺寸变化
document.write("<script  type='text/javascript' src='"+ url +"rem.js'></script>");

// 所有都api存放
// document.write("<script language='javascript'  src='"+ url +"ajax.js'></script>");
// 所有都api存放
document.write("<script language='javascript' type='text/babel' src='"+ url +"api.js'></script>");