// pages/examInterFace/examInterFace.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEllipsis:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      title: options.title
    });
    wx.setNavigationBarTitle({
      title: options.title,
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
    let _this = this
    wx.createSelectorQuery().select('.weui-form-preview_content').boundingClientRect(function (rect) {
      console.log(rect.height)
      _this.setData({
        height: rect.height
      })
      console.log(_this.data.height)
      if (_this.data.height > 44) {
        _this.setData({
          isEllipsis: true,
          isEllipsisShow: false
        })
      }else{
        _this.setData({
          isEllipsis: false,
          isEllipsisShow: true
        })
      }
      console.log(_this.data.isEllipsisShow)
    }).exec()
    
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
  addMyFavor(){
    this.setData({
      isCollected: !this.data.isCollected
    });
  },
  showAll(){
    console.log(this.data.isEllipsis)
    this.setData({
      isEllipsis: !this.data.isEllipsis
    });
    console.log(this.data.isEllipsis)
  },
  startExam(){
    wx.navigateTo({
      url: '../answer/answer?title='+this.data.title,
    })
  }
})