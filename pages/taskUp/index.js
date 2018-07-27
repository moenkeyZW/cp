// pages/taskUp/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr: [],
    upImg: [],
    day: '',
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (options.day) {
      var day = options.day;
      that.setData({
        day: day
      })
    } else {
      console.log('第几天没传过来');
    }
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

  },
  choose: function() {
    var that = this
    wx.chooseImage({
      count: 4,
      success: function(res) {
        that.setData({
          img_arr: that.data.img_arr.concat(res.tempFilePaths)
        })
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.base_url + 'wechat/upload_img',
            filePath: tempFilePaths[i],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'accept': 'application/json',
            },
            formData: {
              'user': 'test'
            },
            success: function(res) {
              that.setData({
                upImg: that.data.upImg.concat(res.data)
              })
            }
          })
        }
      }
    })
  },
  // 删除图片
  deleteImg: function(e) {
    var that = this
    var img_arr = that.data.img_arr;
    var upImg = that.data.upImg;
    var index = e.currentTarget.dataset.index;
    img_arr.splice(index, 1);
    upImg.splice(index, 1);
    that.setData({
      img_arr: img_arr,
      upImg: upImg
    });
  },
  yourThink: function(e) {
    var that = this;
    that.setData({
      content: e.detail.value
    })
  },
  // 提交任务
  upload: function() {
    var that = this;
    var imgUrl = that.data.upImg.join(',');
    if (imgUrl == "") {
      wx.showToast({
        title: '图片不能为空',
        icon: 'success',
        duration: 1500,
        mask: true,
      })
      return
    }
    var day = that.data.day;
    var content = that.data.content;
    wx.request({
      url: app.globalData.base_url + 'wechat/save_task',
      data: {
        day: day,
        content: content,
        imgUrl: imgUrl,
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.status === 1) {
          wx.showModal({
            title: '恭喜完成七天任务',
            content: '撩妹/汉终需靠自己,我们只能牵线到这里了，祝你好运',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '/pages/taskDetail/index?day=' + day,
              })
            }
          })
        }else{
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            mask: true,
            success: function (res) {
              wx.navigateTo({
                url: '/pages/taskDetail/index?day=' + day,
              })
            }
          })
        }
      }
    })
  },
})