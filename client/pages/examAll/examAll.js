// pages/examAll/examAll.js
const config = require('../../config')
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTime:false,
    exam_msg:"状态",
    isLoad:true,
    placeholderText: "输入测验名称查找"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.title){
      wx.setNavigationBarTitle({
        title: options.title,
      })
      this.setData({
        examType: options.id
      })
      this.getExamAll()
    } else if (options.searchKeyword){
      wx.setNavigationBarTitle({
        title: options.searchKeyword,
      })
      this.setData({
        searchKeyword: options.searchKeyword,
        tipMsg: `对不起,暂无${options.searchKeyword}相关的测验`,
      })
      this.getExamFuzzy(options.searchKeyword)
    }else{
      console.log(1)
      wx.setNavigationBarTitle({
        title: "全部测验",
      })
      this.setData({
        examType: ""
      })
      this.getExamAll()
    }
    let _this = this
    wx.getStorage({
      key: 'examType',
      success: function (res) {
        console.log(res)
        _this.setData({
          searchList: res.data
        })
      }
    })
  },
   /**
   * 获取全部测试数据
   */
  getExamAll(){
    const selectAllExamUrl = config.service.selectAllExamUrl;
    app.request.requestPostApi(selectAllExamUrl, {type:this.data.examType}, this, this.examAllSuccess, this.examAllFail)
  },
   /**
   * 获取全部测试数据
   */
  getExamFuzzy(searchKeyword){
    const fuzzySelectExamUrl = config.service.examFuzzyUrl;
    app.request.requestPostApi(fuzzySelectExamUrl, { body: searchKeyword }, this, this.examFuzzySuccess, this.examFuzzyFail)
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
    this.setData({
      is_modal_Hidden: true
    });
    
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
  showSearch() {
    this.setData({
      is_modal_Hidden: false,
      inputShowed: true

    })
  },
   /**
   * 数据加载成功
   */
  examAllSuccess(res){
    console.log(res)
    this.setData({
      examList: res.data,
      isLoad: true
    });
    
  },

  examFuzzySuccess(res){
    console.log(res)
    if (res.status === "0") {
      let examList = res.data;
      if (examList.length <= 0) {
        this.setData({
          pageIsEmpty: true,
          isLoad: true,
          is_modal_Hidden: true
        })
        return;
      }
      this.setData({
        examList: examList,
        pageIsEmpty: false,
        isLoad: true,
        is_modal_Hidden: true
      });
    }
  },
  /**
   * 数据加载失败
   */
  examAllFail(){
    this.setData({
      isLoad: false
    });
  },
  examFuzzyFail(){
    this.setData({
      isLoad: false,
      is_modal_Hidden: true,
    });
  },
  load(){
    if (this.data.searchKeyword){
      this.getExamFuzzy(this.data.searchKeyword)
    }else{
      this.getExamAll()    
    }
  },
  _examClick(e){
    let examId = e.currentTarget.dataset.id;
    let examTitle = e.currentTarget.dataset.title;
    let examType = e.currentTarget.dataset.type;
    let examFlag = e.currentTarget.dataset.flag;
    wx.navigateTo({
      url: `../examInterFace/examInterFace?id=${examId}&title=${examTitle}&exam_type=${examType}&exam_flag=${examFlag}`,
    })
  },
  searchClick(e) {
    console.log(e)
    util.searchClick(e)
  },
  confirm(e) {
    if (e.detail === '') return;
    const searchKeyword = e.detail;
    console.log(e)
    this.getExamFuzzy(searchKeyword);
    wx.setNavigationBarTitle({
      title: searchKeyword,
    });
    this.setData({
      tipMsg: `对不起,暂无${searchKeyword}相关的测验`,
      searchKeyword: searchKeyword
    })
  },

})