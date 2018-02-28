// pages/buyCourse/buyCourse.js
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
        detail: ""
      }
    ],
    number: "￥20"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let model = this.data.model;
    model[0].detail = options.name;
    model[1].detail = `¥${options.price}`;
    this.setData({
      model: model
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  buyTap(){
    const wechatData = {
      appId:"wx8c8e043278e36df9",//小程序id
      nonceStr: "qdpys6rdizbnpj12ahwvkf568a6c1sr9", //随机字符串
      package: "prepay_id=wx2017033010242291fcfe0db70013231072", //wx的预支付交易单
      paySign: "8A7DC1A560B3B6DB0C656AC382D3E6F1",
      signType: "MD5",
      timeStamp: "1481167418"
    }
    wx.requestPayment({
      'appId': wechatData.appId,
      'timeStamp': wechatData.timeStamp,
      'nonceStr': wechatData.nonceStr,
      'package': wechatData.package,
      'signType': 'MD5',
      'paySign': wechatData.paySign,
      'total_fee':"280",
      'success': function (res) {
        console.log(res);
        console.log('success');
      },
      'fail': function (res) {
        console.log(res);
        console.log('fail');
      },
      'complete': function (res) {
        console.log(res); console.log('complete');
      }
    });
  }
})