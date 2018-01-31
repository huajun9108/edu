// pages/allOrders/allOrders.js
var sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "已付款", "待付款"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    scrollFlag: true,
    order: [
      {
        url: "../buyCourse/buyCourse", title: "工艺AAA", explain: 0,icon:"../../images/xuex.png"
      },
      {
        url: "../detail/detail?id=" + 1, title: "工艺BBB", explain: 1
      },
      {
        url: "../detail/detail?id=" + 2, title: "工艺CCC", explain:1
      },
      {
        url: "../buyCourse/buyCourse", title: "工艺AAA", explain: 0, icon: "../../images/xuex.png"
      },
      {
        url: "../detail/detail?id=" + 1, title: "工艺BBB", explain: 1
      },
      {
        url: "../detail/detail?id=" + 2, title: "工艺CCC", explain: 1
      },
      {
        url: "../buyCourse/buyCourse", title: "工艺AAA", explain:0, icon: "../../images/xuex.png"
      },
      {
        url: "../detail/detail?id=" + 1, title: "工艺BBB", explain: 1
      },
      {
        url: "../detail/detail?id=" + 2, title: "工艺CCC", explain: 1
      }
    ],
    paidList:[
      {
        url: "../detail/detail?id=" + 3, title: "工艺DDD", explain: 1
      },
      {
        url: "../detail/detail?id=" + 0, title: "工艺EEE", explain: 1
      },
      {
        url: "../detail/detail?id=" + 1, title: "工艺FFF", explain: 1
      }
    ],
    unpaidList: [
      {
        url: "../buyCourse/buyCourse", title: "工艺GGG", explain: 0
      },
      {
        url: "../buyCourse/buyCourse", title: "工艺hhh", explain: 0
      },
      {
        url: "../buyCourse/buyCourse", title: "工艺III", explain: 0
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(that.data.tabs.length)
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
  onReady: function () {
    this.setData({
      orderList: this.data.order
    });
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
  tabClick: function (e) {
   
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
    console.log(this.data.activeIndex)
    if (this.data.activeIndex==="0"){
      console.log("全部")
      this.setData({
        orderList: this.data.order
      });
      console.log(this.data.orderList)
    } else if (this.data.activeIndex === "1"){
      console.log("已付款")
      this.setData({
        orderList: this.data.paidList
      })
    }else{
      console.log("代付款")
      this.setData({
        orderList: this.data.unpaidList
      })
    }
  }
  
})