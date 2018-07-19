//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    status:4,
    userInfo:{},
    task:1,
    cpInfo: {
      nickname:'一千年以后',
      age:22,
      city:'杭州市',
      area:'西湖区',
    },
    timestamp: '',
    intervarID: 'clock',
    shenfen:'路人',
    percent:25,
    friendArr:[
      { img: '../../imgs/ta.png', right: '440rpx' },
      { img: '../../imgs/bgS.png', right: '400rpx' },
      { img: '../../imgs/ta.png', right: '360rpx' }, 
      { img: '../../imgs/ta.png', right: '320rpx' },
      { img: '../../imgs/ta.png', right: '280rpx' },
      { img: '../../imgs/ta.png', right: '240rpx' },
      { img: '../../imgs/ta.png', right: '200rpx' },
      { img: '../../imgs/ta.png', right: '160rpx' },
    ],
  },

  onLoad: function () {
    var that = this;
    that.data.intervarID = setInterval(function () {
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
    }, 1000)
  },
  onShow:function(){
    var that = this;
    var userInfo = app.globalData.userInfo;
    if (!app.globalData.userInfo) {
      wx.showLoading({
        title: '加载中...',
      })
      app.onRefresh(function (res) {
       console.log(res)
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

  },
  getUserInfo: function(e) {
    app.onLogin();
    var that=this
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.navigateTo({
        url: '/pages/totalPer/index',
      })
    }
 
  },
  actIntro:function(){
    wx.navigateTo({
      url: '/pages/intro/index',
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow();// 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  onShareAppMessage: function (res) {
    if(app.globalData.userInfo){
      var id = app.globalData.userInfo.openid;
      var name = app.globalData.userInfo.nickname;
    }else{
      app.onRefresh();
      // var id = app.globalData.userInfo.openid;
      // var name = app.globalData.userInfo.nickname;
    }
    return {
      title: '来自'+name+'的一封信',
      path: '/pages/friend/index?id='+id+'&name='+name,
    }
  },
  uptask:function(){
    wx.switchTab({
      url: '/pages/task/index',
    })
  },
  taskDetail:function(){
    wx.navigateTo({
      url: '/pages/taskDetail/index',
    })
  },
})
