//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    status: 0,
    userInfo: {},
    task: 1,
    num: '',
    distance: 2,
    day:'',
    detail:'任务详情',
    explain:'任务说明',
    title:'任务标题',
    cpInfo: {
      nickname: '一千年以后',
      age: 22,
      city: '杭州市',
      headimgurl: '',
    },
    timestamp: '',
    intervarID: 'clock',
    shenfen: '路人',
    percent: 12.5,
    right:'',
    friendArr: '',
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow(); // 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  onLoad: function() {
    var that = this;
  },
  onShow: function() {
    var that = this;
    var userInfo = app.globalData.userInfo;
    if (!app.globalData.userInfo) {
      wx.showLoading({
        title: '加载中...',
      })
      app.onRefresh(function(res) {
        wx.hideLoading()
        that.setData({
          userInfo: app.globalData.userInfo,
        })
      });
    } else {
      that.setData({
        userInfo: app.globalData.userInfo,
      })
    }
    wx.request({
      url: app.globalData.base_url + 'wechat/bmcg',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: function(res) {
        console.log(res)
        that.setData({
          status: res.data.status,
        })
        if (res.data.status === 1) {
          wx.setStorageSync('phase', res.data.data.phase);
          that.setData({
            percent: res.data.data.grade * 12.5,
            shenfen:res.data.zhuli.name,
            distance: res.data.zhuli.diff,
          })
          if(res.data.data.grade>0){
            that.setData({
              friendArr:res.data.img,
              right:res.data.right,
            })
          }
          that.data.intervarID = setInterval(function() {
            var date = Date.parse(new Date()) / 1000;
            var time = res.data.data.end_time;
            var total = time - date;
            var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
            var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
            var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
            var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
            var min = parseInt(afterHour / 60); //计算整数分
            var miao = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数\
            var hours = day * 24 + hour;
            if (hours < 10) {
              hours = "0" + hours;
            }
            if (min < 10) {
              min = "0" + min;
            }
            if (miao < 10) {
              miao = "0" + miao;
            }
            var timestamp = hours + ":" + min + ":" + miao;
            that.setData({
              timestamp: timestamp
            })
            if (total <= 0) {
              clearInterval(that.data.intervarID);
              that.onShow(); // 刷新页面
            }
          }, 1000)
        }
        if (res.data.status === 2) {
          that.setData({
            cpInfo: res.data.info,
            num: res.data.num,
            task:res.data.state,
            title:res.data.title,
            detail:res.data.detail,
            explain:res.data.explain,
            day:res.data.day,
          })
        }
      }

    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.onLogin();
    var that = this
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.navigateTo({
        url: '/pages/totalPer/index',
      })
    }

  },
  actIntro: function() {
    wx.navigateTo({
      url: '/pages/intro/index',
    })
  },

  onShareAppMessage: function(res) {
    if (app.globalData.userInfo) {
      var id = app.globalData.userInfo.openid;
      var name = app.globalData.userInfo.nickname;
    } else {
      app.onRefresh();
      // var id = app.globalData.userInfo.openid;
      // var name = app.globalData.userInfo.nickname;
    }
    return {
      title: '来自' + name + '的一封信',
      path: '/pages/friend/index?id=' + id + '&name=' + name,
    }
  },
  uptask: function() {
    var that=this;
    var day=that.data.day;
    wx.navigateTo({
      url: '/pages/taskUp/index?day='+day,
    })
  },
  taskDetail: function() {
    var that = this;
    var day = that.data.day;
    wx.navigateTo({
      url: '/pages/taskDetail/index?day=' + day,
    })
  },
  lookcp:function(){
    wx.navigateTo({
      url: '/pages/cpIntro/index',
    })
  },
})