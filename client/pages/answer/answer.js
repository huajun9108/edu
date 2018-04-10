// pages/answer/answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerList:[
      { option: "A", select: false },
      { option: "B", select: false },
      { option: "C", select: false },
      { option: "D", select: false }
    ],
    quList:[
      {
        title:"5S运动是一项什么样的工作",
        options:[ "暂时性","流行性","持久性","时尚的"]
      },
      {
        title: "5S运动是一项什么样的工作",
        options: ["暂时性", "流行性", "持久性", "时尚的"]
      },
      {
        title: "5S运动是一项什么样的工作",
        options: ["暂时性", "流行性", "持久性", "时尚的"]
      },
      {
        title: "5S运动是一项什么样的工作",
        options: ["暂时性", "流行性", "持久性", "时尚的"]
      },
      {
        title: "5S运动是一项什么样的工作",
        options: ["暂时性", "流行性", ]
      },
      {
        title: "5S运动是一项什么样的工作",
        options: ["暂时性", "流行性", "持久性", "时尚的"]
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
    let _this = this
    console.log(e)
    var this_checked = e.currentTarget.dataset.option
    var parameterList = this.data.answerList//获取Json数组
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].option == this_checked) {
        parameterList[i].select = true;//当前点击的位置为true即选中
      }
      else {
        parameterList[i].select = false;//其他的位置为false
      }
    }
    _this.setData({
      answerList0: parameterList
    })
  }
})