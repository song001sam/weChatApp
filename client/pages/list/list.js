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
    this.setData({
      hiddenmodalput: true
    })
  }
})
