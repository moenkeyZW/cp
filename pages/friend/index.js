// pages/friend/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: 'XXX',
    status:'小咖',
    percent: 25,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let id = options.id;
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var userInfo = app.globalData.userInfo;
    if (!app.globalData.userInfo) {
      app.onRefresh(function (res) {
        console.log(res)
        that.setData({
          nickName: res.nickname,
        })
      });
    } else {
      that.setData({
        nickname: app.globalData.userInfo.nickname,
      })
    }
  },
  callFriend: function(e) {
    app.onLogin();
    var that = this
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.navigateTo({
        url: '/pages/fdCall/index',
      })
    }
  },

})