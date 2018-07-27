// pages/cpIntro/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cpInfo:{
      gender:'男',
      birthday: '1992-1-5',
      city:'杭州市',
      height:'178cm',
      weight:'60kg',
      school:'浙师大',
      xueli:'本科',
      books:'',
      film:'',
      motion:'',
      music:'',
      pet:'',
      self:'我喜欢打篮球、足球、拍照。喜欢听轻音乐。喜欢的电影是美丽人生、西线无战事。喜欢阅读《五年高考十年模拟》、《唐吉坷德》、《杂志》。我喜欢猫。喜欢打篮球、足球、拍照。喜欢听轻音乐。喜欢的电影是美丽人生、西线无战事。喜欢阅读《五年高考十年模拟》、《唐吉坷德》、《杂志》。我喜欢猫喜欢打篮球、足球、拍照。喜欢听轻音乐。喜欢的电影是美丽人生、西线无战事。喜欢阅读《五年高考十年模拟》、《唐吉坷德》、《杂志》。我喜欢猫喜欢打篮球、足球、拍照。喜欢听轻音乐。喜欢的电影是美丽人生、西线无战事。喜欢阅读《五年高考十年模拟》、《唐吉坷德》、《杂志》。我喜欢猫',
      what:'CP的未来规划',
      thing:'CP最近正在做的事',
      trait:'CP的优缺点',
    },
    isFold: true,
    isFu:true,
    isNow:true,
    isYq:true,
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow(); // 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
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
    var that=this;
    wx.request({
      url: app.globalData.base_url + 'wechat/cp_info',
      data: {
        openid: wx.getStorageSync('openid'),
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          cpInfo:res.data.data
        })
      }
    })
  },

  showAll: function (e) {
    this.setData({
      isFold: !this.data.isFold,
    })
  },
  showFu: function (e) {
    this.setData({
      isFu: !this.data.isFold,
    })
  },
  showNow: function (e) {
    this.setData({
      isNow: !this.data.isFold,
    })
  },
  showYq: function (e) {
    this.setData({
      isYou: !this.data.isFold,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})