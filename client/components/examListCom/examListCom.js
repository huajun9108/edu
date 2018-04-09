// components/examListCom/examListCom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    examList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    examInterFaceUrl(e){
      console.log(e)
      let url = "../examInterFace/examInterFace?title=" + e.currentTarget.dataset.title + "&id=" + e.currentTarget.dataset.id
      wx.navigateTo({
        url: url,
      })
    }
  }
})
