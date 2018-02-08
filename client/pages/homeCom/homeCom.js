
Component({
  properties: {
    homeComMsg: {
      type: String,
      value: ''
    },
    courseImgUrls:{
      type: Array,
      value: []
    }
  },
  data: {
    imgIndex: 0,
    refreshImage: "../../images/refresh_icon.png"
  },
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
      console.log(this.data.imgIndex)
    },
    courseUrl(e){
      console.log(e)
      let url = "../detail/detail?name=" + e.currentTarget.dataset.name + "&imageUrl=" + e.currentTarget.dataset.url
      wx.navigateTo({
        url: url,
      })
    }
  }
});