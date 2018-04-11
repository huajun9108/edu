// pages/exam/exam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examList:[
      {
        title:"快来，2018年上半年工业工程信心调研！",
        people:"89",
        endTime:"2018/3/30 10:00:00"
      },
      {
        title: "快来，2018年上半年工业工程信心调研！",
        people: "89",
        endTime: "2018/3/30 10:00:00"
      },
      {
        title: "快来，2018年上半年工业工程信心调研！",
        people: "89",
        endTime: "2018/3/30 10:00:00"
      },
      {
        title: "快来，2018年上半年工业工程信心调研！",
        people: "89",
        endTime: "2018/3/30 10:00:00"
      },
      {
        title: "快来，2018年上半年工业工程信心调研！",
        people: "89",
        endTime: "2018/3/30 10:00:00"
      }
    ],
    examListEnd:[
      {
        title: "[练习]“5S”核心知识测验",
        people: "89",
        pass: "2018/3/30 10:00:00",
        score:10
      },
      {
        title: "[练习]“5S”核心知识测验",
        people: "89",
        pass: "2018/3/30 10:00:00",
        score: 10
      },
      {
        title: "[练习]“5S”核心知识测验",
        people: "89",
        pass: "2018/3/30 10:00:00",
        score: 10
      },
      {
        title: "[练习]“5S”核心知识测验",
        people: "89",
        pass: "2018/3/30 10:00:00",
        score: 10
      },
      
    ],
    people_num: "已参加",
    pass_rate: "截止时间",
    average: "预计用时"
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
  toMoreUrl(){
    wx.navigateTo({
      url: '../examList/examList',
    })
  }
})