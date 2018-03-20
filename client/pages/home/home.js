// pages/home/home.js
const config = require('../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular:true,
    current: 0,
    controls:true,
    previous:"35rpx",
    next:"35rpx",
    recommendComMsg:"为你推荐",
    latestComMsg:"最新最热",
    imgUrl: app.data.imgUrl,
    isLoad: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.showHomePage();
    //===取屏幕宽度=======  
    wx.getSystemInfo({
      success: function (res) {
        // _this.data.screenHeight= res.windowHeight;  
        _this.setData({
          phoneWidth: res.windowWidth
        })
      }
    });
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
    console.log("下拉刷新")
    wx.stopPullDownRefresh()
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
  swipclick: function (e) {//点击图片触发事件
    var index = e.target.id
    var name = this.data.imgUrls[this.data.current].name
    var url = this.data.imgUrls[this.data.current].url
    wx.navigateTo({
      "url": "../detail/detail?name=" + name + "&id=" + index + "&imageUrl=" + url
    })
  },
  bindchange: function (e) {//轮播图发生改变
    this.setData({
      current: e.detail.current
    })
  },
  
  changeImage(e){
    let index = e.target.id
    let name = e.target.dataset.name
    wx.navigateTo({
      "url": "../detail/detail?name=" + name + "&id=" + index
    })
  } ,
  showHomePage() {
    const homePageUrl = config.service.homePageUrl;
    app.request.requestGetApi(homePageUrl, {}, this, this.homePageSuccess, this.homePageFail);
  },
  homePageSuccess(res) {
    console.log(res);
    if(res.status === "0") {
      var hottest = [];
      var latest = [];
      for (var i = 0, len = res.data.hottest.length; i < len; i += 6) {
        hottest.push(res.data.hottest.slice(i, i + 6));
      }
      for(var i = 0, len = res.data.newest.length; i < len; i += 6) {
        latest.push(res.data.newest.slice(i, i + 6));
      }
      this.setData({
        imgUrls: res.data.top,
        latestImgUrls: latest,
        recommendImgUrls: hottest,
        isLoad: false
      });
    }
  },
  homePageFail(res) {
    console.log(res);
    this.setData({
      isLoad: true
    });
  },
  load() {
    this.showHomePage();
  }
})