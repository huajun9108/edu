// components/videoCom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tipText: {
      type: String,
      value: ""
    },
    isHidden:{
      type:Boolean,
      value:false
    },
    btnText:{
      type: String,
      value: ""
    }
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
    login(){
      this.triggerEvent("login");
    }
  }
})
