//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    // 展示本地存储能力
    qcloud.setLoginUrl(config.service.loginUrl)
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              if (this.globalData.userInfo) {
                switch (this.globalData.userInfo.nickName) {
                  case '程序猿千歌 - ( ゜- ゜)つロ 乾杯~': { this.globalData.userInfo.otherName = '打一个岔' ;break;}
                  case '打一个岔': { this.globalData.userInfo.otherName = '程序猿千歌 - ( ゜- ゜)つロ 乾杯~'; break;}
                  default: { this.globalData.userInfo.hasUserInfo = false }
                }
              }
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})