// pages/detail/detail.js
var sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
var config = require('../../config')
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    flag: false,

    detailnum: null,
    originalPrice: '待定',
    vipPrice: '待定',
    peopleBuy: 0,
    src: '',
    teacherName: '',
    teacherTitle: '',
    teacherDetail: '',
    courseId: null,
    userId: '',
    courseIsCollected: false,
    imgUrls: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg', },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg', },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg', },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg', },
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg', },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg', },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg', },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg', }
    ],
    imgSrc: null,
    controls: true,
    play: "../../images/play.png",
    tabs: ["简介", "目录", "老师"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    vipFlag: 1,
    // courseList:[
    //   {
    //     title:"第一部分",
    //     list:[
    //       { detail: "01.AAAAAAAAAAAA",id:0},
    //       { detail: "02.AAAAAAAAAAAA", id: 1},
    //       { detail: "03.AAAAAAAAAAAA", id: 2 }
    //     ]
    //   },
    //   {
    //     title: "第二部分",
    //     list: [
    //       { detail: "01.AAAAAAAAAAAA", id: 3 },
    //       { detail: "02.AAAAAAAAAAAA", id: 4 },
    //       { detail: "03.AAAAAAAAAAAA", id: 5 },
    //       { detail: "04.AAAAAAAAAAAA", id: 6}
    //     ]
    //   },
    //   {
    //     title: "第三部分",
    //     list: [
    //       { detail: "01.AAAAAAAAAAAA", id: 7 },
    //       { detail: "02.AAAAAAAAAAAA", id: 8},
    //       { detail: "03.AAAAAAAAAAAA", id: 9},
    //       { detail: "04.AAAAAAAAAAAA", id: 10 },
    //       { detail: "05.AAAAAAAAAAAA", id: 11},

    //     ]
    //   },
    //   {
    //     title: "第四部分",
    //     list: [
    //       { detail: "01.AAAAAAAAAAAA", id: 12 },
    //       { detail: "02.AAAAAAAAAAAA", id: 13 },
    //       { detail: "03.AAAAAAAAAAAA", id: 14},
    //       { detail: "04.AAAAAAAAAAAA", id: 15},
    //       { detail: "05.AAAAAAAAAAAA", id: 16},
    //       { detail: "06.AAAAAAAAAAAA", id: 17}
    //     ]
    //   }
    // ],
    // courseIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    this.setData({
      detailnum: options.name,
      userId: app.data.userId,
      courseId: options.id,
    });
    wx.setNavigationBarTitle({
      title: that.data.detailnum//页面标题为路由参数
    });
    const courseDetailUrl = config.service.courseDetailUrl;
    app.request.requestPostApi(courseDetailUrl, { userId: app.data.userId, courseId: options.id },
      this, this.courseDetailSuccessFun, this.courseDetailFailFun);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo')
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
  play() {
    this.videoCtx.play()
    this.setData({
      flag: false
    })
  },
  buyCourse() {
    wx.navigateTo({
      "url": "../buyCourse/buyCourse"
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  chooseCourse(e) {
    console.log(e)
    this.setData({
      courseIndex: e.currentTarget.id,
      src: e.currentTarget.dataset.src
    })
    console.log(this.data.courseIndex)
  },
  addMyFavor(e) {
    if (!this.data.courseId || !this.data.userId) {
      wx.showModal({
        content: '尚未登录账号',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return;
    }
    if(this.data.courseIsCollected) {
      console.log("取消收藏");
    } else {
      const addMyFavorUrl = config.service.addMyFavorUrl;
      app.request.requestPostApi(addMyFavorUrl, { userId: this.data.userId, courseId: this.data.courseId }, this, this.addMyFavorSuccessFun, this.addMyFavorFailFun);
    }
  },
  addMyFavorSuccessFun(res) {
    console.log(res);
    if (res.status === "0") {
      console.log("收藏成功");
      this.setData({
        courseIsCollected: true,
      })
    }
  },
  addMyFavorFailFun(res) {
    console.log(res);
  },
  courseDetailSuccessFun(res) {
    console.log(res);
    this.setData({
      imgSrc: res.data.img,
      originalPrice: res.data.synopsis.price,
      vipPrice: res.data.synopsis.vip_price,
      peopleBuy: res.data.synopsis.buy_num,
      src: res.data.video_url,
      courseList: res.data.catalog,
      teacherName: res.data.teacher.name,
      teacherTitle: res.data.teacher.job,
      teacherDetail: res.data.teacher.synopsis,
      courseIndex: res.data.catalog[0].list[0].id,
      courseIsCollected: res.data.collect_status,
    })
  },
  courseDetailFailFun() {
  }
})