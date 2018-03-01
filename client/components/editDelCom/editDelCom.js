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
    pageIsEmpty: false,
    tipMsg: "你还没有收藏记录哦"
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
      console.log("bindCheckbox");
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
      wx.navigateTo({
        url: `../detail/detail?id=${courseId}&name=${title}`,
      })
    },
    delItem() {
      let arr = this.data.editDelList;
      let unselect = [];
      let select = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].selected == false) {
          unselect.push(arr[i]);
          this.setData({
            unselect: unselect,
          })
        } else {
          select.push(arr[i].id).toString()
          this.setData({
            select: select
          })
          if (select.length == arr.length) {
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
    confirm() {
      // if (this.data.select) {
      //   const batchDelMyFavorUrl = config.service.batchDelMyFavorUrl;
      //   app.request.requestPostApi(batchDelMyFavorUrl, { userId: app.data.userId, courseIds: this.data.select }, this, this.batchDelMyFavorSuccessFun, this.batchDelMyFavorFailFun);
      // }
      this.triggerEvent("delConfirm");
      console.log(1)
    },
    // myFavorListSuccessFun(res, selfObj) {
    //   if (!res.data) return;
    //   var list = res.data;
    //   this.pageIsEmpty(list)
    //   for (let i = 0; i < list.length; i++) {
    //     //图片为本地图片，到时候需要修改
    //     list[i].icon = "../../images/xuex.png";
    //   }
    //   this.setData({
    //     editDelList: list
    //   })
    // },
    // myFavorListFailFun() {

    // },
    // batchDelMyFavorSuccessFun(res) {
    //   console.log(res);
    //   if (res.status === "0") {
    //     this.setData({
    //       editDelList: this.data.unselect,
    //       num: 0
    //     })
    //   }
    //   this.pageIsEmpty(this.data.unselect)
    // },
    // batchDelMyFavorFailFun() {

    // },
    pageIsEmpty(arr) {
      if (arr.length === 0) {
        this.setData({
          pageIsEmpty: true
        })
      }
    }
  }
})
