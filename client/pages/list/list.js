const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hiddenmodalput: true,
    todoInfo: []
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
   
    

  },
  onShow: function () {
    var t = this
    qcloud.request({
      url: config.service.todoListUrl,
      success: function (response) {
        t.setData({
          todoInfo: response.data.data,
          redioCheckId: response.data.data.length > 0 ? response.data.data[0].id : 0
        })
      },
      data: { nickName: app.globalData.userInfo.nickName },
      fail: function (err) {
        util.showModel('查询失败', err)
      }
    });
  },
  onReady:function(){
    var t = this
    qcloud.request({
      url: config.service.todoListUrl,
      success: function (response) {
        t.setData({
          todoInfo: response.data.data,
          redioCheckId: response.data.data.length > 0 ? response.data.data[0].id : 0
        })
      },
      data: { nickName: app.globalData.userInfo.nickName },
      fail: function (err) {
        util.showModel('查询失败', err)
      }
    });
  },
  todoInput: function (e) {
    this.setData({
      todoName: e.detail.value
    })
  },
  radioChange:function(e){
    this.setData({
      redioCheckId: e.detail.value
    })
  },
  new: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  del: function () {
    var flag = false;
    var t = this;
    wx.showModal({
      title: '提示',
      content: '确认删除这个待办么？',
      success: function (res) {
        if (res.confirm) {
          console.info(t.data.redioCheckId)
          qcloud.request({
            url: config.service.todoDelUrl,
            success: function (response) {
              console.info(response)
              util.showSuccess('删除成功')
            },
            data: { id: t.data.redioCheckId },
            fail: function (err) {
              util.showModel('删除失败', err)
            }
          });
          qcloud.request({
            url: config.service.todoListUrl,
            success: function (response) {
              t.setData({
                todoInfo: response.data.data
              })
            },
            data: { nickName: app.globalData.userInfo.nickName },
            fail: function (err) {
              util.showModel('查询失败', err)
            }
          });
        }
      }
    })
    
    
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
      finishFlag: -1
    }

    qcloud.request({
      url: config.service.todoAddUrl,
      success: function (response) {
        util.showSuccess('保存成功')
      },
      data: res,
      fail: function (err) {
        util.showModel('保存失败', err)
      }
    });
    var t = this
    qcloud.request({
      url: config.service.todoListUrl,
      success: function (response) {
        t.setData({
          todoInfo: response.data.data,
          redioCheckId: response.data.data.length>0?response.data.data[0].id:0,
          todoName:''
        })
      },
      data: { nickName: app.globalData.userInfo.nickName },
      fail: function (err) {
        util.showModel('查询失败', err)
      }
    });
    
  },
  finish:function(){
    var t = this;
    wx.showModal({
      title: '提示',
      content: '确认完成这个待办么？',
      success: function (res) {
        if (res.confirm) {
          console.info(t.data.redioCheckId)
          qcloud.request({
            url: config.service.todoFinishUrl,
            success: function (response) {
              console.info(response)
              util.showSuccess('修改成功')
            },
            data: { id: t.data.redioCheckId, finishFlag:0},
            fail: function (err) {
              util.showModel('修改失败', err)
            }
          });
          qcloud.request({
            url: config.service.todoListUrl,
            success: function (response) {
              t.setData({
                todoInfo: response.data.data
              })
            },
            data: { nickName: app.globalData.userInfo.nickName },
            fail: function (err) {
              util.showModel('修改失败', err)
            }
          });
        }
      }
    })
  }
})
