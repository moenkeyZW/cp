// pages/taskDetail/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      avatar:'',
      gender:1,
      age:'',
      nickname:'',
      content:'',
      imgurl: [],
    },
    cpInfo:{
      avatar:'',
      gender:0,
      age:'',
      nickname: '',
      content: '',
      imgurl: [],
    },
    detail: '任务详情',
    explain: '任务说明',
    title: '任务标题',
    task:1,
    num:2,
    day:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.day){
      var day = options.day;
      that.setData({
        day: day
      })
    } else {
      console.log('第几天没传过来');
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    var day=that.data.day;
    wx.request({
      url: app.globalData.base_url + 'wechat/task_details',
      data: {
        day: day,
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          task:res.data.status,
          userInfo:res.data.userInfo,
          cpInfo:res.data.cpInfo,
          title:res.data.task.title,
          detail:res.data.task.detail,
          explain:res.data.task.explain,
          num:res.data.task.num
        })
        if(that.data.userInfo.content==null){
          that.setData({
            'userInfo.content':'',
          })
        }
        if (that.data.cpInfo.content == null) {
          that.setData({
            'cpInfo.content': '',
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow();// 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  onUnload: function () {
    var that=this;
    var pages = getCurrentPages(); // 当前页面
    var beforePage = pages[pages.length - 2]; // 前一个页面
    if (beforePage.route === "pages/taskUp/index"){
      wx.navigateBack({
        delta: 2,
      })
    }

  },
  cpPreviewImage: function (e) {
    var that = this;
    var img = e.currentTarget.dataset.img;
    img = 'https://www.1537u.cn/Public/UploadWechat/' + img;
    var imgArr = that.data.cpInfo.imgurl;
    var imgArrs = [];
    for (var i = 0; i < imgArr.length; i++) {
      imgArrs.push('https://www.1537u.cn/Public/UploadWechat/' + imgArr[i]);
    }
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: imgArrs// 需要预览的图片http链接列表
    })
  },
  previewImage:function(e){
    var that=this;
    var img = e.currentTarget.dataset.img;
    img = 'https://www.1537u.cn/Public/UploadWechat/'+img;
    var imgArr = that.data.userInfo.imgurl;
    var imgArrs = [];
    for(var i=0;i<imgArr.length;i++){
      imgArrs.push('https://www.1537u.cn/Public/UploadWechat/' + imgArr[i]);
    }
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: imgArrs// 需要预览的图片http链接列表
    })
  },
  uptask: function () {
    var that = this;
    var day = that.data.day;
    wx.navigateTo({
      url: '/pages/taskUp/index?day=' + day,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})