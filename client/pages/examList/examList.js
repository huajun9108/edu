// pages/examList/examList.js
const config = require('../../config')
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    showTime:true,
    showScore:true,
    exam_msg:"测验时间",
    people_num:"参加人数",
    pass_rate:"及格率",
    average:"平均分"
  },
  onLoad: function (option) {
    this.examMoreRequest();
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
  },
  examMoreRequest() {
    const examMoreUrl = config.service.examMoreUrl;
    app.request.requestGetApi(examMoreUrl, {}, this, this.examMoreSuccess, this.examMoreFail, 1);
  },
  examMoreSuccess(res) {
    console.log(res);
    if(res.status === "0") {
      this.setData({
        examList: res.data.start,
        examListEnd: res.data.end
      });
    }
  },
  examMoreFail(res) {
    this.examMoreRequest();
  },
  _examClick(e){
    let examId = e.currentTarget.dataset.id;
    let examTitle = e.currentTarget.dataset.title;
    let examType = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `../examInterFace/examInterFace?id=${examId}&title=${examTitle}&exam_type=${examType}&exam_flag=1`
    })
  },
  examClick(e) {
    let examId = e.currentTarget.dataset.id;
    let examTitle = e.currentTarget.dataset.title;
    let examType = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `../examInterFace/examInterFace?id=${examId}&title=${examTitle}&exam_type=${examType}&exam_flag=-1`
    })
  },
  
})