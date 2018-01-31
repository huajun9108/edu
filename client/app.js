//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
import Touches from './utils/touches.js'

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    Touches: new Touches()
})