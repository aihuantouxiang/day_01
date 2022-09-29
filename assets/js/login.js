/*
 * @Author: sharon simapingguo1@163.com
 * @Date: 2022-09-26 17:05:23
 * @LastEditors: sharon simapingguo1@163.com
 * @LastEditTime: 2022-09-29 15:29:22
 * @FilePath: \大事件01\assets\js\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function () {
  // 点击去注册
  $('#go2Reg').on('click', function () {
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  // 点击去登
  $('#go2Log').on('click', function () {
    $('.login-wrap').show()
    $('.reg-wrap').hide()
  })

  // 需要从 layui 对象身上取到 form
  let form = layui.form
  let layer = layui.layer

  form.verify({
    // 添加自定义规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
    // 确认密码框
    repwd: function (value) {
      // 拿到密码框和再次确认密码作比较
      if( $('#repassword').val() !== value) return '两次密码输入不一致,请重新输入'
     }
  })

 

  // 给注册表单添加提交事件（会刷新浏览器）
  $('#formReg').on('submit', function (e) {
    e.preventDefault()
    // 发请求 ajax
    // 经过分析：1、 修改 Content-Type 2、需要将参数转成 json 格式
    $.ajax({
      method: 'POST',
      url: '/api/reg',
      // contentType: 'application/json',
        // data: JSON.stringify({
        // 可将对象转成json格式的字符串
        // username:$('#formReg [name=username]').val(),
        // password:$('#formReg [name=password]').val(),
        // repassword:$('#formReg [name=repassword]').val()
        // }),
      data: format2Json($(this).serialize()),
      success(res) {
        if (res.code !== 0) {
          return layer.msg(res.message)
         }
        layer.msg('注册成功')
        // 模拟点击行为
        $('#go2Log').click()
       }
    })
    
   })
   $('#formLogin').on('submit', function (e) {
    e.preventDefault()
    // 发请求 ajax
    // 经过分析：1、 修改 Content-Type 2、需要将参数转成 json 格式
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // contentType: 'application/json',
        // data: JSON.stringify({
        // 可将对象转成json格式的字符串
        // username:$('#formReg [name=username]').val(),
        // password:$('#formReg [name=password]').val(),
        // repassword:$('#formReg [name=repassword]').val()
        // }),
      data: format2Json($(this).serialize()),
      success(res) {
        if (res.code !== 0) {
          return layer.msg(res.message)
         }
        localStorage.setItem('big_news_token',res.token)
         //跳转到主页
         //token 意思是令牌的意思（下一次去请求有权限的接口的时候“带着”）
        location.href = '/home.html'
       }
    })
    
   })
})