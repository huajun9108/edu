
var timer; // 计时器

const util = require('../../utils/util.js')
const config = require('../../config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalFlag:true,
    quList:[],
    duration: 800,
    num:1,
    is_modal_Hidden: true,
    is_modal_Msg: "是否确认提交答卷?",
    cancelText: "我再写写",
    sureText: "现在交卷",
    examId: null,
    isLoad: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      title: decodeURI(options.title),
      cardCss:"qu_card_down",
      examType: options.exam_type,
      examId: options.id
    });
    // this.startTimer()
    this.selectPaper();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.pauseTimer()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  quChange(e){
    this.setData({
      num: e.detail.current+1
    })
  },
  optionClick(e){
    let _this = this
    console.log(e)
    var serial = e.currentTarget.dataset.serial;
    var this_checked = e.currentTarget.dataset.option
    var quList = this.data.quList;
    var parameterList = quList[serial].select;//获取Json数组
    
    for (let i = 0; i < parameterList.length; i++) {
      if (parameterList[i].option === this_checked) {
        parameterList[i].select = true;//当前点击的位置为true即选中
        if (!quList[serial].userAnswer.includes(this_checked)){
          let len = quList[serial].userAnswer.length;
          if(len === 1) {
            quList[serial].userAnswer = [];
          }
          quList[serial].userAnswer.push(this_checked);
        }
      }
      else {
        parameterList[i].select = false;//其他的位置为false
      }
    }
    quList[serial].select = parameterList;
    _this.setData({
      quList: quList,
      serial: serial
    });
  },
  multiOptionClick(e) {
    let _this = this
    console.log(e)
    var serial = e.currentTarget.dataset.serial;
    var this_checked = e.currentTarget.dataset.option
    var quList = this.data.quList;
    var parameterList = quList[serial].select;//获取Json数组

    for (let i = 0; i < parameterList.length; i++) {
      if (parameterList[i].option === this_checked) {
        if (!quList[serial].userAnswer.includes(this_checked)) {
          parameterList[i].select = true;//当前点击的位置为true即选中
          let len = quList[serial].userAnswer.length;
          quList[serial].userAnswer.push(this_checked);
          quList[serial].userAnswer.sort();
        } else {
          let deselectIndex = quList[serial].userAnswer.indexOf(this_checked); 
          parameterList[i].select = false;
          quList[serial].userAnswer.splice(deselectIndex, 1);
        }
      }
    }
    quList[serial].select = parameterList;
    _this.setData({
      quList: quList,
      serial: serial
    });
  },
  showCard(){
    let _this = this
    console.log(this.data.modalFlag)
    if (this.data.modalFlag) {
      _this.setData({
        modalFlag: false,
        cardCss: "qu_card up"
      })
    } else {
      _this.setData({
        cardCss: "qu_card down"
      })
      setTimeout(() => {
        _this.setData({
          modalFlag: true,
        })
      }, 500);
    }
    console.log(this.data.modalFlag)
  },
  cardClick(e){
    let _this = this
    let index = e.currentTarget.dataset.index
    this.setData({
      current:index,
      cardCss: "qu_card down"
    })
    setTimeout(() => {
      _this.setData({
        modalFlag: true,
      })
    }, 500);
  },
  submitClick(){
    this.setData({
      is_modal_Hidden: false,
    });
  },
  getScore(){
    var quList = this.data.quList
    this.setData({
      average: 100 / quList.length,
      error: 0
    })
    for (let i = 0; i < quList.length; i++) {
      var userAnswer = quList[i].userAnswer.join('');
      var correctAnswer = quList[i].correctAnswer;
      if (userAnswer != correctAnswer) {
        this.data.error++;
      }
    }
    this.setData({
      score: 100 - this.data.error * this.data.average
    })
  },
  confirm(){
    var time1 = 10 - this.data.totalSecond
    var usedTime = util.formatSeconds(time1)
    this.getScore()
    wx.redirectTo({
      url: `../examEnd/examEnd?exam_type=${this.data.examType}&exam_time=
      ${usedTime}&exam_title=${this.data.title}&exam_score=${this.data.score}`
    })
  },

  // 开始计时  
  startTimer: function () {
    this.countdown("10");
  },

  // 暂停计时
  pauseTimer: function () {
    clearTimeout(timer);
  },
  countdown(totalSecond) {
    let _this = this;
    _this.setData({
      totalSecond: totalSecond,
      time: util.formatSeconds(totalSecond)
    })
    timer = setTimeout(function () {
      if (totalSecond){
        totalSecond--;
        _this.countdown(totalSecond)
      } else{
        _this.confirm()
      }   
    }, 1000);
  },
  selectPaper() {
    const selectPaperByUserIdAndExamIdUrl = config.service.selectPaperByUserIdAndExamIdUrl;
    app.request.requestPostApi(selectPaperByUserIdAndExamIdUrl, { userId: app.data.userId, examId: this.data.examId }, this, this.selectPaperSuccess, this.selectPaperFail);
  },
  selectPaperSuccess(res) {
    console.log(res);
    if(res.status === "0") {
      this.setData({
        isLoad: true,
        quList: res.data,
        quNum: res.data.length
      });
    }
  },
  selectPaperFail(res) {
    this.setData({
      isLoad: false
    });
  },
  load() {
    this.selectPaper();
  }
})