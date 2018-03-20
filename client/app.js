//app.js
const qcloud = require('./vendor/wafer2-client-sdk/index')
const config = require('./config')
const request = require('./utils/request.js')
const login = require('./utils/login.js')
const testSession = require('./utils/testSession.js')

App({
  data:{
    logged: false,
    userId: '',
    iconUrl: "https://smartmaker.xyz/icons/",
    imgUrl: "https://smartmaker.xyz/images/",
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