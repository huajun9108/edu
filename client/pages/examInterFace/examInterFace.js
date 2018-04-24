// pages/examInterFace/examInterFace.js
const app = getApp();
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    examShow: true,
    interfaceText: "测验简介",
    pubText: "发布时间",
    startText: "开始时间",
    endText: "截止时间",
    answerText: "答题时长",
    testSet: "题型设置",
    testRequire: "测验要求",
    myUsingTimeTitle: "我的用时",
    myScoreTitle: "我的得分",
    myRankingTitle: "我的排名",
    is_modal_Hidden: true,
    is_modal_msg: "是否确认开始答写\n如若中途退出\n系统将自动提交答卷",
    cancelText: "稍后再来",
    sureText: "现在答写",
    isLogin: true,
    options: {}, //保存页面跳转时传过来的参数
    attendFlag: false,
    isEllipsis: false,
    isEllipsisShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    let exam_type = ""
    if (options.exam_type == 1) {
      exam_type = "[练习]"
    } else if (options.exam_type == 2) {
      exam_type = "[考试]"
    } else if (options.exam_type == 3) {
      exam_type = "[调研]"
    } else { }
    let title = exam_type + options.title;
    options.title = title;
    this.setData({
      options: options
    });
    app.testSession(this.loginSuccess, this.loginFail);
    wx.setNavigationBarTitle({
      title: title,
    });
    
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
  loginSuccess(res) {
    let options = this.data.options;
    this.setData({
      examId: options.id,
      title: options.title,
      examFlag: options.exam_flag,
      examType: options.exam_type,
      isLogin: true
    });
    const selectExamByUserIdAndExamIdUrl = config.service.selectExamByUserIdAndExamIdUrl;
    app.request.requestPostApi(selectExamByUserIdAndExamIdUrl, { userId: app.data.userId, examId: this.data.examId },
      this, this.selectExamSuccessFun, this.selectExamFailFun);

  },
  selectExamSuccessFun(res){
    console.log(res)
    // this.setData({
    //   attendFlag:1
    // })res.data.attendFlag
    if (res.data.attendFlag) {
      wx.setNavigationBarTitle({
        title: '我的成绩',
      });
      this.setData({
        interfaceContent: res.data.interfaceContent,
        attendFlag: res.data.attendFlag,
        myUsingTime: res.data.useTime + '分钟',
        myScore: res.data.score + '分',
        myRanking: '第'+ res.data.ranking + '名'
      });
    } else {
      this.setData({
        interfaceContent: res.data.interfaceContent,
        pubTime: res.data.pubTime,
        startTime: res.data.startTime,
        endTime: res.data.endTime,
        testContent: res.data.testContent,
        testRequireCon: res.data.testRequireCon,
        answerTime: res.data.answerTime + "分钟",
        totalTime: res.data.answerTime
      });
    }
  },
  loginFail() {
    this.setData({
      isLogin: false
    })
  },
  login() {
    app.login(this.loginSuccess);
  },

  addMyFavor() {
    this.setData({
      isCollected: !this.data.isCollected
    });
  },
  startExam() {
    let _this = this
    if (this.data.examType==2){
      _this.setData({
        is_modal_Hidden: false
      });
    }else{
      this.confirm()
    }
    
  },
  confirm() {
    wx.redirectTo({
      url: `../answer/answer?title=${this.data.title}&id=${this.data.examId}
      &exam_type=${this.data.examType}&exam_time=${this.data.totalTime}`,
    })
  },
  examParseClick(){
    wx.redirectTo({
      url: '../examParse/examParse?title=' + this.data.title,
    })
  }
})