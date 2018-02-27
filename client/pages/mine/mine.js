var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var Session = require('../../vendor/wafer2-client-sdk/lib/session');
const login = require('../../utils/login.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    takeSession: false,
    requestResult: '',
    vipFlag:false,
    normalList: [
      {
        url: "../allOrders/allOrders", title: "学习中心", explain:"全部订单"
      },
      {
        url: "../myFavor/myFavor", title: "我的收藏"
      },
      {
        url: "../buyVip/buyVip?id="+1, title: "VIP 购买"
      },
      {
        url: "../userSet/userSet", title: "账号设置"
      }
    ],
    time:null,
    nameFlag:"unvipname",
  },
  onLoad: function (options) {
    var that = this;
    var session = Session.get();
    if (session) {
      console
      wx.checkSession({
        success: function (result) {
          app.data.userId = session.userinfo.openId;
          that.setData({
            userInfo: session.userinfo,
            logged: true
          })
        },
        fail: function () {
          Session.clear();
          app.login()
        },
      });
    } else {
      // that.login()
      return
    }
    // that.login()
    options.data = "2017-11-14 到期"
    if (this.data.vipFlag){
      that.setData({
        vipList: [
          {
            url: "../allOrders/allOrders", title: "学习中心",explain: "全部订单"
          },
          {
            url: "../myFavor/myFavor", title: "我的收藏"
          },
          {
            url: "../buyVip/buyVip?id="+1, title: "我的会员", explain: options.data
          },
          {
            url: "../userSet/userSet", title: "账号设置"
          }
        ],
        nameFlag: "vipname",
      })
    }
    
  },

  // 用户登录示例
  login: function () {
    if (this.data.logged) return;
    util.showBusy('正在登录')
    var that = this
    console.log(login.login())
    // 调用登录接口
    // qcloud.login({
    //   success(result) {
    //     if (result) {
    //       util.showSuccess('登录成功')
    //       const session = Session.get()
    //       console.log(session)
    //       app.data.userId = session.userinfo.openId;
    //       that.setData({
    //         userInfo: result,
    //         logged: true
    //       })
    //     } else {
    //       // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
    //       qcloud.request({
    //         url: config.service.requestUrl,
    //         login: true,
    //         success(result) {
    //           util.showSuccess('登录成功')
    //           console.log(session)
    //           app.data.userId = session.userinfo.openId;
    //           console.log(app.data.userId);
    //           console.log(result);
    //           that.setData({
    //             userInfo: result.data.data,
    //             logged: true
    //           })
    //         },

    //         fail(error) {
    //           util.showModel('请求失败', error)
    //         }
    //       })
    //     }
    //   },

    //   fail(error) {
    //     util.showModel('登录失败', error)
    //   }
    // })
    // console.log(app)
  },

  // 切换是否带有登录态
  switchRequestMode: function (e) {
    this.setData({
      takeSession: e.detail.value
    })
    this.doRequest()
  },

  doRequest: function () {
    util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.requestUrl,
      login: true,
      success(result) {
        util.showSuccess('请求成功完成')
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
      }
    }
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
    }
  },
  success(result){
    console.log(1)
    this.setData({
      userInfo: result,
      logged: true,
    })
    console.log(this.data.userInfo)
  },
  checkLogin(e) {
    console.log(e);
    // if(this.logged) return;
    // wx.showModal({
    //   content: '请先登录账号',
    //   showCancel: false,
    //   success: function(res) {
    //     if(res.confirm) {
    //       console.log('用户点击确定')
    //     }
    //   }
    // })
  }
})
