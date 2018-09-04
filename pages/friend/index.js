// pages/friend/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shenfen: '',
    percent: '',
    openid: '',
    hyArrs: '',
    top: 1096,
    status: 0,
    page: 1,
    haveMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    var openid = options.openid;
    that.setData({
      openid: openid
    })
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow(); // 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var openid = that.data.openid;
    var page = that.data.page;
    if (wx.getStorageSync('openid')) {
      wx.request({
        url: app.globalData.base_url + 'wechat/share',
        data: {
          page: page,
          openid: openid,
          hy_openid: wx.getStorageSync('openid')
        },
        success: function(res) {
          console.log(res)
          if (res.data.status == 3) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
          that.setData({
            status: res.data.status,
            shenfen: res.data.zhuli.name,
            hyArrs: res.data.zhuli.img_url,
            percent: res.data.zhuli.grade * 12.5,
            haveMore: res.data.zhuli.more,
          })
          if (res.data.status == 1) {
            that.setData({
              top: 984
            })
          }
       
        }
      })
    } else {
      return
    }

  },
  callFriend: function(e) {
    console.log(e)
    var that = this;
    var openid = that.data.openid;
    if (wx.getStorageSync('openid')) {
      wx.request({
        url: app.globalData.base_url + 'wechat/help',
        data: {
          openid: openid,
          hy_openid: wx.getStorageSync('openid')
        },
        success: function(res) {
          that.setData({
            status: 1
          })
          that.onShow();
        }
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.request({
          url: app.globalData.base_url + 'wechat/help',
          data: {
            openid: openid,
            hy_openid: wx.getStorageSync('openid')
          },
          success: function(res) {
            that.setData({
              status: 1
            })
            that.onShow();
          }
        })
      }
    }
  },
  // 上拉触底事件，请求记录数据
  onReachBottom: function() {
    const that = this
    let page = that.data.page;
    if (wx.getStorageSync('openid')) {
      if (that.data.haveMore) {
        // 请求下一页数据
        page++;
        that.data.page = page;
        // wx.showLoading({
        //   title: '加载中',
        // })
        wx.request({
          url: app.globalData.base_url + 'wechat/share',
          data: {
            page: page,
            openid: openid,
            hy_openid: wx.getStorageSync('openid')
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            wx.hideLoading()
            that.setData({
              hyArrs: res.data.zhuli.img_url,
              haveMore: res.data.zhuli.more,
            })
          }
        })
      } else {
        wx.showToast({
          title: '数据加载完毕',
          icon: 'success',
          duration: 1500,
        })
      }
    }
  },
  callJoin: function(e) {
    if (wx.getStorageSync('openid')) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      app.onLogin();
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    }
  },

})