// pages/introSelf/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShow: function () {
    var that=this;
    wx.request({
      url: app.globalData.base_url + 'wechat/self',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res)
        that.setData({
          userInfo: res.data.info,
        })
      }
    })
  },
  
  introSelf:function(e){
    console.log(e)
    let intro = e.detail.value.introduce;
    let future = e.detail.value.futureDoing;
    let now = e.detail.value.nowDoing;
    let yq = e.detail.value.myYQ;
    let mes = "";
    if (intro === "") {
      mes = "我的成长经历"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (future === "") {
      mes = "我的未来规划"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (now === "") {
      mes = "我最近在做的事"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (yq === "") {
      mes = "我的优缺点"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    wx.request({
      url: app.globalData.base_url + 'wechat/save_self',
      data: {
        self: intro,
        what: future,
        thing: now,
        trait: yq,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500,
            mask: true,
          })
        }
      }

    })
  },

  introYself: function (e) {
    console.log(e)
  },
  introFutu: function (e) {
    console.log(e)
  },
  introNow: function (e) {
    console.log(e)
  },
  introYQ: function (e) {
    console.log(e)
  },

})