// pages/buyCourse/buyCourse.js
const config = require("../../config");
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      showFlag: false,
      model: [
        {
          title: '名称',
          detail: ""
        },
        {
          title: '价格',
          detail: "￥"
        }
      ],
      payModel: [
        {
          title: '支付方式',
          unit: "微信",
          payImageUrl: "../../images/weixin.png",
        }
      ],
      courseIsBuy: 0,
      courseId: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let model = this.data.model;
        model[0].detail = decodeURI(options.name);
        model[1].detail += `${options.price}`;
        this.setData({
            model: model,
            courseId: options.courseId,
            courseName: model[0].detail,
            coursePrice: options.price*100
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    buyTap() {
      const payUrl = config.service.vipPay
      const body = this.data.courseName
      const totalFee = this.data.coursePrice
      app.request.requestPostApi(
        payUrl, 
        { userId: app.data.userId, body: body, attatch: "IE共学社", totalFee: totalFee}, 
        this, 
        this.coursePaySuccessFun, 
        this.coursePayFailFun , 1);
    },
    
    coursePaySuccessFun(res){
      let that = this
      if(res.status === "0"){
        var coursePayDetail = res.data
        wx.requestPayment({
          'appId': coursePayDetail.appId,
          'timeStamp': coursePayDetail.timeStamp,
          'nonceStr': coursePayDetail.nonceStr,
          'package': coursePayDetail.package,
          'signType': coursePayDetail.signType,
          'paySign': coursePayDetail.paySign,
          'success': function (res) {
            console.log(res)
            that.setData({
              courseIsBuy: 1
            });
            const title = that.data.courseName;
            const courseId = that.data.courseId;
            wx.navigateBack({
              url: `../detail/detail?name=${title}&id=${courseId}`,
            });
          },
          'fail': function (res) {
            that.setData({
              courseIsBuy: 0
            });
          },
          'complete': function (res) {
            const addOrderUrl = config.service.addOrderUrl;
            app.request.requestPostApi(addOrderUrl, { userId: app.data.userId, courseId: that.data.courseId, type: that.data.courseIsBuy }, that, that.addOrderSuccessFun, that.addOrderFailFun);
          }
        });
      }
    },
    addOrderSuccessFun(res) {
      if (res.status === "0") {
      } else {
      }
    },
    addOrderFailFun() {

    },
})