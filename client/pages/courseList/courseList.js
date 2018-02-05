Page({
  data: {
    flag: true,
    allCourse: ['工艺AAAA', '工艺BBBB', '工艺CCCC', '管理AAAA', '管理BBBB', '管理CCCC'],
    processCourse: ['工艺AAAA', '工艺BBBB', '工艺CCCC'],
    managementCourse: ['管理AAAA', '管理BBBB', '管理CCCC'],
    processACourse: ['工艺AAAA'],
    processBCourse: ['工艺BBBB'],
    processCCourse: ['工艺CCCC'],
    managementACourse: ['管理AAAA'],
    managementBCourse: ['管理BBBB'],
    managementCCourse: ['管理CCCC'],
    courseArr: [],
    courseDir: [
      {
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
    this.setData({
      title: option.title,
      courseCategory: option.title
    });
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
  }
})