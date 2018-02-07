// pages/myFavor/myFavor.js
const App = getApp()
Page({
  data: {
    favorList: [
      {
        id: "A1", title: "工艺AAA课程1", teacher: "苹果老师", icon: "../../images/xuex.png", selected: false,
      },
      {
        id: "A2", title: "工艺BBB课程2", teacher: "苹果老师", icon: "../../images/xuex.png", selected: false
      },
      {
        id: "A3", title: "工艺CCC课程3", teacher: "苹果老师", icon: "../../images/xuex.png", selected: false
      },
      {
        id: "A4", title: "工艺AAA课程4", teacher: "苹果老师", icon: "../../images/xuex.png", selected: false
      },
      {
        id: "A5", title: "工艺BBB课程5", teacher: "苹果老师", icon: "../../images/xuex.png", selected: false
      },
      {
        id: "A6", title: "工艺CCC课程6", teacher: "苹果老师", icon: "../../images/xuex.png", selected: false
      },
      {
        id: "A7", title: "工艺AAA课程7", teacher: "苹果老师", icon: "../../images/xuex.png", selected: false
      },
      {
        id: "A8", title: "工艺BBB课程8", teacher: "苹果老师", icon: "../../images/xuex.png", selected: false
      },
      {
        id: "A9", title: "工艺CCC课程9", teacher: "苹果老师", icon: "../../images/xuex.png", selected: false
      }
    ],
    num:0,
    delCss:"weui-flex-common",
    checkSrc:"../../images/select.png",
    uncheckSrc: "../../images/unselect.png",
    selectedAllStatus: false,
    hoverActive:"weui-cell_active",
    courseTap:"courseUrl",
    is_modal_Hidden: true,
    is_modal_Msg: "你确定要狠心删除我吗？" ,
    selectAll:"全选"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  toCourseDetail(){
    console.log(1)
  },
  showDel(){
    this.setData({
      delCss: "weui-flex-up",
      showCheckCss: "weui-cells-right",
      courseTap:null,
      hoverActive:null
    })
  },
  hideDel(){
    let favorList = this.data.favorList;
    for (let i = 0; i < favorList.length; i++) {
      favorList[i].selected = false;
    }
    this.setData({
      favorList: favorList,
      delCss: "weui-flex-down",
      showCheckCss: "weui-cells-left",
      selectedAllStatus:false,
      courseTap: "courseUrl",
      hoverActive: "weui-cell_active"
    })
    this.bindTotalNum();
  },
  bindCheckbox(e){
    let index = e.currentTarget.dataset.index
    let selected = this.data.favorList[index].selected;
    let favorList = this.data.favorList;
    favorList[index].selected = !selected;
    this.setData({
      favorList: favorList
    });
    this.bindTotalNum();
  },
  bindSelectAll(e){
    let selectedAllStatus = this.data.selectedAllStatus;
    let favorList = this.data.favorList;
    selectedAllStatus = !selectedAllStatus;
    console.log(selectedAllStatus)
    for (let i = 0; i < favorList.length; i++) {
      favorList[i].selected = selectedAllStatus;
    }
    this.setData({
      favorList: favorList,
      selectedAllStatus: selectedAllStatus

    });
    this.bindTotalNum();
  },
  bindTotalNum(){
    let favorList = this.data.favorList;
    console.log(favorList)
    let num = 0
    for (let i = 0; i < favorList.length; i++) {
      if (favorList[i].selected){
        num ++
      }
    }
    if (num == favorList.length){
      this.setData({
        selectAll: "取消全选",
        selectedAllStatus: true,
      });
    }else{
      this.setData({
        selectAll: "全选"
      });
    }
    this.setData({
      num:num
    });
  },
  courseUrl(){
    console.log("url")
  },
  delItem(){
    let arr = this.data.favorList;
    let unselect = [];
    let select = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].selected == false) {
        unselect.push(arr[i]);
        this.setData({
          unselect: unselect,
        })
      }else{
        select.push(arr[i].id).toString()
        this.setData({
          select: select
        })
        if (select.length == arr.length){
          this.setData({
            unselect: []
          })
        }
      }
    }
    if (select.length == 0) return;
    this.setData({
      is_modal_Hidden: false,
    })
  },
  confirm(){
    console.log(this.data.unselect)
    this.setData({
      favorList: this.data.unselect,
      num: 0
    })
    console.log("删除了"+this.data.select)
  }
})  