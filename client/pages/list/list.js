const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hiddenmodalput: true
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })},
  todoInput:function(e){
    this.setData({
      todoName: e.detail.value
    })
  },
  new: function(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  del:function(){
   
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    util.showBusy('正在保存')
    this.setData({
      hiddenmodalput: true
    })
    var res = {
      nickName: app.globalData.userInfo.nickName,
      todoName: this.data.todoName,
      updateTime: util.formatTime(new Date()),
      finishFlag:0
    }
    console.info(res)
    qcloud.request({
      url: config.service.todoAddUrl,
      success: function (response) {
        util.showSuccess('保存成功')
      },
      data: res,
      fail: function (err) {
        util.showModel('保存失败', err)
        console.log('登录失败', err)
      }
    });
  }
})
