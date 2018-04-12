Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //收藏测验中底部编辑栏的样式
    delCss: {
      type: String,
      value: "weui-flex-common"
    },
    //收藏测试中列表编辑与取消编辑时样式切换
    showCheckCss: {
      type: String,
      value: ""
    },
    //收藏测试中列表编辑时勾选图标的显示与隐藏状态
    hideStatus: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: true,
    examList: [
      {
        id: 0,
        title: "[练习]“5S”核心知识测验",
        endTime: "2018/3/30 10:00:00",
        selected: false
      },
      {
        id: 1,
        title: "[练习]“5S”核心知识测验",
        endTime: "2018/3/30 10:00:00",
        selected: false
      },
      {
        id: 2,
        title: "[练习]“5S”核心知识测验",
        endTime: "2018/3/30 10:00:00",
        selected: false
      },
      {
        id: 3,
        title: "[练习]“5S”核心知识测验",
        endTime: "2018/3/30 10:00:00",
        selected: false
      },
      {
        id: 4,
        title: "[练习]“5S”核心知识测验",
        endTime: "2018/3/30 10:00:00",
        selected: false
      }
    ],
    exam_msg: "开始时间",

    num: 0,
    delCss: "weui-flex-common",
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
      })
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
      console.log(e);
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
      console.log(selected);
      console.log(unselected);
      this.setData({
        selected: selected.toString(),
        unselected: unselected
      });
      if(selected.length === 0) return;
      this.setData({
        is_modal_Hidden: false
      });
    },
    testTap() {
      console.log('testTap');
    },
    confirm() {
      const delConfirmDetail = { selected: this.data.selected, unseleced: this.data.unselected };
      this.triggerEvent("delConfirm", delConfirmDetail);
      this.setData({
        examList: this.data.unselected
      });
      this.bindTotalNum();
    }
  }
})