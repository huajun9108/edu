// components/editDelCom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    editDelList:{
      type: Array,
      value: []
    },
    select:{
      type: Array,
      value: []
    },
    delCss:{
      type: String,
      value: "weui-flex-common"
    },
    showCheckCss:{
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    num: 0,
    delCss: "weui-flex-common",
    checkSrc: "../../images/select.png",
    uncheckSrc: "../../images/unselect.png",
    selectedAllStatus: false,
    hoverActive: "weui-cell_active",
    courseTap: "courseUrl",
    is_modal_Hidden: true,
    is_modal_Msg: "你确定要狠心删除我吗？",
    selectAll: "全选",
    tipMsg: "你还没有收藏记录哦",
    cancelText:"我再想想",
    sureText:"狠心删除"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDel() {
      this.setData({
        delCss: "weui-flex-up",
        showCheckCss: "weui-cells-right",
        courseTap: null,
        hoverActive: null
      })
    },
    hideDel() {
      let editDelList = this.data.editDelList;
      for (let i = 0; i < editDelList.length; i++) {
        editDelList[i].selected = false;
      }
      this.setData({
        editDelList: editDelList,
        delCss: "weui-flex-down",
        showCheckCss: "weui-cells-left",
        selectedAllStatus: false,
        courseTap: "courseUrl",
        hoverActive: "weui-cell_active"
      })
      this.bindTotalNum();
    },
    bindCheckbox(e) {
      let index = e.currentTarget.dataset.index
      let selected = this.data.editDelList[index].selected;
      let editDelList = this.data.editDelList;
      editDelList[index].selected = !selected;
      this.setData({
        editDelList: editDelList
      });
      this.bindTotalNum();
    },
    bindSelectAll(e) {
      let selectedAllStatus = this.data.selectedAllStatus;
      let editDelList = this.data.editDelList;
      selectedAllStatus = !selectedAllStatus;
      for (let i = 0; i < editDelList.length; i++) {
        editDelList[i].selected = selectedAllStatus;
      }
      this.setData({
        editDelList: editDelList,
        selectedAllStatus: selectedAllStatus

      });
      this.bindTotalNum();
    },
    bindTotalNum() {
      let editDelList = this.data.editDelList;
      let num = 0
      for (let i = 0; i < editDelList.length; i++) {
        if (editDelList[i].selected) {
          num++
        }
      }
      if (num == editDelList.length) {
        this.setData({
          selectAll: "取消全选",
          selectedAllStatus: true,
        });
      } else {
        this.setData({
          selectAll: "全选"
        });
      }
      this.setData({
        num: num
      });
    },
    courseUrl(e) {
      const courseId = e.currentTarget.dataset.courseid;
      const title = e.currentTarget.dataset.title;
      const price = e.currentTarget.dataset.price;
      const courseUrlDetail = { courseId: courseId, title: title }
      const courseBuyDetail = { price: price, title: title, courseId: courseId }
      this.triggerEvent("courseUrl", courseUrlDetail);
      this.triggerEvent("courseBuyUrl", courseBuyDetail);
    },
    delItem() {
      let arr = this.data.editDelList;
      let unselect = [];
      let select = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].selected == false) {
          unselect.push(arr[i]);
        } else {
          select.push(arr[i].id?arr[i].id:arr[i].courseId)
          if (select.length == arr.length) {
            this.setData({
              unselect: [],
            })
          }
        }
      }
      this.setData({
        unselect: unselect,
        select: select
      });
      if (select.length == 0) return;
      this.setData({
        is_modal_Hidden: false,
      })
    },
    confirm() {
      const delConfirmDetail = { select: this.data.select, unselect: this.data.unselect}
      this.triggerEvent("delConfirm", delConfirmDetail);
    }
  }
})
