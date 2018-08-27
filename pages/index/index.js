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
    shenfen: '路人',
    percent: 12.5,
    right:'',
    friendArr: '',
    hyArrs: '', 
    hyname: '', 
    showView:true,
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
              hyArrs:res.data.zhuli.img_url,
            })
          }
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
      var openid = wx.getStorageSync('openid');
      var name = app.globalData.userInfo.nickname;
    } else {
      app.onRefresh();
    }
    return {
      title: '来自' + name + '的一封信',
      path: '/pages/friend/index?openid=' + openid,
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
  chatRoom:function(){
    wx.navigateTo({
      url: '/pages/chatRoom/index',
    })
  },
  showAllHy: function (e) {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
})