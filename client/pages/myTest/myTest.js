// pages/myTest/myTest.js
const sliderWidth = 64;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["历史测验", "收藏测验"],
    activeIndex: "0",
    sliderOffset: 0,

    //收藏测验列表数据
    collectionExamList: [
      {
        id: 0,
        selected: false,
        title: "[练习]“5S”核心知识测验",
        type: 1
      },
      {
        id: 0,
        selected: false,
        title: "[练习]“5S”核心知识测验",
        type: 1
      },
      {
        id: 0,
        selected: false,
        title: "[练习]“5S”核心知识测验",
        type: 1
      },
      {
        id: 0,
        selected: false,
        title: "[练习]“5S”核心知识测验",
        type: 0
      },
      {
        id: 0,
        selected: false,
        title: "[练习]“5S”核心知识测验",
        type: 0
      },
      {
        id: 0,
        selected: false,
        title: "[练习]“5S”核心知识测验",
        type: 2
      },
    ],
    //历史测验列表数据
    historyExamList: [
      {
        id: 0,
        title: "[练习]“5S”核心知识测验",
        endTime: "2018/3/30 10:00:00",
        selected: false
      },
      {
        id: 1,
        title: "[练习]“5S”核心知识测验",
        endTime: "2018/3/30 10:00:00",
        selected: false
      },
      {
        id: 2,
        title: "[练习]“5S”核心知识测验",
        endTime: "2018/3/30 10:00:00",
        selected: false
      },
      {
        id: 3,
        title: "[练习]“5S”核心知识测验",
        endTime: "2018/3/30 10:00:00",
        selected: false
      },
      {
        id: 4,
        title: "[练习]“5S”核心知识测验",
        endTime: "2018/3/30 10:00:00",
        selected: false
      }
    ],
    showTime: true,
    examList: [],
    exam_msg: "",

    delCss: "weui-flex-common",
    showCheckCss: "",
    hideStatus: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('myTest onLoad');
    this.setData({
      examList: this.data.historyExamList,
      exam_msg: "参加时间"
    });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          sliderLeft: (res.windowWidth /2/ that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth/2/that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('myTest onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('myTest onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('myTest onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('myTest onUnload');
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
  tabClick: function (e) {
    console.log(e);
    this.setData({
      activeIndex: e.currentTarget.id,
      sliderOffset: e.currentTarget.offsetLeft
    });
    if (e.currentTarget.id === "0") {
      this.setData({
        showTime: true,
        examList: this.data.historyExamList,
        exam_msg: "参加时间",
        // sliderOffset: 0
      });
    } else if (e.currentTarget.id === "1") {
      this.setData({
        delCss: "weui-flex-common",
        showCheckCss: "",
        hideStatus: true,
        examList: this.data.collectionExamList,
        // sliderOffset: e.currentTarget.offsetLeft - 20
      });
    }
  },
  delConfirm(e) {
    console.log(e.detail);
    this.setData({
      selected: e.detail.selected,
      unselected: e.detail.unselected,
      examList: e.detail.unselected
    });
  }
})