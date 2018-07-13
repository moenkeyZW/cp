// pages/introSelf/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  
  introSelf:function(e){
    let intro = e.detail.value.introduce;
    let future = e.detail.value.futureDoing;
    let now = e.detail.value.nowDoing;
    let youdian = e.detail.value.myYou;
    let quedian = e.detail.value.myQue;
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
    if (youdian === "") {
      mes = "我的优点"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (quedian === "") {
      mes = "我的缺点"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
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
  introYou: function (e) {
    console.log(e)
  },
  introQue: function (e) {
    console.log(e)
  },

})