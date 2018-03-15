const config = require('../../config')
const app = getApp()
Page({
    data: {
        is_modal_Hidden: true,
        flag: true,
        modalFlag: true,
        inputShowed: false,
        courseArr: [],
        courseDir: [],
        pageIsEmpty: false,
        tipMsg: "该课程暂无分类, 请后续关注",
        isLoad: false,
        iconUrl: app.data.iconUrl,
    },
    onLoad: function(option) {
        console.log(option);
        wx.setNavigationBarTitle({
            title: option.title,
        });
        this.setData({
            type: option.type,
            id: option.id
        })
        var _this = this;
        wx.getStorage({
            key: 'courseDir',
            success: function(res) {
                console.log(res.data);
                _this.setData({
                    courseDir: res.data
                })
            }
        })
        wx.getStorage({
          key: 'searchList',
          success: function (res) {
            console.log(res.data);
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
        app.request.requestPostApi(courseListUrl, { type: this.data.type, id: this.data.id }, this, this.courseListUrlSuccessFun, this.courseListUrlFailFun);
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
      let title = e.detail.title
      let id = e.detail.id
      let url = `../courseList/courseList?title=${title}&type=A&id=${id}`
      wx.redirectTo({
        url: url
      })
    },
    confirm(e) {
      console.log(e);
      if(e.detail === '') return;
      const searchKeyword = e.detail;
      wx.navigateTo({
        url: `../searchCourse/searchCourse?searchKeyword=${searchKeyword}`
      });
    },
})