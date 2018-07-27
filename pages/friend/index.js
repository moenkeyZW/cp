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
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that=this;
    let id = options.id;
    let name=options.name;
    that.setData({
      id:id,
      nickName:name  
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow();// 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var id=that.data.id;
    wx.request({
      url: app.globalData.base_url + 'wechat/share',
      data: {
        openid:id,
        hy_openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  callFriend: function(e) {
    console.log(e)
    app.onLogin();
    var that = this
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.navigateTo({
        url: '/pages/fdCall/index',
      })
    }
  },

})