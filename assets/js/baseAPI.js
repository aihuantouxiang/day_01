/*
 * @Author: sharon simapingguo1@163.com
 * @Date: 2022-09-29 10:39:12
 * @LastEditors: sharon simapingguo1@163.com
 * @LastEditTime: 2022-09-29 15:28:09
 * @FilePath: \大事件01\assets\js\baseAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
//会先调用 ajaxPrefilter 这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (config) {
 
   // 将 key=value形式的数据，转成json格式的字符串
   const format2Json = (source) => {
    let target = {}
    source.split('&').forEach((el) => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
   }
 //在发起真正的Ajax请求之前，统一拼接请求的根路径
 config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
 //统一设置请求头 Content-Type值
 config.contentType = 'application/json'

 //统一设置请求参数 post 请求
 config.data = format2Json(config.data)
})