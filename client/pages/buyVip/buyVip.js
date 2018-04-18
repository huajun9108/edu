// pages/buyVip/buyVip.js
const config = require('../../config')
const Session = require('../../vendor/wafer2-client-sdk/lib/session');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag: true,
    model: [
      {
        title: '月度',
        price: '9.90',
        unit:"月",
        type: 1,
        selectImage: true,
        selectedImageUrl:"../../images/xuanzhong_icon.png",
        unselectedImageUrl:"../../images/weixuanzhong_icon.png"
      },
      {
        title: '年度',
        price: '99.00',
        unit: "年",
        type: 2,
        selectImage: false,
        selectedImageUrl: "../../images/xuanzhong_icon.png",
        unselectedImageUrl: "../../images/weixuanzhong_icon.png"
      }
    ],
    payModel:[
      {
        title: '支付方式',
        unit: "微信",
        payImageUrl: "../../images/weixin.png",
      },
      {
        title: '会员特权',
        unit: "视频折扣",
        payImageUrl: "../../images/discount_icon.png",
      }
    ],
    number:"9.90",
    title: "月度",
    vipType: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  selectClick(e){
    for (var i = 0; i < this.data.model.length; i++) {
      if (e.currentTarget.id == i) {
        this.data.model[i].selectImage = true;
        this.setData({
          vipType: this.data.model[i].type
        });
      }
      else {
        this.data.model[i].selectImage = false;
      }
    }
    this.setData({
      model: this.data.model,
      number: e.currentTarget.dataset.price,
      title: e.currentTarget.dataset.title,
    })
    
  },
  buyTap(){
    app.testSession(this.sessionSuccessbuyVip, this.sessionFailbuyVip)
    
  },
  sessionSuccessbuyVip(){
    this.buyVip()
  },
  buyVip(){
    const price = this.data.number * 100
    const body = `VIP${this.data.title}充值`
    const url = config.service.vipPay
    app.request.requestPostApi(
      url, { userId: app.data.userId, body: body, attach: "IE共学社", totalFee: price },
      this,
      this.vipPaySuccessFun,
      this.vipPayFailFun,1);
  },
  sessionFailbuyVip(res){
    app.login(this.successbuyVip)
  },
  successbuyVip(){
    this.buyVip()
    const getVipStatusUrl = config.service.getVipStatusUrl;
    app.request.requestPostApi(getVipStatusUrl, { userId: app.data.userId }, this, this.getVipStatusSuccess, this.getVipStatusFail);
  },
  vipPaySuccessFun(res) {
    var that = this;
    if (res.status === "0"){
      var vipDetail = res.data
      wx.requestPayment({
        'appId': vipDetail.appId,
        'timeStamp': vipDetail.timeStamp,
        'nonceStr': vipDetail.nonceStr,
        'package': vipDetail.package,
        'signType': vipDetail.signType,
        'paySign': vipDetail.paySign,
        'success': function (res) {
          const addVipUrl = config.service.addVipUrl;
          app.request.requestPostApi(addVipUrl, { type: that.data.vipType, userId: app.data.userId }, that, that.addVipSuccess, that.addVipFail);
        },
        'fail': function (res) {
        }
      })
    }
  },
  vipPayFailFun(){

  },
  addVipSuccess(res) {
    const getVipStatusUrl = config.service.getVipStatusUrl;
    let that = this
    app.request.requestPostApi(getVipStatusUrl, { userId: app.data.userId }, that, that.getVipStatusSuccess, that.getVipStatusFail);
    wx.switchTab({
      url: '../mine/mine'
    })
  },
  addVipFail() {
  },
  getVipStatusSuccess(res){
    const endDate = res.data.endTime.split('T')[0];
    Session.setIsVip(res.data.isVip)
    Session.setVipDate(endDate)
  }
})