// pages/examInterFace/examInterFace.js
const app = getApp();
const config = require('../../config')
const util = require('../../utils/util.js')

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
    isLoad: true,
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
    this.selectExamInfo();
  },
  selectExamInfo() {
    const selectExamByUserIdAndExamIdUrl = config.service.selectExamByUserIdAndExamIdUrl;
    app.request.requestPostApi(selectExamByUserIdAndExamIdUrl, { userId: app.data.userId, examId: this.data.examId },
      this, this.selectExamSuccessFun, this.selectExamFailFun);
  },
  selectExamSuccessFun(res){
    console.log(res)
    // this.setData({
    //   attendFlag:1
    // })
    this.setData({
      interfaceContent: res.data.interfaceContent,
      totalTime: res.data.answerTime / 1000,
      isCollected: res.data.isCollected,
      isLoad: true
    });
    if (res.data.attendFlag) {
      wx.setNavigationBarTitle({
        title: '我的成绩',
      });
      this.setData({
        attendFlag: res.data.attendFlag,
        myUsingTime: util.formatSeconds(res.data.useTime/1000),
        myScore: res.data.score + '分',
        myRanking: '第'+ res.data.ranking + '名',
      });
    } else {
      this.setData({
        pubTime: res.data.pubTime,
        startTime: res.data.startTime,
        endTime: res.data.endTime,
        testContent: res.data.testContent,
        testRequireCon: res.data.testRequireCon,
        answerTime: res.data.answerTime/60000 + "分钟",
      });
    }
  },
  selectExamFailFun() {
    this.setData({
      isLoad: false
    });
  },
  load() {
    this.selectExamInfo();
  },
  loginFail() {
    this.setData({
      isLogin: false
    })
  },
  login() {
    app.login(this.loginSuccess);
  },

  isAddMyFavor() {
    if (this.data.isCollected) {
      this.delMyFavor()
    } else {
      this.addMyFavor()
    }
  },
  addMyFavor(){
    const url = config.service.addOneExamCollectionUrl;
    app.request.requestPostApi(
      url, { userId: app.data.userId, examId: this.data.examId }, 
      this, this.addMyFavorSuccess, this.addMyFavorFail);
  },
  //用户删除收藏
  delMyFavor() {
    const delMyFavorUrl = config.service.deleteExamCollectionUrl;
    app.request.requestPostApi(
      delMyFavorUrl, { userId: app.data.userId, examIds: this.data.examId },
      this,
      this.delMyFavorSuccessFun,
      this.delMyFavorFailFun);
  },
  /**
  * 用户删除收藏成功
  */
  delMyFavorSuccessFun(res) {
    if (res.status === "0") {
      util.showSuccess('已取消收藏');
      this.setData({
        isCollected: false
      });
    }
  },
  /**
  * 用户删除收藏失败
  */
  delMyFavorFailFun() {
    util.showFail('网络错误,请稍后再试');
  },
  addMyFavorSuccess(res) {
    if(res.status === "0") {
      util.showSuccess('收藏成功');
      this.setData({
        isCollected: true
      });
    }
  },
  addMyFavorFail(res) {
    util.showFail('网络错误,请稍后再试');
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
    console.log(this.data.answerTime);
    
    console.log(this.data.totalTime);
    wx.redirectTo({
      url: `../answer/answer?title=${this.data.title}&id=${this.data.examId}&exam_type=${this.data.examType}&exam_time=${this.data.totalTime}`,
    })
  },
  examParseClick(){
    console.log(this.data.examId);
    wx.redirectTo({
      url: `../examParse/examParse?title=${this.data.title}&id=${this.data.examId}`,
    })
  }
})