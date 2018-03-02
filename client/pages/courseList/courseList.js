var config = require('../../config')
var app = getApp()
Page({
  data: {
    is_modal_Hidden: true,
    searchList: ["价值工程", "质量工程", "项目管理", "管理工程", "供应链管理", "人因工程", "运筹学", "工作设计", "金融工程", "设施管理"],
    flag: true,
    modalFlag: true,
    inputShowed: false,
    courseArr: [],
    courseDir: [],
    pageIsEmpty: false,
    tipMsg: "该课程暂无分类, 请后续关注",
    iconUrl: app.data.iconUrl,
  },
  onLoad: function (option) {
    console.log(option);
    wx.setNavigationBarTitle({
      title: option.title,
    });
    var _this = this;
    const courseListUrl = config.service.courseListUrl;
    //获取类别下的所有课程
    app.request.requestPostApi(courseListUrl, { type: option.type, id: option.id }, this, this.courseListUrlSuccessFun, this.courseListUrlFailFun);
    wx.getStorage({
      key: 'courseDir',
      success: function (res) {
        console.log(res.data);
        _this.setData(
          {
            courseDir: res.data
          }
        )
      }
    })

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
  },
  courseListUrlSuccessFun(res, selfObj) {
    if (res.data <= 0) {
      this.setData(
        {
          pageIsEmpty: true
        }
      )
    } else {
      this.setData(
        {
          courseArr: res.data,
          pageIsEmpty: false
        }
      )
    }
  },
  courseListUrlFailFun() {

  },
})