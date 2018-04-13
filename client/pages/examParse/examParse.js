// pages/examParse/examParse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    quList: [
      {
        title: "5S运动是一项什么样的工作",
        select: [
          { option: "A", correctAnswerTag: false, content: "暂时性", userAnswerTag: false},
          { option: "B", correctAnswerTag: false, content: "流行性", userAnswerTag: false},
          { option: "C", correctAnswerTag: true, content: "持久性", userAnswerTag: true},
          { option: "D", correctAnswerTag: false, content: "时尚性", userAnswerTag: false}
        ],
        correctAnswer: ["C"],
        parse: "无"
      },
      {
        title: "5S运动是一项什么样的工作",
        select: [
          { option: "A", correctAnswerTag: true, content: "暂时性", userAnswerTag: false},
          { option: "B", correctAnswerTag: false, content: "流行性", userAnswerTag: false},
          { option: "C", correctAnswerTag: false, content: "持久性", userAnswerTag: false},
          { option: "D", correctAnswerTag: false, content: "时尚性", userAnswerTag: true}
        ],
        correctAnswer: ["A"],
        parse: "无"
      },
      {
        title: "5S运动是一项什么样的工作",
        select: [
          { option: "A", correctAnswerTag: false, content: "暂时性", userAnswerTag: false},
          { option: "B", correctAnswerTag: true, content: "流行性", userAnswerTag: false},
          { option: "C", correctAnswerTag: false, content: "持久性", userAnswerTag: true},
          { option: "D", correctAnswerTag: false, content: "时尚性", userAnswerTag: false}
        ],
        correctAnswer: ["B"],
        parse: "无"
      },
      {
        title: "5S运动是一项什么样的工作",
        select: [
          { option: "A", correctAnswerTag: false, content: "暂时性", userAnswerTag: false},
          { option: "B", correctAnswerTag: false, content: "流行性", userAnswerTag: false},
          { option: "C", correctAnswerTag: true, content: "持久性", userAnswerTag: true},
          { option: "D", correctAnswerTag: false, content: "时尚性", userAnswerTag: false}
        ],
        correctAnswer: ["C"],
        parse: "无"
      },
      {
        title: "5S运动是一项什么样的工作",
        select: [
          { option: "A", correctAnswerTag: true, content: "暂时性", userAnswerTag: false},
          { option: "B", correctAnswerTag: false, content: "流行性", userAnswerTag: false},
          { option: "C", correctAnswerTag: false, content: "持久性", userAnswerTag: true},
          { option: "D", correctAnswerTag: false, content: "时尚性", userAnswerTag: false}
        ],
        correctAnswer: ["A"],
        parse: "无"
      }
    ],
    correctIcon: "../../images/correct_icon.png",
    errorIcon: "../../images/error_icon.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      title: options.title,
    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})