// pages/exam/exam.js
const app = getApp();
const config = require('../../config')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    people_num: "已参加",
    pass_rate: "截止时间",
    average: "预计用时",
    isLoad: true,
    imgUrl: app.data.iconUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExamPage();
    const selectAllExamTypeUrl = config.service.selectAllExamTypeUrl;
    let _this = this;
    app.request.requestGetApi(selectAllExamTypeUrl, {}, _this, _this.examTypeSuccess, _this.examMoreFail);
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
  getExamPage() {
    const examPageUrl = config.service.examPageUrl;
    app.request.requestGetApi(examPageUrl, {}, this, this.examPageSuccess, this.examPageFail);
  },
  load() {
    this.getExamPage();
  },
  examPageSuccess(res){
    this.setData({
      newest: res.data.newest,
      examListEnd: res.data.ongoing,
      isLoad: true,
    });
  },
  examPageFail(res) {
    this.setData({
      isLoad: false
    })
  },
  toMoreUrl(){
    wx.navigateTo({
      url: '../examList/examList',
    })
  },
  examClick(e){
    console.log(e)
    let examId = e.currentTarget.dataset.id;
    let examTitle = e.currentTarget.dataset.title;
    let examType = e.currentTarget.dataset.type;
    let examFlag = e.currentTarget.dataset.flag;
    wx.navigateTo({
      url: `../examInterFace/examInterFace?id=${examId}&title=${examTitle}&exam_type=${examType}&exam_flag=${examFlag}`
    })
  },
  examTypeSuccess(res) {
    console.log(res)
    wx.setStorage({
      key: "examType",
      data: res.data
    })
  },
})