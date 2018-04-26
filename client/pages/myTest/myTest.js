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

    //收藏测验列表数据
    collectionExamList: [
      {
        id: 0,
        selected: false,
        title: "“5S”核心知识测验",
        type: 2, //试题类型 1: 练习, 2: 考试, 3: 调研
        flag: -1, //测试状态 -1: 已结束, 0: 正在进行, 1: 尚未开始
        status: 0 //是否参加过考试 0: 未参加, 1: 参加过
      },
      {
        id: 1,
        selected: false,
        title: "“5S”核心知识测验",
        type: 1,
        flag: 0,
        status: 1
      },
      {
        id: 2,
        selected: false,
        title: "“5S”核心知识测验",
        type: 2,
        flag: 1,
        status: 1
      },
      {
        id: 3,
        selected: false,
        title: "“5S”核心知识测验",
        type: 1,
        flag: 0,
        status: 0
      },
      {
        id: 4,
        selected: false,
        title: "“5S”核心知识测验",
        type: 2,
        flag: -1,
        status: 1
      },
      {
        id: 5,
        selected: false,
        title: "“5S”核心知识测验",
        type: 1,
        flag: 1,
        status: 0
      },
    ],
    //历史测验列表数据
    historyExamList: [],

    showTime: true,
    examList: [],
    exam_msg: "",
    isLoad: true,
    isLogin: true,
    pageIsEmpty: false,
    tipMsg: '',

    //编辑收藏测试时样式控制变量
    delCss: "weui-flex-common",
    showCheckCss: "",
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
    this.selectHistory();
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
        historyExamList: res.data,
        examList: res.data,
        exam_msg: "参加时间",
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


  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id,
      sliderOffset: e.currentTarget.offsetLeft
    });
    if (e.currentTarget.id === "0") {
      this.setData({
        showTime: true,
        examList: this.data.historyExamList,
        exam_msg: "参加时间",
      });
      this.judgePageIsEmpty(this.data.historyExamList, "暂无历史测验相关信息");
    } else if (e.currentTarget.id === "1") {
      this.setData({
        delCss: "weui-flex-common",
        showCheckCss: "",
        hideStatus: true,
        examList: this.data.collectionExamList,
      });
      this.judgePageIsEmpty(this.data.collectionExamList, "暂无收藏测验相关信息");
    }
  },
  delConfirm(e) {
    this.setData({
      selected: e.detail.selected,
      examList: e.detail.unselected,
      collectionExamList: e.detail.unselected
    });
    this.judgePageIsEmpty(e.detail.unselected, "暂无收藏测验相关信息");
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
        tipMsg: ''
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