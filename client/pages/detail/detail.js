// pages/detail/detail.js
const sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
const config = require('../../config')
const app = getApp();
const courseDetailUrl = config.service.courseDetailUrl;
const utils = require('../../utils/util.js')
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
    userId: -1,
    courseIsCollected: 0,
    courseIsBuy: 0,
    imgSrc: null,
    controls: true,
    play: "../../images/play.png",
    tabs: ["简介", "目录", "老师"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    vipFlag: app.data.isVip,
    collected_image: "../../images/heart_icon_focus.png",
    uncollected_image: "../../images/heart_icon_deafult.png",
    isLoad: false,
    teacherImage: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.data.isVip)
    console.log(options);
    var that = this;
    this.setData({
      detailnum: options.name,
      courseId: options.id,
      vipFlag: app.data.isVip
    });
    console.log(this.data.vipFlag)

    wx.setNavigationBarTitle({
      title: that.data.detailnum //页面标题为路由参数
    });
    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  getCourseDetail() {
    if (app.data.userId) {
      this.setData({
        userId: app.data.userId
      });
    }
    app.request.requestPostApi(courseDetailUrl, { userId: this.data.userId, courseId: this.data.courseId },
      this, this.courseDetailSuccessFun, this.courseDetailFailFun);
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
    this.getCourseDetail();
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
  /**
   * 视频播放控制
   */
  play() {
    this.videoCtx.play()
    this.setData({
      flag: false
    })
  },
  /**
   * 用户购买课程判断是否已登录
   */
  buyCourse() {
    app.testSession(this.buyCourseFn, this.sessionFailbuyCourse)
  },
  /**
   * 用户购买课程已登录
   */
  buyCourseFn() {
    const getVipStatusUrl = config.service.getVipStatusUrl;
    app.request.requestPostApi(getVipStatusUrl, { userId: app.data.userId }, this, this.getVipStatusAgainBeforeBuyCourseSuccessFn, this.getVipStatusAgainBeforeBuyCourseFailFn);
  },
  /**
   * 用户购买课程未登录
   */
  sessionFailbuyCourse() {
    app.login(this.successbuyCourse)
  },
  successbuyCourse() {
    this.successFirst()
    setTimeout(() => {
      if (!this.data.courseIsBuy) {
        this.buyCourseFn()
      }
    }, 100)
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 用户观看课程判断是否已登录
   */
  chooseCourse(e) {
    app.testSession(this.chooseCourseFn, this.sessionFail, e)
  },
  /**
   * 用户观看课程已登录
   */
  chooseCourseFn(e) {
    this.setData({
      courseIndex: e.currentTarget.id,
      src: e.currentTarget.dataset.src
    })
  },
  chooseCourseFail() {

  },
  /**
   * 用户添加收藏判断是否登录
   */
  addMyFavor() {
    app.testSession(this.addMyFavorFn, this.sessionFailaddMyFavor)
  },
  /**
   * 用户添加收藏已登录
   */
  addMyFavorFn() {
    if (this.data.courseIsCollected) {
      this.delMyFavorFunction()
    } else {
      this.addMyFavorFunction()
    }
  },
  /**
   * 用户删除收藏
   */
  delMyFavorFunction() {
    const delMyFavorUrl = config.service.delMyFavorUrl;
    app.request.requestPostApi(
      delMyFavorUrl, { userId: app.data.userId, courseId: this.data.courseId },
      this,
      this.delMyFavorSuccessFun,
      this.delMyFavorFailFun);
  },
  /**
   * 用户添加收藏
   */
  addMyFavorFunction() {
    const addMyFavorUrl = config.service.addMyFavorUrl;
    app.request.requestPostApi(
      addMyFavorUrl, { userId: app.data.userId, courseId: this.data.courseId },
      this,
      this.addMyFavorSuccessFun,
      this.addMyFavorFailFun);
  },
  /**
   * 用户添加收藏未登录
   */
  sessionFailaddMyFavor() {
    app.login(this.successaddMyFavor)
  },
  successaddMyFavor() {
    this.successFirst()
    setTimeout(() => {
      if (!this.data.courseIsCollected) {
        this.addMyFavorFunction()
      }
    }, 100)
  },
  /**
   * 用户添加收藏成功
   */
  addMyFavorSuccessFun(res) {
    if (res.status === "0") {
      this.setData({
        courseIsCollected: true,
      })
    }
  },
  /**
   * 用户删除收藏成功
   */
  delMyFavorSuccessFun(res) {
    if (res.status === "0") {
      this.setData({
        courseIsCollected: false
      });
    }
  },
  addMyFavorFailFun(res) {
    console.log(res);
  },
  delMyFavorFailFun() {

  },
  /**
   * 查询课程详情成功
   */
  courseDetailSuccessFun(res) {
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
      courseIsBuy: res.data.buy_status,
      teacherImage: app.data.iconUrl + res.data.img,
      isLoad: false
    })
  },
  /**
   * 查询课程详情失败
   */
  courseDetailFailFun() {
    this.setData({
      isLoad: true
    })
  },
  load() {
    this.getCourseDetail()
  },

  sessionFail() {
    app.login(this.successFirst)
  },
  successFirst() {
    app.request.requestPostApi(
      courseDetailUrl, { userId: app.data.userId, courseId: this.data.courseId },
      this,
      this.courseDetailSuccessFun,
      this.courseDetailFailFun
    );
  },
  getVipStatusAgainBeforeBuyCourseSuccessFn(res) {
    if (res.status === "0") {
      if (res.data.isVip !== this.data.vipFlag && this.data.vipFlag) {
        utils.showModel("提示", "您的vip账户已过期");
        app.data.isVip = res.data.isVip;
        app.data.vipDate = utils.formatTime(new Date(res.data.endTime));
        console.log(app.data.vipDate);
        this.setData({
          vipFlag: res.data.isVip
        });
        return;
      }
      const title = this.data.detailnum;
      let price;
      if (this.data.vipFlag) {
        // price = this.data.vipPrice;
        price = 0.01;
      } else {
        // price = this.data.originalPrice;
        price = 0.02;
      }

      const courseId = this.data.courseId;
      wx.navigateTo({
        "url": `../buyCourse/buyCourse?name=${title}&price=${price}&courseId=${courseId}`
      });


    }
  }
})
