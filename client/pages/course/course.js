// pages/course/course.js
var config = require('../../config')
var app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    open: true,
    courseDir: [
      {
        title: "全部课程",
        flag: true,
      },
      {
        flag: false,
        title: "工艺",
        children: [
          {
            title: "工艺AAA"
          },
          {
            title: "工艺BBB"
          },
          {
            title: "工艺CCC"
          }
        ]
      },
      {
        flag: false,
        title: "管理",
        children: [
          {
            title: "管理AAA"
          },
          {
            title: "管理BBB"
          },
          {
            title: "管理CCC"
          }
        ]
      }
    ],
    is_modal_Hidden: true,
    searchList:["价值工程","质量工程","项目管理","管理工程","供应链管理","人因工程","运筹学","工作设计","金融工程","设施管理"],
    inputShowed:false,
    courseDir: [],
    pageIsEmpty: false,
    tipMsg: "该课程暂无分类,请后续关注"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const url = config.service.courseUrl
    app.request.requestGetApi(url, {}, this, this.successFun, this.failFun)
    // wx.request({
    //   url: config.service.courseUrl,
    //   success: function (res) {
    //     wx.hideToast()
    //     
    //   }
    // });
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
    this.setData({
      is_modal_Hidden: true
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      is_modal_Hidden: true
    });
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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  showSearch(){
    this.setData({
      is_modal_Hidden: false,
      inputShowed:true

    })
  },
  courseListClick(e){
    let title = e.currentTarget.dataset.title
    let type = e.currentTarget.dataset.type
    let id = e.currentTarget.dataset.id
    let url = `../courseList/courseList?title=${title}&type=${type}&id=${id}`
    wx.navigateTo({
      url: url
    })
  },
  successFun(res, selfObj){
    if (res.data.length <= 0) {
      this.setData({
        pageIsEmpty: true,
      })
    } else {
      this.setData({
        courseDir: res.data,
        pageIsEmpty: false,
      })
    }
  },
  failFun(){

  }
  
})
