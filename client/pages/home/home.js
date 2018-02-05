// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' ,name:"工艺AAA"},
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' ,name: "工艺BBB"},
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg',name: "工艺CCC" },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg',name: "工艺DDD" }     
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular:true,
    current: 0,
    controls:true,
    previous:"35rpx",
    next:"35rpx",
    scrollimgUrls: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg', name: "课程AAA" },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg', name: "课程BBB"},
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg', name: "课程CCC"},
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg', name: "课程DDD"},
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg', name: "课程EEE" },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg', name: "课程FFF"},
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg', name: "课程GGG"},
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg', name: "课程HHH"}
    ],
    scrollFlag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options')
    var _this = this;
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
    wx.navigateTo({
      "url": "../detail/detail?name=" + name+"&id="+index
    })
    console.log(e.target.id);
  },
  bindchange: function (e) {//轮播图发生改变
    this.setData({
      current: e.detail.current
    })
  },
  
  changeImage(e){
    let index = e.target.id
    let name = e.target.dataset.name
    console.log(e.target.id)
    console.log(name)
    wx.navigateTo({
      "url": "../detail/detail?name=" + name + "&id=" + index
    })
  } 
})