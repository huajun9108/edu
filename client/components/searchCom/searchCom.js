// components/searchCom/searchCom.js
Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden  
    searchList: {
      type: Array,
      value: [],
    },
    inputShowed: {
      type: Boolean,
      value: false
    },
    placeholderText: {
      type: String,
      value: ''
    }
  },
  data: {
    inputVal: "",
  },
  methods: {
    hideSearch: function () {
      this.setData({
        inputVal: "",
        modalHidden: true,
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: "",
        inputShowed:false
      });
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
    },
    searchClick(e) {
      const id = e.currentTarget.dataset.id
      const title = e.currentTarget.dataset.title
      const courseTypeDetail = {title: title,id:id}
      this.triggerEvent("searchClick", courseTypeDetail);
    },
    confirm(){
      this.triggerEvent("confirm", this.data.inputVal);
    }
  }
});