const config = require("../../config.js")
const app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    inputShowed: false,
    is_modal_Hidden: true,
    courseArr: [],
    iconUrl: app.data.iconUrl,
    pageIsEmpty: false,
    isLoad: false,
    tipMsg: '',
    searchKeyword: ''
  },
  onLoad: function (options) {
    console.log(options.searchKeyword);
    wx.setNavigationBarTitle({
      title: options.searchKeyword,
    });
    this.setData({
      tipMsg: `对不起,暂无${options.searchKeyword}相关的课程`,
      searchKeyword: options.searchKeyword
    });
    this.fuzzySelect(options.searchKeyword);
    var that = this;
    wx.getStorage({
      key: 'searchList',
      success: function (res) {
        console.log(res)
        that.setData({
          searchList: res.data
        })
      }
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
  showSearch() {
    this.setData({
      is_modal_Hidden: false,
      inputShowed: true,
    })
  },
  fuzzySelect(keyword) {
    const fuzzySelectUrl = config.service.fuzzySelectUrl;
    app.request.requestPostApi(fuzzySelectUrl, { body: keyword }, this, this.fuzzySelectSuccess, this.fuzzySelectFail);
  },
  fuzzySelectSuccess(res) {
    console.log(res);
    if (res.status === "0") {
      let courseList = res.data;
      if (courseList.length <= 0) {
        this.setData({
          pageIsEmpty: true,
          isLoad: false,
          is_modal_Hidden: true,
        })
        return;
      }
      for (let i = 0; i < courseList.length; i++) {
        courseList[i].icon = this.data.iconUrl + courseList[i].icon;
      }
      this.setData({
        courseArr: courseList,
        pageIsEmpty: false,
        isLoad: false,
        is_modal_Hidden: true
      });
    }
  },
  fuzzySelectFail(res) {
    console.log(res);
    this.setData({
      isLoad: true
    })
  },
  load() {
    this.fuzzySelect(this.data.searchKeyword);
  },
  searchClick(e) {
    util.searchClick(e)
  },
  confirm(e) {
    if (e.detail === '') return;
    const searchKeyword = e.detail;
    this.fuzzySelect(searchKeyword);
    wx.setNavigationBarTitle({
      title: searchKeyword,
    });
    this.setData({
      tipMsg: `对不起,暂无${searchKeyword}相关的课程`,
      searchKeyword: searchKeyword
    })
  },
})