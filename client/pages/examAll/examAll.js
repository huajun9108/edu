// pages/examAll/examAll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTime:false,
    examList: [
      {
        title: "“5S”核心知识测验",
        type: 1,
        flag:1
      },
      {
        title: "“5S”核心知识测验",
        type: 1,
        flag: 1
      },
      {
        title: "“5S”核心知识测验",
        type: 1,
        flag: 1
      },
      {
        flag: 1,
        title: "“5S”核心知识测验",
        type: 1
      },
      {
        flag: 0,
        title: "“5S”核心知识测验",
        type: 3
      },
      {
        flag: -1,
        title: "“5S”核心知识测验",
        type: 2
      },
    ],
    exam_msg:"状态"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
    this.setData({
    })
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

})