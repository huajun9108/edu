// pages/examList/examList.js
const config = require('../../config')
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    examList:[
      {
        title:"【练习】'5s'核心知识测验"
      },
      {
        title: "【练习】'5s'核心知识测验"
      },
      {
        title: "【练习】'5s'核心知识测验"
      },
      {
        title: "【练习】'5s'核心知识测验"
      }
    ]
  },
  onLoad: function (option) {
    this.setData({
    })
    
  },
  onShow() {
    this.setData({
      is_modal_Hidden: true
    });
  },
  onHide() {
    this.setData({
      is_modal_Hidden: true
    });
  },
 
  tapCourseCategory: function () {
    this.setData({
      flag: false,
      modalFlag: false,
      isScroll: "noscroll"
    })
  },
  tapModal: function () {
    var _this = this;
    setTimeout(() => {
      _this.setData({
        modalFlag: true,
      })
    }, 400);
    _this.setData({
      flag: true,
      isScroll: ""
    });
  },
  showSearch() {
    this.setData({
      is_modal_Hidden: false,
      inputShowed: true

    })
  },
  courseListClick(e) {
    // let title = e.currentTarget.dataset.title
    // let type = e.currentTarget.dataset.type
    // let id = e.currentTarget.dataset.id
    // let url = `../courseList/courseList?title=${title}&type=${type}&id=${id}`
    // wx.redirectTo({
    //   url: url
    // })
  },
  courseListUrlSuccessFun(res, selfObj) {
    if (res.data <= 0) {
      this.setData({
        pageIsEmpty: true,
        isLoad: false
      })
    } else {
      let courseList = res.data;
      for (let i = 0; i < courseList.length; i++) {
        courseList[i].icon = this.data.iconUrl + courseList[i].icon;
      }
      this.setData({
        courseArr: courseList,
        pageIsEmpty: false,
        isLoad: false
      })
    }
  },
  courseListUrlFailFun() {
    this.setData({
      isLoad: true
    })
  },

  searchClick(e) {
    util.searchClick(e)
  },
  confirm(e) {
    util.confirm(e)
  }
})