var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    logged: false,
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
        url: "../buyVip/buyVip?id="+1, title: "VIP购买"
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
    console.log(options)
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
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this
    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
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
        console.log('request success', result)
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
    }
  },
})
