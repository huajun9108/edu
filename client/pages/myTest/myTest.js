// pages/myTest/myTest.js
var sliderWidth = 80; //需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["历史测验", "收藏测验"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,

    showTime: false,
    examList: [
      {
        title: "[练习]“5S”核心知识测验",
        type: 1
      },
      {
        title: "[练习]“5S”核心知识测验",
        type: 1
      },
      {
        title: "[练习]“5S”核心知识测验",
        type: 1
      },
      {
        title: "[练习]“5S”核心知识测验",
        type: 0
      },
      {
        title: "[练习]“5S”核心知识测验",
        type: 0
      },
      {
        title: "[练习]“5S”核心知识测验",
        type: 2
      },
    ],
    exam_msg: "状态",

    delCss: "weui-flex-common",
    showCheckCss: "",
    hideStatus: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('myTest onLoad');
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log((res.windowWidth / that.data.tabs.length - sliderWidth) / 2);
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
    console.log('myTest onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('myTest onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('myTest onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('myTest onUnload');
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
      activeIndex: e.currentTarget.id
    });
    if(e.currentTarget.id === "1") {
      this.setData({
        delCss: "weui-flex-common",
        showCheckCss: "",
        hideStatus: true
      });
    }
  }
})