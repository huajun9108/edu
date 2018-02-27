const qcloud = require('../vendor/wafer2-client-sdk/index')
const config = require('../config')
const util = require('../utils/util.js')
const Session = require('../vendor/wafer2-client-sdk/lib/session');
function login(successFn){
  // 调用登录接口
  qcloud.login({
    success(result) {
      if (result) {
        util.showSuccess('登录成功')
        const session = Session.get()
        const app = getApp()
        app.data.userId = session.userinfo.openId;
        console.log(result)
        successFn(result)
      } else {
        // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
        qcloud.request({
          url: config.service.requestUrl,
          login: true,
          success(result) {
            util.showSuccess('登录成功')
            console.log(session)
            app.data.userId = session.userinfo.openId;
            console.log(app.data.userId);
            console.log(result);
            that.setData({
              userInfo: result.data.data,
              logged: true
            })
          },

          fail(error) {
            util.showModel('请求失败', error)
          }
        })
      }
      return result
    },

    fail(error) {
      util.showModel('登录失败', error)
    }
  })
};

module.exports = {
  login
}