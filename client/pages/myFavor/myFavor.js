// pages/myFavor/myFavor.js
const config = require('../../config')
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    favorList: [],
    pageIsEmpty: false,
    tipMsg: "你还没有收藏记录哦",
    isLogin: true,
    isLoad: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
  },
  success(){
    this.setData({
      isLogin: true
    })
    this.getMyFavor();
  },
  fail(){
    this.setData({
      isLoad: true,
      isLogin: false
    })
  },
  login(){
    app.login(this.successFirst)
  },
  successFirst(){
    this.setData({
      isLogin: true
    })
    this.getMyFavor()
  },
  getMyFavor(){
    const url = config.service.myFavorListUrl;
    app.request.requestPostApi(url, { userId: app.data.userId }, this, this.myFavorListSuccessFun, this.myFavorListFailFun,1)
  },
  onShow: function () {
    // 页面显示
    this.checkNetworkandLoginStatus();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  checkNetworkandLoginStatus() {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType
        if (networkType === "none") {
          that.setData({
            isLoad: false
          });
        } else {
          that.setData({
            isLoad: true
          });
          app.testSession(that.success, that.fail)
        }
      }
    })
  },
  courseUrl(e){
    const courseId = e.detail.courseId;
    const title = e.detail.title;
    wx.navigateTo({
      url: `../detail/detail?id=${courseId}&name=${title}`,
    })
  },
  delConfirm(e){
    const select = e.detail.select
    const unselect = e.detail.unselect
    this.setData({
      select: select,
      unselect: unselect
    })
    if (select) {
      const batchDelMyFavorUrl = config.service.batchDelMyFavorUrl;
      app.request.requestPostApi(batchDelMyFavorUrl, { userId: app.data.userId, courseIds: select }, this, this.batchDelMyFavorSuccessFun, this.batchDelMyFavorFailFun);
    }
  },
  myFavorListSuccessFun(res, selfObj) {
    if(!res.data) return;
    var list = res.data;
    this.pageIsEmpty(list)
    for(let i = 0; i<list.length; i++) {
      list[i].icon = app.data.iconUrl + list[i].icon;
    }
    this.setData({
      favorList: list,
      isLoad: true
    })
  },
  myFavorListFailFun() {
    this.setData({
      isLoad: false
    })
  },
  load(){
    this.checkNetworkandLoginStatus();
  },
  batchDelMyFavorSuccessFun(res) {
    if(res.status === "0") {
      this.setData({
        favorList: this.data.unselect,
        num: 0
      })
    }
    this.pageIsEmpty(this.data.unselect)
  },
  batchDelMyFavorFailFun() {
    
  },
  pageIsEmpty(arr){
    if (arr.length===0){
      this.setData({
        pageIsEmpty: true
      })
    }
  }
})  