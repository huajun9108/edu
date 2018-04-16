// pages/examAll/examAll.js
const config = require('../../config')
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTime:false,
    exam_msg:"状态",
    isLoad:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExamAll()
  },
   /**
   * 获取全部测试数据
   */
  getExamAll(){
    const selectAllExamUrl = config.service.selectAllExamUrl;
    console.log(selectAllExamUrl)
    app.request.requestGetApi(selectAllExamUrl, {}, this, this.examAllSuccess, this.examAllFail)
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
    this.setData({
      is_modal_Hidden: true
    });
    
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
  showSearch() {
    this.setData({
      is_modal_Hidden: false,
      inputShowed: true

    })
  },
   /**
   * 数据加载成功
   */
  examAllSuccess(res){
    this.setData({
      examList: res.data,
      isLoad: true
    });
  },
  /**
   * 数据加载失败
   */
  examAllFail(){
    this.setData({
      isLoad: false
    });
  },
  load(){
    this.getExamAll()    
  },
  _examClick(e){
    let examId = e.currentTarget.dataset.id;
    let examTitle = e.currentTarget.dataset.title;
    let examType = e.currentTarget.dataset.type;
    let examFlag = e.currentTarget.dataset.flag;
    wx.navigateTo({
      url: `../examInterFace/examInterFace?id=${examId}&title=${examTitle}&exam_type=${examType}&exam_flag=${examFlag}`,
    })
  }

})