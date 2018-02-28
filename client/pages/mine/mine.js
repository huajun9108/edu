var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var Session = require('../../vendor/wafer2-client-sdk/lib/session');
var app = getApp()
Page({
  data: {
    userInfo: {},
    takeSession: false,
    requestResult: '',
    vipFlag:false,
    normalList: [
      {
        url: "../allOrders/allOrders", image:"../../images/my_study_icon.png", title: "学习中心", explain:"全部订单"
      },
      {
        url: "../myFavor/myFavor", image: "../../images/my_collection_icon.png",title: "我的收藏"
      },
      {
        url: "../buyVip/buyVip?id=" + 1, image: "../../images/my_buy_icon.png", title: "VIP 购买"
      },
      {
        url: "../userSet/userSet", image: "../../images/my_account_icon.png", title: "账号设置"
      }
    ],
    time:null,
    nameFlag:"unvipname",
  },
  onLoad: function (options) {
    console.log("onLoad")
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
  onShow(){
    // var that = this;
    
    // if (session) {
    //   wx.checkSession({
    //     success: function (result) {
    //       app.data.userId = session.userinfo.openId;
          
    //     },
    //     fail: function () {
    //       Session.clear();
    //     },
    //   });
    // } else {
    //   return
    // }
    app.testSession(this.showUser)
  },
  showUser(){
    var session = Session.get();
    this.setData({
      userInfo: session.userinfo,
      logged: true
    })
  },
  // 用户登录示例
  login: function () {
    if (this.data.logged) return;
    app.login(this.successFirst, this.success)
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
  successFirst(result){
    this.setData({
      userInfo: result,
      logged: true,
    })
  },
  success(result){
    this.setData({
      userInfo: result.data.data,
      logged: true,
    })
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
