/*
 * @Author: your name
 * @Date: 2020-11-19 20:03:40
 * @LastEditTime: 2020-11-19 20:10:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OlympicsAdmin\src\utils\rem.js
 */
export function resetRem() {
  const html = document.documentElement
  html.style.fontSize = 100 * (html.clientWidth / 1920) + 'px'
  // 监听 window 的 resize 事件．在浏览器窗口变化时再设置下区域高度．
  window.onresize = () => {
    const html = document.documentElement
    html.style.fontSize = 100 * (html.clientWidth / 1920) + 'px'
  }
}
