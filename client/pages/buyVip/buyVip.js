// pages/buyVip/buyVip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag: true,
    model: [
      {
        title: '月度',
        price: '￥20',
        unit:"月",
        selectImage: true,
        selectedImageUrl:"../../images/xuanzhong_icon.png",
        unselectedImageUrl:"../../images/weixuanzhong_icon.png"
      },
      {
        title: '年度',
        price: '￥198',
        unit: "年",
        selectImage: false,
        selectedImageUrl: "../../images/xuanzhong_icon.png",
        unselectedImageUrl: "../../images/weixuanzhong_icon.png"
      }
    ],
    number:"￥20"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  selectClick(e){
    for (var i = 0; i < this.data.model.length; i++) {
      if (e.currentTarget.id == i) {
        this.data.model[i].selectImage = true

      }
      else {
        this.data.model[i].selectImage = false
      }
    }
    this.setData({
      model: this.data.model,
      number: e.currentTarget.dataset.price
    })  
  },
  buyTap(){
  }
})