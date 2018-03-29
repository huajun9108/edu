// pages/detail/detail.js
const sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
const config = require('../../config')
const app = getApp();
const courseDetailUrl = config.service.courseDetailUrl;
const utils = require('../../utils/util.js')
const Session = require('../../vendor/wafer2-client-sdk/lib/session');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    autoplay: false,
    flag: true,
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
    vipFlag: false,
    collected_image: "../../images/heart_icon_focus.png",
    uncollected_image: "../../images/heart_icon_deafult.png",
    isLoad: false,
    teacherImage: "",

    is_modal_Hidden: true,
    is_modal_Msg: "你还未购买该课程",
    cancelText: "取消",
    sureText: "去购买",

    isLogin:true,
    tipText:"该课程需要登录后\n进行购买方可观看",
    btnText:"立即登录",
    
    loadText:"网络请求出错\n请您稍后再试",
    btnload:"重新加载",

    isWifi: false,
    networkText: '当前为非Wi-Fi环境，是否继续？',
    btnnetwork:'继续观看'
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      detailnum: options.name,
      courseId: options.id,
    });
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
      this, this.courseDetailSuccessFun, this.courseDetailFailFun,1);
  },
  sessionLoginFn(){
    this.setData({
      isLogin: true
    })
    if (Session.getIsVip()){
      this.setData({
        vipFlag: true
      })
    }else{
      this.setData({
        vipFlag: false
      })
    }
    this.getCourseDetail();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.testSession(this.sessionLoginFn, this.failLoginFn);
  },
  failLoginFn() {
    this.setData({
      isLogin: false
    })
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
  login(){
    app.login(this.sessionLoginFn)
  },
  /**
   * 视频播放控制
   */
  play() {
    let that = this;
    if (that.data.courseIsBuy) {
      wx.getNetworkType({
        success: function(res) {
          if(res.networkType === 'wifi') {
            that.setData({
              flag: false,
              autoplay: true
            });
          } else {
             wx.showModal({
               title: '提示',
               content: '当前为非wifi环境，是否继续？',
               success: function(res) {
                 if(res.confirm) {
                   that.setData({
                     flag: false,
                     autoplay: true
                   });
                 }
               },
               fail: function(res) {
                 utils.showFail('网络出错');
               }
             })
          }
        },
      })
    } else {
      that.setData({
        is_modal_Hidden: false
      });
    }    
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
    this.sessionLoginFn()
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
      src: e.currentTarget.dataset.src,
      autoplay:true
    })
    if (!this.data.courseIsBuy){
      this.setData({
        is_modal_Hidden: false
      })
    }
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
    this.sessionLoginFn()
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
      utils.showSuccess('收藏成功');
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
      utils.showSuccess('已取消收藏');
      this.setData({
        courseIsCollected: false
      });
    }
  },
  addMyFavorFailFun(res) {
    utils.showFail('网络错误,请稍后再试');
  },
  delMyFavorFailFun() {
    utils.showFail('网络错误,请稍后再试');
  },
  /**
   * 查询课程详情成功
   */
  courseDetailSuccessFun(res) {
    let that = this;
    this.setData({
      imgSrc: app.data.imgUrl+res.data.img,
      summary: res.data.synopsis.summary,
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
      teacherImage: app.data.iconUrl + res.data.teacher.icon_url,
      isLoad: false,
    })
    wx.getNetworkType({
      success: function(res) {
        if(res.networkType === 'wifi') {
          if (that.data.courseIsBuy){
            that.play()
          }
        }
      },
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
    app.login(this.sessionLoginFn)

  },
  getVipStatusAgainBeforeBuyCourseSuccessFn(res) {
    if (res.status === "0") {
      if (res.data.isVip !== this.data.vipFlag && this.data.vipFlag) {
        utils.showModel("提示", "您的vip账户已过期");
        const endDate = res.data.endTime.split('T')[0];
        Session.setIsVip(res.data.isVip);
        Session.setVipDate(endDate);
        this.setData({
          vipFlag: Session.getIsVip()
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
  },
  /**
   * 未购买提示框点击确认
   */
  confirm(){
    this.buyCourseFn()
  }
})
