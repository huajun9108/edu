// pages/myFavor/myFavor.js
var config = require('../../config')
var app = getApp()
Page({
  data: {
    favorList: [],
    select:[],
    pageIsEmpty: false,
    tipMsg: "你还没有收藏记录哦"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    const url = config.service.myFavorListUrl;
    console.log(app.data)
    app.request.requestPostApi(url, { userId: app.data.userId }, this, this.myFavorListSuccessFun, this.myFavorListFailFun)
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  courseUrl(e){
    const courseId = e.detail.courseId;
    const title = e.detail.title;
    wx.navigateTo({
      url: `../detail/detail?id=${courseId}&name=${title}`,
    })
  },
  // showModal(){
  //   console.log(2)
  //   // let arr = this.data.favorList;
  //   // let unselect = [];
  //   // let select = [];
  //   // for (let i = 0; i < arr.length; i++) {
  //   //   if (arr[i].selected == false) {
  //   //     unselect.push(arr[i]);
  //   //     this.setData({
  //   //       unselect: unselect,
  //   //     })
  //   //   }else{
  //   //     select.push(arr[i].id).toString()
  //   //     this.setData({
  //   //       select: select
  //   //     })
  //   //     if (select.length == arr.length){
  //   //       this.setData({
  //   //         unselect: []
  //   //       })
  //   //     }
  //   //   }
  //   // }
  //   // console.log(select.length)
  //   // if (select.length == 0) return;
  //   this.setData({
  //     is_modal_Hidden: false,
  //   })
  // },
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
    console.log(list)
    this.pageIsEmpty(list)
    for(let i = 0; i<list.length; i++) {
      //图片为本地图片，到时候需要修改
      list[i].icon = "../../images/xuex.png";
    }
    this.setData({
      favorList: list
    })
  },
  myFavorListFailFun() {

  },
  batchDelMyFavorSuccessFun(res) {
    console.log(res);
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