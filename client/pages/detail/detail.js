// pages/detail/detail.js
var sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
var config = require('../../config')
var app = getApp();
const courseDetailUrl = config.service.courseDetailUrl;
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
        vipFlag: 1,
        collected_image: "../../images/heart_icon_focus.png",
        uncollected_image: "../../images/heart_icon_deafult.png"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log(options);
      var that = this;
      this.setData({
          detailnum: options.name,
          courseId: options.id,
      });
      wx.setNavigationBarTitle({
          title: that.data.detailnum //页面标题为路由参数
      });
      if (app.data.userId) {
        this.setData({
            userId: app.data.userId
        });
      }
      app.request.requestPostApi(courseDetailUrl, { userId: this.data.userId, courseId: options.id },
          that, that.courseDetailSuccessFun, that.courseDetailFailFun);
      wx.getSystemInfo({
          success: function(res) {
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
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

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
    buyCourseFn(){
      const title = this.data.detailnum;
      const price = this.data.vipPrice;
      const courseId = this.data.courseId;
      wx.navigateTo({
        "url": `../buyCourse/buyCourse?name=${title}&price=${price}&courseId=${courseId}`
      })
    },
    /**
     * 用户购买课程未登录
     */
    sessionFailbuyCourse() {
      app.login(this.successbuyCourse, this.success)
    },
    successbuyCourse() {
      this.successFirst()
      setTimeout(()=>{
        if (!this.data.courseIsBuy) {
          this.buyCourseFn()
        }
      },1000)
    },
    tabClick: function(e) {
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
    delMyFavorFunction(){
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
    sessionFailaddMyFavor(){
      app.login(this.successaddMyFavor, this.success)
    },
    successaddMyFavor(){
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
      })
    },
    /**
    * 查询课程详情失败
    */
    courseDetailFailFun() {},
    
   
    sessionFail() {
      app.login(this.successFirst, this.success)
    },
    successFirst() {
      app.request.requestPostApi(
        courseDetailUrl, { userId: app.data.userId, courseId: this.data.courseId },
        this,
        this.courseDetailSuccessFun,
        this.courseDetailFailFun
      );
    }
    
})