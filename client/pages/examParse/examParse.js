// pages/examParse/examParse.js
const config = require('../../config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    quList: [],
    correctIcon: "../../images/correct_icon.png",
    errorIcon: "../../images/error_icon.png",
    isLoad: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      title: options.title,
      examId: options.id
    });
    this.selectAnswer();
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
  selectAnswer() {
    const selectAnswerByUserIdAndExamIdUrl = config.service.selectAnswerByUserIdAndExamIdUrl;
    app.request.requestPostApi(selectAnswerByUserIdAndExamIdUrl, {userId: app.data.userId, examId: this.data.examId}, this, this.selectAnswerSuccess, this.selectAnswerFail);
  },
  selectAnswerSuccess(res) {
    if(res.status === "0") {
      this.setData({
        quList: res.data,
        isLoad: true
      })
    }
  },
  selectAnswerFail() {
    this.setData({
      isLoad: false
    })
  },
  load() {
    this.selectAnswer()
  }
})