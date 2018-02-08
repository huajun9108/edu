// pages/course/course.js
var util = require('../../utils/util.js')
var config = require('../../config')
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
    tipMsg: "您访问的页面为空···"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    var _this = this;
    // util.showBusy('请求中...')
    wx.request({
      url: config.service.courseUrl,
      success: function (res) {
        // util.showSuccess('请求成功')
        console.log(res.data);
        if(res.data.data.length <= 0) {
          _this.setData(
            {
              pageIsEmpty: true,
            }
          )
        } else {
          _this.setData(
            {
              courseDir: res.data.data,
              pageIsEmpty: false,
            }
          )
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("show")
    this.setData({
      is_modal_Hidden: true
    });
    console.log(this.data.is_modal_Hidden)
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
    console.log("onUnload")
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
  }
})
