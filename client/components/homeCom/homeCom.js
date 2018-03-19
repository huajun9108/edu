// components/homeCom/homeCom.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    homeComMsg: {
      type: String,
      value: ''
    },
    courseImgUrls: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgIndex: 0,
    refreshImage: "../../images/refresh_icon.png",
    imgUrl: app.data.imgUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    refresh() {
      if (this.data.imgIndex == 0) {
        this.setData({
          imgIndex: 1
        })
      } else {
        this.setData({
          imgIndex: 0
        })
      }
    },
    courseUrl(e) {
      console.log(e);
      let url = "../detail/detail?name=" + e.currentTarget.dataset.name + "&id=" + e.currentTarget.dataset.id + "&imageUrl=" + e.currentTarget.dataset.url
      wx.navigateTo({
        url: url,
      })
    }
  }
})