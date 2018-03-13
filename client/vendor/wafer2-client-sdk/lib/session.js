var constants = require('./constants');
var SESSION_KEY = 'weapp_session_' + constants.WX_SESSION_MAGIC_ID;
var SESSION_VIP_KEY = 'weapp_session_' + constants.WX_HEADER_VIP;
var SESSION_VIP_DATE_KEY = 'weapp_session_' + constants.WX_HEADER_VIP_DATE;
var Session = {
    get: function () {
        return wx.getStorageSync(SESSION_KEY) || null;
    },
    getIsVip: function () {
      return wx.getStorageSync(SESSION_VIP_KEY) || null;
    },

    getVipDate: function () {
      return wx.getStorageSync(SESSION_VIP_DATE_KEY) || null;
    },

    set: function (session) {
        wx.setStorageSync(SESSION_KEY, session);
    },
    setIsVip: function (session) {
      wx.setStorageSync(SESSION_VIP_KEY, session);
    },

    setVipDate: function (session) {
      wx.setStorageSync(SESSION_VIP_DATE_KEY, session);
    },

    clear: function () {
        wx.removeStorageSync(SESSION_KEY);
        wx.removeStorageSync(SESSION_VIP_KEY);
        wx.removeStorageSync(SESSION_VIP_DATE_KEY);
    },
};

module.exports = Session;