// pages/detail/detail.js
var sliderWidth =80; // 需要设置slider的宽度，用于计算中间位置
var config = require('../../config')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    detailnum:null,
    originalPrice: '待定',
    vipPrice: '待定',
    peopleBuy: 0,
    src: '',
    teacherName: '',
    teacherTitle: '',
    teacherDetail: '',                //src:"http://1255958190.vod2.myqcloud.com/87e07c54vodtransgzp1255958190/319297944564972819219441937/v.f20.mp4",
    imgUrls: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg',},
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg', },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg', },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg', },
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg', },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg',  },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg', },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg', }         
    ],
    imgSrc: null,
    controls:true,
    play: "../../images/play.png",
    tabs: ["简介", "目录", "老师"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    vipFlag:1,
    courseList:[
      {
        title:"第一部分",
        list:[
          { detail: "01.AAAAAAAAAAAA"},
          { detail: "02.AAAAAAAAAAAA"},
          { detail: "03.AAAAAAAAAAAA" }
        ]
      },
      {
        title: "第二部分",
        list: [
          { detail: "01.AAAAAAAAAAAA" },
          { detail: "02.AAAAAAAAAAAA" },
          { detail: "03.AAAAAAAAAAAA" },
          { detail: "04.AAAAAAAAAAAA" }
        ]
      },
      {
        title: "第三部分",
        list: [
          { detail: "01.AAAAAAAAAAAA" },
          { detail: "02.AAAAAAAAAAAA" },
          { detail: "03.AAAAAAAAAAAA" },
          { detail: "04.AAAAAAAAAAAA" },
          { detail: "05.AAAAAAAAAAAA" },
          
        ]
      },
      {
        title: "第四部分",
        list: [
          { detail: "01.AAAAAAAAAAAA" },
          { detail: "02.AAAAAAAAAAAA" },
          { detail: "03.AAAAAAAAAAAA" },
          { detail: "04.AAAAAAAAAAAA" },
          { detail: "05.AAAAAAAAAAAA" },
          { detail: "06.AAAAAAAAAAAA" }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    this.setData({
      detailnum: options.name,
    });
    wx.setNavigationBarTitle({
      title: that.data.detailnum//页面标题为路由参数
    });
    wx.request({
      url: config.service.courseDetailUrl,
      method: 'POST',
      data: {
        id: options.id
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          imgSrc: res.data.data.img,
          originalPrice: res.data.data.synopsis.price,
          vipPrice: res.data.data.synopsis.vip_price,
          peopleBuy: res.data.data.synopsis.buy_num,
          src: res.data.data.video_url,
          courseList: res.data.data.catalog,
          teacherName: res.data.data.teacher.name,
          teacherTitle: res.data.data.teacher.job,
          teacherDetail: res.data.data.teacher.synopsis
        })
      }
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
      flag:false
    })
  },
  buyCourse(){
    wx.navigateTo({
      "url": "../buyCourse/buyCourse"
    })
  }  ,
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})