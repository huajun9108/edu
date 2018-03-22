const Session = require('../../vendor/wafer2-client-sdk/lib/session');
const config = require('../../config')
const utils = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    vipFlag: false,
    normalList: [
      {
        url: "../allOrders/allOrders", image: "../../images/my_study_icon.png", title: "学习中心", explain: "全部订单"
      },
      {
        url: "../myFavor/myFavor", image: "../../images/my_collection_icon.png", title: "我的收藏"
      }
    ],
    buyVipUrl: "../buyVip/buyVip",
    vipImage: "../../images/my_buy_icon.png",
    nonmember: "VIP 购买",
    member: "我的会员",
    userSetUrl: "../userSet/userSet",
    userSetImage: "../../images/my_account_icon.png",
    userSetTitle: "账号设置",
  },
  onLoad: function (options) {
  },
  onShow() {
    app.testSession(this.showUser)
  },
  showUser() {
    const getVipStatusUrl = config.service.getVipStatusUrl;
    app.request.requestPostApi(getVipStatusUrl, { userId: app.data.userId }, this, this.getVipStatusSuccess, this.getVipStatusFail);
    var session = Session.get();
    this.setData({
      userInfo: session.userinfo,
      logged: true,
    })
  },
  // 用户登录示例
  login: function () {
    if (this.data.logged) return;
    app.login(this.successFirst)
  },
  successFirst(result) {
    let session = Session.get();
    let endDate = session.vip.endTime.split('T')[0];
    this.setData({
      userInfo: result,
      logged: true,
      vipFlag: session.vip.isVip,
      vipDate: endDate
    });
  },
  getVipStatusSuccess(res) {
    if (res.status === "0") {
      let endDate = res.data.endTime.split('T')[0];
      this.setData({
        vipFlag: res.data.isVip,
        vipDate: endDate
      });
      Session.setIsVip(res.data.isVip);
      Session.setVipDate(endDate);
    }
  }
})
