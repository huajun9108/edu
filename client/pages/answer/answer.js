// pages/answer/answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quList:[
      {
        title:"5S运动是一项什么样的工作",
        a: "暂时性",
        b: "流行性",
        c: "持久性",
        d: "时尚的"
      },
      {
        title: "5S运动是一项什么样的工作",
        a: "暂时性",
        b: "流行性",
        c: "持久性",
        d: "时尚的"
      },
      {
        title: "5S运动是一项什么样的工作",
        a: "暂时性",
        b: "流行性",
        c: "持久性",
        d: "时尚的"
      },
      {
        title: "5S运动是一项什么样的工作",
        a: "暂时性",
        b: "流行性",
        c: "持久性",
        d: "时尚的"
      },
     
    ],
    duration: 800,
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.title)
    this.setData({
      quNum: this.data.quList.length
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
  quChange(e){
    this.setData({
      num: e.detail.current+1
    })
  },
  optionClick(e){
    console.log(e)
  }
})