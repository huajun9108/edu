Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //收藏测试中列表编辑时勾选图标的显示与隐藏状态
    hideStatus: {
      type: Boolean,
      value: true,
      observer: 'hideStatusOb'
    },
    examList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    exam_msg: "状态",
    num: 0,
    delCss: "weui-flex-common", //收藏测验中底部编辑栏的样式
    checkSrc: "../../images/select.png",
    uncheckSrc: "../../images/unselect.png",
    selectedAllStatus: false,
    hoverActive: "weui-cell_active",
    testTap: "testTap",
    is_modal_Hidden: true,
    is_modal_Msg: "你确定要狠心删除我吗？",
    selectAll: "全选",
    cancelText: "我再想想",
    sureText: "狠心删除",

    //用于编辑收藏测验时保存选中的条目与未选中的条目
    selected: '',
    unselected: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDel() {
      this.setData({
        delCss: "weui-flex-up",
        showCheckCss: "weui-cells-right",
        testTap: null,
        hoverActive: "",
        hideStatus: false
      });
      this.bindTotalNum();
    },
    hideDel() {
      let examList = this.data.examList;
      for(let i = 0; i < examList.length; i++) {
        examList[i].selected = false;
      }

      this.setData({
        delCss: "weui-flex-down",
        showCheckCss: "weui-cells-left",
        selectedAllStatus: false,
        testTap: "testTap",
        hoverActive: "weui-cell_active",
        hideStatus: true
      });
      this.bindTotalNum();
    },
    bindCheckbox(e) {
      let index = e.currentTarget.dataset.index;
      let selected = this.data.examList[index].selected;
      let examList = this.data.examList;
      examList[index].selected = !selected;
      this.setData({
        examList: examList
      });
      this.bindTotalNum();
    },
    bindSelectAll(e) {
      let selectedAllStatus = this.data.selectedAllStatus;
      let examList = this.data.examList;
      selectedAllStatus = !selectedAllStatus;
      for(let i = 0, len = examList.length; i < len; i++) {
        examList[i].selected = selectedAllStatus;
      }
      this.setData({
        examList: examList,
        selectedAllStatus: selectedAllStatus
      });
      this.bindTotalNum();
    },
    bindTotalNum() {
      let examList = this.data.examList;
      let num = 0;
      for (let i = 0, len = examList.length; i < len; i++) {
        if (examList[i].selected) {
          num++;
        }
      }
      if (num === examList.length) {
        this.setData({
          selectAll: "取消全选",
          selectedAllStatus: true
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
    delItem() {
      let examList = this.data.examList;
      let unselected = [];
      let selected = [];
      for(let i = 0, len = examList.length; i < len; i++) {
        if(examList[i].selected) {
          selected.push(examList[i].id);
          if (selected.length === examList.length) {
            this.setData({
              unselected: []
            });
          } 
        } else {
          unselected.push(examList[i]);
        }
      }
      this.setData({
        selected: selected.toString(),
        unselected: unselected
      });
      if(selected.length === 0) return;
      this.setData({
        is_modal_Hidden: false
      });
    },
    testTap(e) {
      const dataset = e.currentTarget.dataset;
      const id = dataset.id;
      const title = dataset.title;
      const exam_type = dataset.type;
      const flag = dataset.flag;
      const status = dataset.status;
      wx.navigateTo({
        url: `../../pages/examInterFace/examInterFace?id=${id}&title=${title}&exam_type=${exam_type}&exam_flag=${flag}&exam_status=${status}`,
      });
    },
    confirm() {
      const delConfirmDetail = { selected: this.data.selected, unselected: this.data.unselected };
      this.triggerEvent("delConfirm", delConfirmDetail);
      this.bindTotalNum();
    }
  },
  hideStatusOb(newVal) {
    if(newVal) {
      this.setData({
        testTap: 'testTap',
        delCss: 'weui-flex-common',
        showCss: '',
        hoverActive: "weui-cell_active",
      });
    }
  }
})