//app.js
const qcloud = require('./vendor/wafer2-client-sdk/index')
const config = require('./config')
const request = require('./utils/request.js')
const login = require('./utils/login.js')
const testSession = require('./utils/testSession.js')

App({
  data:{
    logged:false,
    userId:'',
    iconUrl: "http://139.199.10.41/icons/",
    imgUrl: "http://139.199.10.41/images/",
    isVip:false,
    vipDate:""
  },
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl);
  },
  onError: function (msg){
    console.log(msg)
  },
  request: request,
  login: login.login,
  testSession: testSession.testSession
})