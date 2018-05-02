// pages/myTest/myTest.js
const sliderWidth = 64;
const app = getApp();
const config = require('../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["历史测验", "收藏测验"],
    activeIndex: "0",
    sliderOffset: 0,

    //type 试题类型 1: 练习, 2: 考试, 3: 调研
    //flag 测试状态 -1: 已结束, 0: 正在进行, 1: 尚未开始
    //status 是否参加过考试 0: 未参加, 1: 参加过
    //收藏测验列表数据
    //历史测验列表数据
    showTime: true,
    exam_msg: "参加时间",
    isLoad: true,
    isLogin: true,

    //编辑收藏测试时样式控制变量
    hideStatus: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.testSession(this.loginSuccess, this.loginFail);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth /2/ that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth/2/that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('myTest onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('myTest onShow');
    if(this.data.activeIndex === "1") {
      this.selectCollection();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('myTest onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('myTest onUnload');
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

  loginSuccess() {
    this.setData({
      isLogin: true
    });
    this.selectHistory();
  },
  loginFail() {
    this.setData({
      isLoad: true,
      isLogin: false
    });
  },
  load() {
    if(this.data.activeIndex === "0") {
      this.selectHistory();
    } else if(this.data.activeIndex === "1") {
      this.selectCollection();
    }
  },
  login() {
    app.login(this.loginSuccess);
  },
  selectHistory() {
    const selectExamAttendByUserIdUrl = config.service.selectExamAttendByUserIdUrl;
    app.request.requestPostApi(selectExamAttendByUserIdUrl, {userId: app.data.userId}, this, this.selectHistorySuccess, this.selectHistoryFail);
  },
  selectHistorySuccess(res) {
    console.log(res);
    if(res.status === "0") {
      this.setData({
        examList: res.data,  
        isLoad: true
      });
      this.judgePageIsEmpty(res.data, "暂无历史测验相关信息");
    }
  },
  selectHistoryFail(res) {
    this.setData({
      isLoad: false
    })
  },
  selectCollection() {
    const url = config.service.selectExamCollectionByUserIdUrl;
    app.request.requestPostApi(url, {userId: app.data.userId}, this, this.selectCollectionSuccess, this.selectCollectionFail);
  },
  selectCollectionSuccess(res) {
    if(res.status === "0") {
      this.setData({
        selectExamList: res.data,
        hideStatus: true,
        isLoad: true
      });
      this.judgePageIsEmpty(this.data.selectExamList, "暂无收藏测验相关信息");
    }
  },
  selectCollectionFail(res) {
    this.setData({
      isLoad: false
    });
  },


  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id,
      sliderOffset: e.currentTarget.offsetLeft
    });
    if (e.currentTarget.id === "0") {
      this.setData({
        showTime: true,
      });
      this.judgePageIsEmpty(this.data.examList, "暂无历史测验相关信息");
    } else if (e.currentTarget.id === "1") {

      this.selectCollection();
      this.setData({
        hideStatus: true,
      });
    }
  },
  delConfirm(e) {
    console.log(e)
    const selectedId = e.detail.selected
     this.setData({
      unselected: e.detail.unselected,
    });
    const deleteExamCollectionUrl = config.service.deleteExamCollectionUrl;
    app.request.requestPostApi(deleteExamCollectionUrl, { userId: app.data.userId, examIds: selectedId }, this, this.deleteExamSuccessFun, this.deleteExamFailFun);
  },
  deleteExamSuccessFun(res){
    this.setData({
      selectExamList: this.data.unselected,
    });
    this.judgePageIsEmpty(this.data.selectExamList, "暂无收藏测验相关信息");
  },
  deleteExamFailFun(){

  },
  judgePageIsEmpty(list, tipMsg) {
    if (list.length === 0) {
      this.setData({
        pageIsEmpty: true,
        tipMsg: tipMsg
      });
    } else {
      this.setData({
        pageIsEmpty: false,
      })
    }
  },
  _examClick(e) {
    const id = e.currentTarget.dataset.id;
    const status = e.currentTarget.dataset.status;
    const exam_type = e.currentTarget.dataset.type;
    const flag = e.currentTarget.dataset.flag;
    const title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: `../examInterFace/examInterFace?id=${id}&exam_flag=${flag}&exam_type=${exam_type}&title=${title}&exam_status=${status}`,
    });
  }
})