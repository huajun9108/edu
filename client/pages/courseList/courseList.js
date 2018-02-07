Page({
  data: {
    flag: true,
    inputShowed: false,
    inputVal: "",
    allCourse: [
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '价值工程1-1'
      },
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '价值工程2-1'
      },
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '工艺课程CCCC'
      },
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '管理课程AAAA'
      },
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '管理课程BBBB'
      },
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '管理课程CCCC'
      },
    ],
    processCourse: [
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '工艺课程AAAA'
      },
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '工艺课程BBBB'
      },
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '工艺课程CCCC'
      }
    ],
    managementCourse: [
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '管理课程AAAA'
      },
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '管理课程BBBB'
      },
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '管理课程CCCC'
      }
    ],
    processACourse: [
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '工艺课程AAAA'
      }
    ],
    processBCourse: [
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '工艺课程BBBB'
      }
    ],
    processCCourse: [
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '工艺课程CCCC'
      }
    ],
    managementACourse: [
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '管理课程AAAA'
      }
    ],
    managementBCourse: [
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '管理课程BBBB'
      }
    ],
    managementCCourse: [
      {
        icon: "../../images/xuex.png",
        teacher: '苹果老师',
        title: '管理课程CCCC'
      }
    ],
    courseArr: [],
    courseDir: [
      {
        title: "全部课程",
        flag: true,
      },
      {
        flag: false,
        title: "工艺",
        children: [
          {
            title: "工艺AAA"
          },
          {
            title: "工艺BBB"
          },
          {
            title: "工艺CCC"
          }
        ]
      },
      {
        flag: false,
        title: "管理",
        children: [
          {
            title: "管理AAA"
          },
          {
            title: "管理BBB"
          },
          {
            title: "管理CCC"
          }
        ]
      }
    ]
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: option.title,
    });
    var _this = this;
    wx.request({
      url: 'https://jfn15ogq.qcloud.la/weapp/course/selectAll',
      success: function (res) {
        console.log(res.data);
        _this.setData(
          {
            courseDir: res.data.data
          }
        )
      }
    });

    if(option.title === "全部课程") {
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
    switch (option.title) {
      case "全部课程":
        this.setData({
          courseArr: this.data.allCourse
        });
        break;
      case "工艺":
        this.setData({
          courseArr: this.data.processCourse
        });
        break;
      case "管理":
        this.setData({
          courseArr: this.data.managementCourse
        });
        break;
      case "工艺AAA":
        this.setData({
          courseArr: this.data.processACourse
        });
        break;
      case "工艺BBB":
        this.setData({
          courseArr: this.data.processACourse
        });
        break;
      case "工艺CCC":
        this.setData({
          courseArr: this.data.processACourse
        });
        break;
      case "管理AAA":
        this.setData({
          courseArr: this.data.managementACourse
        });
        break;
      case "管理BBB":
        this.setData({
          courseArr: this.data.managementBCourse
        });
        break;
      case "管理CCC":
        this.setData({
          courseArr: this.data.managementCCourse
        });
        break;
    }
  },
  tapCourseCategory: function() {
    this.setData({
      flag: false
    })
  },
  tapModal: function() {
    this.setData({
      flag: true
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})