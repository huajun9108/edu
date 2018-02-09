var config = require('../../config')
Page({
  data: {
    is_modal_Hidden: true,
    searchList: ["价值工程", "质量工程", "项目管理", "管理工程", "供应链管理", "人因工程", "运筹学", "工作设计", "金融工程", "设施管理"],
    inputShowed: false,
    flag: true,
    modalFlag: true,
    inputShowed: false,
    inputVal: "",
    courseArr: [],
    courseDir: [],
    pageIsEmpty: false,
    tipMsg: "该课程暂无分类, 请后续关注"
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: option.title,
    });
    var _this = this;
    wx.request({
      url: config.service.courseListUrl,
      method: 'POST',
      data: {
        type: option.type,
        id: option.id
      },
      success: function(res) {
        if(res.data.data <=0) {
          _this.setData(
            {
              pageIsEmpty: true
            }
          )
        } else {
          _this.setData(
            {
              courseArr: res.data.data,
              pageIsEmpty: false
            }
          )

        }
      }
    })

    wx.request({
      url: config.service.courseUrl,
      success: function (res) {
        _this.setData(
          {
            courseDir: res.data.data
          }
        )
      }
    });

    if (option.title === "全部课程") {
      this.setData({
        title: option.title,
        courseCategory: "全部"
      });
    } else {
      this.setData({
        title: option.title,
        courseCategory: option.title
      });
    }
  },
  tapCourseCategory: function () {
    this.setData({
      flag: false,
      modalFlag: false
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
    });
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  showSearch() {
    this.setData({
      is_modal_Hidden: false,
      inputShowed: true

    })
  },
  courseListClick(e) {
    let title = e.currentTarget.dataset.title
    let type = e.currentTarget.dataset.type
    let id = e.currentTarget.dataset.id
    let url = `../courseList/courseList?title=${title}&type=${type}&id=${id}`
    wx.redirectTo({
      url: url
    })
    // url = "../courseList/courseList?title={{item.title}}&type={{item.type}}&id={{item.id}}" 
  }
})