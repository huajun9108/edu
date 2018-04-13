// pages/examInterFace/examInterFace.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examFlag: true,
    interfaceText: "测验简介",
    interfaceContent: "很长很长的名字很长很长的名字很长很长的名字很长很长很长的名字很长很长的名zi很长很长的名字很长很长很长的名字很长很长的名字很长很长的名字很长很长很长的名字很长很长的名zi很长很长的名字很长",
    pubText: "发布时间",
    pubTime: "2018/3/29",
    startText: "开始时间",
    startTime: "2018/3/30 00:00:00",
    endText: "截止时间",
    endTime: "2018/4/30 00:00:00",
    answerText: "答题时长",
    answerTime: "60分钟",
    testSet: "题型设置",
    testContent: "20道选择题,每题5分,满分100分，60分及格",
    testRequire: "测验要求",
    testRequireCon: "考生需要在测验规定的时长内完成作答,在规定时间内答题完成可以手动提交答卷,超过时间系统会自动提交答卷结束测验。",
    is_modal_Hidden: true,
    is_modal_msg: "是否确认开始答写",
    cancelText: "稍后再来",
    sureText: "现在答写"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let exam_type=""
    if (options.exam_type==1){
      exam_type ="[练习]"
    } else if (options.exam_type == 2){
      exam_type = "[考试]"
    } else if (options.exam_type == 3) {
      exam_type = "[调研]"
    }else{}
    let title = exam_type+options.title
    this.setData({
      title: title,
      examFlag: options.exam_flag
    });
    wx.setNavigationBarTitle({
      title: title,
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
  addMyFavor() {
    this.setData({
      isCollected: !this.data.isCollected
    });
  },
  startExam() {
    this.setData({
      is_modal_Hidden: false
    });
  },
  confirm() {
    // wx.navigateTo({
    //   url: '../answer/answer?title=' + this.data.title,
    // })
  }
})