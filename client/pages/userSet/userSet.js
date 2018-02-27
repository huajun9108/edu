var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
Page({
  data: {
    // url:""
  },
  onLoad: function () {
    console.log("iv");
    const url = config.service.courseUrl
    qcloud.request({
      login: true,
      url: url,
      success: function (response) {
        console.log(response);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  }
})