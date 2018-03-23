const Session = require('../vendor/wafer2-client-sdk/lib/session');

function testSession(){
  const session = Session.get();
  const app = getApp()
  var sucess = arguments[0] ? arguments[0] : function () { };//成功的回调
  var fail = arguments[1] ? arguments[1] : function () { };//失败的回调
  var e = arguments[2] ? arguments[2] : '';
  if (session) {
    wx.checkSession({
      success: function (result) {
        console.log(result)
        app.data.userId = session.userinfo.openId;
        console.log(session)
        sucess(e)
      },
      fail: function () {
        Session.clear();
        fail()
      },
    });
    return true
  } else {
    fail()
  }
}


module.exports = {
  testSession
}