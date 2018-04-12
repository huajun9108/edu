// pages/examInterFace/examInterFace.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEllipsis:false,
    examFlag:true,
    examFaceList:[
      { title: "测验简介", content:"很长很长的名字很长很长的名字很长很长的名字很长很长很长的名字很长很长的名zi很长很长的名字很长"},
      { title: "发布时间", content: "2018/3/29"},
      { title: "开始时间", content: "2018/3/30 00:00:00" },
      { title: "截止时间", content: "2018/4/30 00:00:00" },
      { title: "答题时长", content: "60分钟" },
      { title: "题型设置", content: "20道选择题,每题5分,满分100分，60分及格" },
      { title: "测验要求", content: "考生需要在规定时间内完成作答,在规定时间内作答完成可以手动提交答拳,超过时间系统会自动提交" }
    ]
    
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
      if (_this.data.height > 30) {
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