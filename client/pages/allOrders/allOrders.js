// pages/allOrders/allOrders.js
var sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
var config = require('../../config');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "已付款", "待付款"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    scrollFlag: true,
    order: [],
    paidList:[],
    unpaidList: [],
    orderIsEmpty: false,
    paidIsEmpty: false,
    unpaidIsEmpty: false,
    tipMsg: '您还没有相关的订单',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.setData({
    //   orderList: this.data.order
    // });
    const queryAllOrdersUrl = config.service.queryAllOrdersUrl;
    app.request.requestPostApi(queryAllOrdersUrl, { userId: app.data.userId }, this, this.queryAllOrdersSuccessFun, this.queryAllOrdersFailFun);
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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
    if (this.data.activeIndex==="0"){
      this.setData({
        orderList: this.data.order,
      });
    } else if (this.data.activeIndex === "1"){
      this.setData({
        orderList: this.data.paidList
      })
    }else{
      this.setData({
        orderList: this.data.unpaidList
      })
    }
  },
  queryAllOrdersSuccessFun(res) {
    if(res.status === "0") {
      const orderList = res.data;
      let paidList = [];
      let unpaidList = [];
      for(let i = 0; i < orderList.length; i++) {
        //网络图片暂无，暂以本地图片显示
        orderList[i].icon = "../../images/xuex.png";
        if(orderList[i].explain === 0) {
          unpaidList.push(orderList[i]);
        } else {
          paidList.push(orderList[i]);
        }
      }
      if(orderList.length === 0) {
        this.setData({
          orderIsEmpty: true
        });
      }
      if (paidList.length === 0) {
        this.setData({
          paidIsEmpty: true
        });
      }
      if (unpaidList.length === 0) {
        this.setData({
          unpaidIsEmpty: true
        });
      }
      this.setData({
        orderList: orderList,
        paidList: paidList,
        unpaidList: unpaidList,
        order: orderList,
      })
    }
  },
  tapToBuyOrToStudy(e) {
    console.log(e);
    const explain = e.currentTarget.dataset.explain;
    const title = e.currentTarget.dataset.title;
    const courseId = e.currentTarget.dataset.courseId;
    if(explain === 1) {
      const toStudyUrl = `../detail/detail?id=${courseId}&name=${title}`;
      wx.navigateTo({
        url: toStudyUrl,
      })
    } else if(explain === 0) {
      const price = e.currentTarget.dataset.price;
      const toBuyUrl = `../buyCourse/buyCourse?name=${title}&price=${price}`;
      wx.navigateTo({
        url: toBuyUrl,
      })
    }
  }
})