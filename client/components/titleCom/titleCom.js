// components/titleCom/titleCom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    isCollected:{
      type: Boolean,
      value: false
    },
    examShow:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    collected_image: "../../images/heart_icon_focus.png",
    uncollected_image: "../../images/heart_icon_deafult.png",
    share_image:"../../images/share_icon.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addMyFavor(){
      this.triggerEvent("addMyFavor")
    }
  }
})
