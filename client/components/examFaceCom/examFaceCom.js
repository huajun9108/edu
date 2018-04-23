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
      value: "",
      observer: "_propertyChange"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    
  },
  // ready() {
  //   let _this = this;
  //   if (this.data.interfaceContent){
  //     var query = wx.createSelectorQuery().in(this)
  //     query.select('.weui-form-preview_content').boundingClientRect(function (res) {
  //       if (!res) return;
  //       _this.setData({
  //         height: res.height
  //       })
  //       console.log(res)
  //       if (_this.data.height > 32) {

  //         _this.setData({
  //           isEllipsis: true,
  //           isEllipsisShow: true
  //         })
  //       } else {
  //         _this.setData({
  //           isEllipsis: false,
  //           isEllipsisShow: false
  //         })
  //       }
  //     }).exec()
  //   }else{
  //     console.log(this.data.interfaceContent)
  //   }
    
    
  // },

  /**
   * 组件的方法列表
   */
  methods: {
    showAll(){
      this.setData({
        isEllipsis: !this.data.isEllipsis
      });
    },
    _ready(){
      let _this = this;
      var query = wx.createSelectorQuery().in(this)
      query.select('.weui-form-preview_content').boundingClientRect(function (res) {
        if (!res) return;
        _this.setData({
          height: res.height
        })
        console.log(res)
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
    getByteLen(val) {
    var len = 0;
      for(var i = 0; i<val.length; i++) {
      var a = val.charAt(i);
      if (a.match(/[^\x00-\xff]/ig) != null) {
        len += 2;
      }
      else {
        len += 1;
      }
    }
      return len;
    },
    _propertyChange: function (newVal, oldVal) {
      let _this = this;
      console.log(newVal)
      this.getByteLen(newVal)
      console.log(this.getByteLen(newVal))
      if (this.getByteLen(newVal)>89){
        _this.setData({
          isEllipsis: true,
          isEllipsisShow: true
        })
      }else {
        _this.setData({
          isEllipsis: false,
          isEllipsisShow: false
        })
      }
    }
  }
})
