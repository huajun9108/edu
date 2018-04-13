// components/examFaceCom/examFaceCom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isEllipsis:{
      type: Boolean,
      value: false
    },
    interfaceText:{
      type: String,
      value: ""
    },
    isEllipsisShow:{
      type: Boolean,
      value: false
    },
    interfaceContent:{
      type: String,
      value: ""
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    
  },
  ready() {
    let _this = this;
    var query = wx.createSelectorQuery().in(this)
    query.select('.weui-form-preview_content').boundingClientRect(function (res) {
      _this.setData({
        height: res.height
      })
      if (_this.data.height > 32) {
        _this.setData({
          isEllipsis: true,
          isEllipsisShow: true
        })
      } else {
        _this.setData({
          isEllipsis: false,
          isEllipsisShow: false
        })
      }
    }).exec()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showAll(){
      this.setData({
        isEllipsis: !this.data.isEllipsis
      });
    }
  }
})
