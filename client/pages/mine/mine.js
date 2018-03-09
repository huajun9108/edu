var Session = require('../../vendor/wafer2-client-sdk/lib/session');
var config = require('../../config')
const util = require('../../utils/util.js')
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
  },
  onShow(){
    console.log("onshow")
    app.testSession(this.showUser)
  },
  showUser(){
    var session = Session.get();
    let that = this
    wx.getStorage({
      key: 'vipFlag',
      success: function (res) {
        that.setData({
          vipFlag: res.data,
        })
        console.log(res.data)
      }
    })
    wx.getStorage({
      key: 'vipDate',
      success: function (res) {
        if (that.data.vipFlag){
          that.setData({
            vipFlag: res.data,
          })
        }else{
          that.setData({
            normalList: res.data,
          })
        }
        
        console.log(res.data)
      }
    })
    this.setData({
      userInfo: session.userinfo,
      logged: true,
      // vipFlag: false,   
    })
  },
  // 用户登录示例
  login: function () {
    if (this.data.logged) return;
    app.login(this.successFirst)
  },
  successFirst(result){
    this.setData({
      userInfo: result,
      logged: true,
    });
    const getVipStatusUrl = config.service.getVipStatusUrl;
    app.request.requestPostApi(getVipStatusUrl, {userId: app.data.userId}, this, this.getVipStatusSuccess, this.getVipStatusFail);
  },
  success(result){
    this.setData({
      userInfo: result.data.data,
      logged: true,
    })
  },
  getVipStatusSuccess(res) {
    console.log(res);
    if(res.status === "0") {
      if(res.data.isVip) {
        console.log(util.formatTime(new Date(res.data.endTime)));
        const endDate = util.formatTime(new Date(res.data.endTime));
        this.setData({
          vipFlag: res.data.isVip,
          nameFlag: "vipname",
          vipList: [
            {
              url: "../allOrders/allOrders", image: "../../images/my_study_icon.png",title: "学习中心", explain: "全部订单"
            },
            {
              url: "../myFavor/myFavor", image: "../../images/my_collection_icon.png",title: "我的收藏"
            },
            {
              url: "../buyVip/buyVip?id=" + 1, image: "../../images/my_buy_icon.png", title: "我的会员", explain: endDate+" 到期"
            },
            {
              url: "../userSet/userSet", image: "../../images/my_account_icon.png",title: "账号设置"
            }
          ],
        })
        wx.setStorage({
          key:"vipFlag",
          data: res.data.isVip,
        })
        wx.setStorage({
          key: "vipDate",
          data: this.data.vipList
        })
      }else{
        wx.setStorage({
          key: "vipFlag",
          data: false
        })
        wx.setStorage({
          key: "vipDate",
          data: this.data.normalList
        })
      }
    }
  },
  getVipStatusFail() {

  }
})
