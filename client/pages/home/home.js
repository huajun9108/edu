// pages/home/home.js
const config = require('../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
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
    isLoad: false
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
    this.showHomePage();
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
    app.request.requestGetApi(homePageUrl, {}, this, this.homePageSuccess, this.homePageFail,1);
  },
  homePageSuccess(res) {
    if(res.status === "0") {
      var hottest = [];
      var latest = [];
      let hottestData = res.data.hottest;
      let latestData = res.data.newest;
      hottest = this.setLatestOrHottest(hottestData);
      latest = this.setLatestOrHottest(latestData);
      this.setData({
        imgUrls: res.data.top,
        latestImgUrls: latest,
        recommendImgUrls: hottest,
        isLoad: false
      });
    }
  },
  homePageFail(res) {
    this.setData({
      isLoad: true
    });
  },
  load() {
    this.showHomePage();
  },
  setLatestOrHottest(course) {
    let len = course.length;
    let courseArr = [];
    if(len <=0) return;
    if (len <= 6) {
      courseArr.push(course);
      courseArr.push(course);
    } else {
      for (let i = 0; i < len; i += 6) {
        courseArr.push(course.slice(i, i + 6));
      }
    }
    return courseArr;
  }
})