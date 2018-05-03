const config = require('../../config')
const app = getApp()
const util = require('../../utils/util.js')
Page({
    data: {
        is_modal_Hidden: true,
        flag: true,
        modalFlag: true,
        inputShowed: false,
        courseArr: [],
        courseDir: [],
        pageIsEmpty: false,
        tipMsg: "该分类暂无课程, 请后续关注",
        isLoad: false,
        iconUrl: app.data.iconUrl,
        placeholderText: '输入课程名、老师查找'
    },
    onLoad: function(option) {
        wx.setNavigationBarTitle({
          title: decodeURI(option.title),
        });
        this.setData({
            type: option.type,
            id: option.id
        })
        var _this = this;
        wx.getStorage({
            key: 'courseDir',
            success: function(res) {
                _this.setData({
                    courseDir: res.data
                })
            }
        })
        wx.getStorage({
          key: 'searchList',
          success: function (res) {
            _this.setData({
              searchList: res.data
            })
          }
        })
        this.getCourseListDetail()
        if (option.title === "全部课程") {
            this.setData({
                title: option.title,
                courseCategory: "全部"
            });
        } else {
            this.setData({
                title: option.title,
                courseCategory: option.title
            });
        }
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
    getCourseListDetail() {
        const courseListUrl = config.service.courseListUrl;
        //获取类别下的所有课程
        app.request.requestPostApi(courseListUrl, { type: this.data.type, id: this.data.id }, this, this.courseListUrlSuccessFun, this.courseListUrlFailFun , 1);
    },
    tapCourseCategory: function() {
        this.setData({
            flag: false,
            modalFlag: false,
            isScroll:"noscroll"
        })
    },
    tapModal: function() {
        var _this = this;
        setTimeout(() => {
            _this.setData({
                modalFlag: true,
            })
        }, 400);
        _this.setData({
            flag: true,
            isScroll:""
        });
    },
    showSearch() {
        this.setData({
            is_modal_Hidden: false,
            inputShowed: true

        })
    },
    courseListClick(e) {
        let title = e.currentTarget.dataset.title
        let type = e.currentTarget.dataset.type
        let id = e.currentTarget.dataset.id
        let url = `../courseList/courseList?title=${title}&type=${type}&id=${id}`
        wx.redirectTo({
            url: url
        })
    },
    courseListUrlSuccessFun(res, selfObj) {
        if (res.data <= 0) {
            this.setData({
                pageIsEmpty: true,
                isLoad: false
            })
        } else {
            let courseList = res.data;
            for(let i = 0; i < courseList.length; i++) {
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
    load() {
        this.getCourseListDetail()
    },
    searchClick(e){
      util.searchClick(e)
    },
    confirm(e) {
      util.confirm(e)
    }
})