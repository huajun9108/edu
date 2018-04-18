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
    average:"平均分",
    placeholderText:"输入测验名称查找"
  },
  onLoad: function (option) {
    this.examMoreRequest();
    let _this = this
    wx.getStorage({
      key: 'examType',
      success: function (res) {
        console.log(res)
        _this.setData({
          searchList:res.data
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
      inputShowed: true

    })
  },
  examTypeSuccess(res){
    console.log(res)
    this.setData({
      searchList: res.data,
    })
  },
  searchClick(e) {
    console.log(e)
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