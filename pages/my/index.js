// pages/my/index.js

const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow();// 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (!app.globalData.userInfo) {
      app.onRefresh(function (res) {
        that.setData({
          userInfo: app.globalData.userInfo,
        })
      });
    } else {
      const userInfo = app.globalData.userInfo;
      that.setData({
        userInfo: userInfo
      })
    }
  },
  goPerson: function () {
    wx.navigateTo({
      url: '/pages/person/index',
    })
  },
  goIntroSelf:function(){
    wx.navigateTo({
      url: '/pages/introSelf/index',
    })
  },
  goMyHobby:function(){
    wx.navigateTo({
      url: '/pages/hobby/index',
    })
  },
  goIntro:function(){
    wx.navigateTo({
      url: '/pages/intro/index',
    })
  },

})