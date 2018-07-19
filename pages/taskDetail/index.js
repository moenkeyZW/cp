// pages/taskDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      gender:1,
    },
    cpInfo:{
      gender:0,
    },
    img_arr: ['../../imgs/nan.png', '../../imgs/nv.png', '../../imgs/badge.png', '../../imgs/bgs.png',],
    task:1,
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
  
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow();// 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})