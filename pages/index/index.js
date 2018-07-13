//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    isHaveJoin:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    timestamp: '',
    intervarID: 'clock',
    status:'路人',
    percent:40,
    friendArr:[1,2,3,4,5,6,7,8,9,10],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;

    this.data.intervarID = setInterval(function () {
      var date = Date.parse(new Date()) / 1000;
      var time = 1530892800;
      var total = time - date;
      var day = parseInt(total / (24 * 60 * 60));//计算整数天数
      var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
      var hour = parseInt(afterDay / (60 * 60));//计算整数小时数
      var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
      var min = parseInt(afterHour / 60);//计算整数分
      var miao = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数\
      var hours=day*24 + hour;
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if(miao<10){
        miao="0" + miao;
      }
      var timestamp =  hours + ":" + min + ":" + miao;
      that.setData({
        timestamp: timestamp
      })
      if (total <= 0) {
        clearInterval(that.data.intervarID);
      }
    }, 1000
    )
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.navigateTo({
        url: '/pages/person/index',
      })
    } else {
      // wx.reLaunch({
      //   url: '/pages/index/index',
      // })
    }
  },
  actIntro:function(){
    wx.navigateTo({
      url: '/pages/intro/index',
    })
  },
  
})
