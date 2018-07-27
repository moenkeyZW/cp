// pages/mate/index.js
const app = getApp();

const ageArr = [];

for (let i = 18; i < 40; i++) {
  ageArr.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ageArr: ageArr,
    EducationalArray: ['不限','高中/中专以上', '专科以上', '本科以上', '研究生以上'],
    AreaArray:['不限','同省','同城'],
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
  
  },

  mateHandle: function (e) {
    console.log(e)
    let ageMin = e.detail.value.ageMin;
    let ageMax = e.detail.value.ageMax;
    let area = e.detail.value.area;
    let edu = e.detail.value.edu;
    let mes = "";
    if (ageMin === "") {
      mes = "最小年龄"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }
    if (ageMax === "") {
      mes = "最大年龄"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }
    if (area === ""||area == null) {
      mes = "地区"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }

    if (edu === "" || edu == null) {
      mes = "学历"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }
    wx.request({
      url: app.globalData.base_url + 'wechat/save_condition',
      data: {
        min_age: ageMin,
        max_age: ageMax,
        area: area,
        xueli: edu,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res)
        wx.switchTab({
          url: '/pages/index/index'
        })
      }

    })
 
  },
  pickMinAge: function (e) {
    this.setData({
      [`ageMin`]: Number.parseInt(e.detail.value) + 18
    })
  },
  pickMaxAge: function (e) {
    this.setData({
      [`ageMax`]: Number.parseInt(e.detail.value) + 18
    })
  },
  pickEducational: function (e) {
    this.setData({
      indexs: e.detail.value
    })
  },
  pickArea: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

})