var API_URL = "https://jfn15ogq.qcloud.la";
Page({
  data: {
    // url:""
  },
  onLoad: function () {
    console.log("iv");
    wx.login({//login流程
      success: function (res) {//登录成功
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({//getUserInfo流程
            success: function (res2) {//获取userinfo成功
              console.log(res2);
              var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
              var iv = res2.iv;
              //请求自己的服务器
              Login(code, encryptedData, iv);
            }
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  }
})
function Login(code, encryptedData, iv) {
  console.log('code=' + code + '&encryptedData=' + encryptedData + '&iv=' + iv);
  //创建一个dialog
  wx.showToast({
    title: '正在登录...',
    icon: 'loading',
    duration: 10000
  });
  //请求服务器
  wx.request({
    url: API_URL,
    data: {
      code: code,
      encryptedData: encryptedData,
      iv: iv
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json'
    }, // 设置请求的 header
    success: function (res) {
      // success
      wx.hideToast();
      console.log('服务器返回' + JSON.stringify(res));

    },
    fail: function () {
      // fail
      // wx.hideToast();
    },
    complete: function () {
      // complete
    }
  })
}