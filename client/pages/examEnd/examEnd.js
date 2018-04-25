// pages/examEnd/examEnd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examTip:"待考试结束后\n统一在历史测验中\n查看本次考试成绩与排名"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      examType: options.exam_type,
      examTime: options.exam_time,
      examScore: options.exam_score,
      examTitle: options.exam_title,
      examTotalTime: options.exam_total_time,
      examId: options.exam_id
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
  retestClick(){
    wx.redirectTo({
      url: `../answer/answer?title=${this.data.examTitle}&id=${this.data.examId}&exam_type=${this.data.examType}&exam_time=${this.data.examTotalTime}`,
    })

  },
  examParseClick(){
    wx.redirectTo({
      url: `../examParse/examParse?title=${this.data.examTitle}&id=${this.data.examId}`,
    })
  }
})