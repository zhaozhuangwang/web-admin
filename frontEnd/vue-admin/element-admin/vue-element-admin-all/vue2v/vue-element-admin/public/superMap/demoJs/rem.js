/*
 * @Author: your name
 * @Date: 2020-11-17 20:51:18
 * @LastEditTime: 2020-11-18 10:31:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\demoJs\rem.js
 */
setHtmlFont()
function setHtmlFont() {
	var htmlWidth =
		document.documentElement.clientWidth || document.body.clientWidth //浏览器兼容
	    document.documentElement.style.fontSize = htmlWidth / 10 + 'px'
}
window.onresize = function () {
	setHtmlFont()
}
