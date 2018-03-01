// pages/myFavor/myFavor.js
var config = require('../../config')
var app = getApp()
Page({
  data: {
    favorList: [],
    num:0,
    delCss:"weui-flex-common",
    checkSrc:"../../images/select.png",
    uncheckSrc: "../../images/unselect.png",
    selectedAllStatus: false,
    hoverActive:"weui-cell_active",
    courseTap:"courseUrl",
    is_modal_Hidden: true,
    is_modal_Msg: "你确定要狠心删除我吗？" ,
    selectAll:"全选",
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
  showDel(){
    this.setData({
      delCss: "weui-flex-up",
      showCheckCss: "weui-cells-right",
      courseTap:null,
      hoverActive:null
    })
  },
  hideDel(){
    let favorList = this.data.favorList;
    for (let i = 0; i < favorList.length; i++) {
      favorList[i].selected = false;
    }
    this.setData({
      favorList: favorList,
      delCss: "weui-flex-down",
      showCheckCss: "weui-cells-left",
      selectedAllStatus:false,
      courseTap: "courseUrl",
      hoverActive: "weui-cell_active"
    })
    this.bindTotalNum();
  },
  bindCheckbox(e){
    console.log("bindCheckbox");
    let index = e.currentTarget.dataset.index
    let selected = this.data.favorList[index].selected;
    let favorList = this.data.favorList;
    favorList[index].selected = !selected;
    this.setData({
      favorList: favorList
    });
    this.bindTotalNum();
  },
  bindSelectAll(e){
    let selectedAllStatus = this.data.selectedAllStatus;
    let favorList = this.data.favorList;
    selectedAllStatus = !selectedAllStatus;
    for (let i = 0; i < favorList.length; i++) {
      favorList[i].selected = selectedAllStatus;
    }
    this.setData({
      favorList: favorList,
      selectedAllStatus: selectedAllStatus

    });
    this.bindTotalNum();
  },
  bindTotalNum(){
    let favorList = this.data.favorList;
    let num = 0
    for (let i = 0; i < favorList.length; i++) {
      if (favorList[i].selected){
        num ++
      }
    }
    if (num == favorList.length){
      this.setData({
        selectAll: "取消全选",
        selectedAllStatus: true,
      });
    }else{
      this.setData({
        selectAll: "全选"
      });
    }
    this.setData({
      num:num
    });
  },
  courseUrl(e){
    const courseId = e.currentTarget.dataset.courseid;
    const title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: `../detail/detail?id=${courseId}&name=${title}`,
    })
  },
  delItem(){
    let arr = this.data.favorList;
    let unselect = [];
    let select = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].selected == false) {
        unselect.push(arr[i]);
        this.setData({
          unselect: unselect,
        })
      }else{
        select.push(arr[i].id).toString()
        this.setData({
          select: select
        })
        if (select.length == arr.length){
          this.setData({
            unselect: []
          })
        }
      }
    }
    if (select.length == 0) return;
    this.setData({
      is_modal_Hidden: false,
    })
  },
  delConfirm(){
    console.log(2)
    if(this.data.select) {
      const batchDelMyFavorUrl = config.service.batchDelMyFavorUrl;
      app.request.requestPostApi(batchDelMyFavorUrl, { userId: app.data.userId, courseIds: this.data.select }, this, this.batchDelMyFavorSuccessFun, this.batchDelMyFavorFailFun);
    }
  },
  myFavorListSuccessFun(res, selfObj) {
    if(!res.data) return;
    var list = res.data;
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