// pages/task/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: 2,
    userInfo: {
      gender: 1,
      headimgurl: '',
    },
    cpInfo: {
      gender: 2,
      headimgurl: '',
    },
    taskArr: [],
    day_task: {
      day: '',
      zw_day: '',
      state: '',
      title: '',
      bgcolor: '',
    },
 
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow(); // 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.request({
      url: app.globalData.base_url + 'wechat/task_list',
      data: {
        phase: wx.getStorageSync('phase'),
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        if(res.data.status===1){
          that.setData({
            task: res.data.status,
            taskArr: res.data.open_task,
            userInfo: res.data.my,
            cpInfo: res.data.my_cp,
            day_task: res.data.day_task,
          })
        }else{
          that.setData({
            task: res.data.status,
          })
        }
      }
    })
  },
  goDetail:function(e){
    var day = e.currentTarget.dataset.day;
    wx.navigateTo({
      url: '/pages/taskDetail/index?day=' + day,
    })
  },
  todayTask:function(){
    var that=this;
    var day = that.data.day_task.day;
    wx.navigateTo({
      url: '/pages/taskDetail/index?day=' + day,
    })
  },

})