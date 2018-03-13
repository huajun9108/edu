const Session = require('../../vendor/wafer2-client-sdk/lib/session');
const config = require('../../config')
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    vipFlag:false,
    normalList: [
      {
        url: "../allOrders/allOrders", image:"../../images/my_study_icon.png", title: "学习中心", explain:"全部订单"
      },
      {
        url: "../myFavor/myFavor", image: "../../images/my_collection_icon.png",title: "我的收藏"
      }
    ],
    buyVipUrl:"../buyVip/buyVip",
    vipImage:"../../images/my_buy_icon.png",
    nonmember:"VIP 购买",
    member:"我的会员",
    userSetUrl:"../userSet/userSet",
    userSetImage:"../../images/my_account_icon.png",
    userSetTitle:"账号设置",
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
    var sessionVip = Session.getIsVip();
    var sessionVipDate = Session.getVipDate();
    let that = this
    this.setData({
      userInfo: session.userinfo,
      logged: true,
      vipFlag: sessionVip,
      vipDate:sessionVipDate
    })
    app.data.isVip = sessionVip
    app.data.vipDate = sessionVipDate
  },
  // 用户登录示例
  login: function () {
    if (this.data.logged) return;
    app.login(this.successFirst)
  },
  successFirst(result){
    console.log(result)
    this.setData({
      userInfo: result,
      logged: true,
      vipFlag: app.data.isVip,
      vipDate: app.data.vipDate
    });
  },
  // success(result){
  //   console.log(result)
  //   this.setData({
  //     userInfo: result.data.data,
  //     logged: true,
  //   })
  // },
})
