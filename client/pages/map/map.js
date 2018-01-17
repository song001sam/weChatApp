const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const util = require('../../utils/util.js')
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  login: function () {
    
  },
  //事件处理函数
  
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
    },
  
  submitAdd: function (event) {
    
    var flag = true;
    if (app.globalData.userInfo.nickName =="史晓洁"){
      wx.showModal({
        title: '提示',
        content: '小仙女不用告诉狗子位置，确认告诉他么？',
        success: function (res) {
          if (res.confirm) {
            
          } else if (res.cancel) {
            flag = false;
          }
        }
      })
    }
    if(flag){
      util.showBusy('正在保存')
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          
          res.dateTime = util.formatTime(new Date())
          res.nickName = app.globalData.userInfo.nickName
          qcloud.request({
            url: config.service.mapAddUrl,
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
    }else{

    }
    
  },
  checkAdd: function(event) {
    
    qcloud.request({
      url: config.service.mapCheckUrl,
      success: function (response) {
        console.log(response)
        wx.openLocation({
          latitude: parseFloat(response.data.data.latitude),
          longitude: parseFloat(response.data.data.longitude),
          scale: 18,
          name: response.data.data.nickName,
          address: response.data.data.dateTime
        })
      },
      data: { nickName: app.globalData.userInfo.nickName},
      fail: function (err) {
        util.showModel('查询失败', err)
        console.log('查询失败', err)
      }
    });

  }
})
