// pages/allOrders/allOrders.js
const sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
const config = require('../../config');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ["全部", "已付款", "待付款"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0,
        order: [],
        paidList: [],
        unpaidList: [],
        orderIsEmpty: false,
        paidIsEmpty: false,
        unpaidIsEmpty: false,
        tipMsg: '您还没有相关的订单',
        isLogin: false,
        select: [],
        unselect: [],
        delCss:"weui-flex-common",
        showCheckCss:"",
        isLoad: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
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
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      this.checkNetworkandLoginStatus();
    },
    checkNetworkandLoginStatus() {
      var that = this;
      wx.getNetworkType({
        success: function (res) {
          var networkType = res.networkType
          if (networkType === "none") {
            that.setData({
              isLoad: true
            });
          } else {
            app.testSession(that.success, that.fail)
          }
        }
      });
    },
    success() {
        console.log('isLogin');
        this.setData({
            isLogin: false
        })
        this.queryAllOrders()
    },
    fail() {
        this.setData({
            isLoad: false,
            isLogin: true
        })
    },
    login() {
        app.login(this.successFirst)
    },
    successFirst() {
        this.setData({
            isLogin: false
        })
        this.queryAllOrders()
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
    tabClick: function(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
        });
        this.setCourse();
    },
    queryAllOrders() {
        const queryAllOrdersUrl = config.service.queryAllOrdersUrl;
        app.request.requestPostApi(queryAllOrdersUrl, { userId: app.data.userId }, this, this.queryAllOrdersSuccessFun, this.queryAllOrdersFailFun,1);
    },
    queryAllOrdersSuccessFun(res) {
        if (res.status === "0") {
            const orderList = res.data;
            let paidList = [];
            let unpaidList = [];
            for (let i = 0; i < orderList.length; i++) {
                orderList[i].icon = app.data.iconUrl + orderList[i].icon;
                orderList[i].selected = false;
                if (orderList[i].explain === 0) {
                    unpaidList.push(orderList[i]);
                } else {
                    paidList.push(orderList[i]);
                }
            }
            if (orderList.length === 0) {
                this.setData({
                    orderIsEmpty: true
                });
            }
            if (paidList.length === 0) {
                this.setData({
                    paidIsEmpty: true
                });
            }
            if (unpaidList.length === 0) {
                this.setData({
                    unpaidIsEmpty: true
                });
            }
            this.setData({
                paidList: paidList,
                unpaidList: unpaidList,
                order: orderList,
                isLoad: false
            })
            this.setCourse();
        }
    },
    queryAllOrdersFailFun(){
      this.setData({
        isLoad:true
      })
    },
    load(){
      this.checkNetworkandLoginStatus();
    },
    setCourse() {
        if (this.data.activeIndex === "0") {
            this.setData({
                orderList: this.data.order,
            });
        } else if (this.data.activeIndex === "1") {
            this.setData({
                orderList: this.data.paidList
            })
        } else if (this.data.activeIndex === "2") {
            this.setData({
                orderList: this.data.unpaidList,
                delCss:"weui-flex-common",
                showCheckCss:""
            })
        }
    },
    tapToBuyOrToStudy(e) {
        const explain = e.currentTarget.dataset.explain;
        const title = e.currentTarget.dataset.title;
        const courseId = e.currentTarget.dataset.courseId;
        if (explain === 1) {
            const toStudyUrl = `../detail/detail?id=${courseId}&name=${title}`;
            wx.navigateTo({
                url: toStudyUrl,
            })
        } else if (explain === 0) {
            if (this.data.activeIndex === "0") {
                const price = e.currentTarget.dataset.price;
                const title = e.currentTarget.dataset.title;
                const courseId = e.currentTarget.dataset.courseId;
                const toBuyUrl = `../buyCourse/buyCourse?name=${title}&price=${price}&courseId=${courseId}`;
                wx.navigateTo({
                    url: toBuyUrl,
                });
            } else if (this.data.activeIndex === "2") {
                this.courseBuyUrl();
            }
        }
    },
    courseBuyUrl(e) {
        const price = e.detail.price;
        const title = e.detail.title;
        const courseId = e.detail.courseId;
        const toBuyUrl = `../buyCourse/buyCourse?name=${title}&price=${price}&courseId=${courseId}`;
        wx.navigateTo({
            url: toBuyUrl,
        })
    },
    delConfirm(e) {
        const courseId = e.detail.select.toString();
        this.setData({
            select: e.detail.select,
            unselect: e.detail.unselect
        });
        const batchDelUnpaidOrdersUrl = config.service.batchDelUnpaidOrdersUrl;
        app.request.requestPostApi(batchDelUnpaidOrdersUrl, {userId: app.data.userId, courseIds: courseId}, this, this.batchDelUnpaidOrdersSuccessFun, this.batchDelUnpaidOrdersFailFun);
    },
    batchDelUnpaidOrdersSuccessFun(res) {
      if (res.status === "0") {
        let oldOrderList = this.data.order;
        const delArr = this.data.select;
        let newOrderList = oldOrderList.filter(function(item, index) {
          for(let i = 0; i < delArr.length; i++) {
            if(item.courseId === delArr[i]) return false;
          }
          return true;
        });
        this.setData({
          orderList: this.data.unselect,
          num: 0,
          order: newOrderList,
          unpaidList: this.data.unselect
        })
      }
      if (this.data.unselect.length === 0) {
        this.setData({
          unpaidIsEmpty: true
        });
      }
    }
})