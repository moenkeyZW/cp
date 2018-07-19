// pages/task/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr: [],
    upImg: [],
    task:4,
    userInfo: {
      gender: 1,
    },
    cpInfo: {
      gender: 0,
    },
    taskArr:[1,2,1,4,2,3],
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow();// 刷新页面
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
            url: 'https://www.1537u.cn/admin/wechat/upload_img', //仅为示例，非真实的接口地址//接口连接
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
              console.log(res)
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
  deleteImg: function (e) {
    console.log(e)
    var that=this
    var img_arr = that.data.img_arr;
    var index = e.currentTarget.dataset.index;
    img_arr.splice(index, 1);
    that.setData({
      img_arr: img_arr
    });
  },

  // 提交任务
  upload: function() {
    var that = this;
    var imgUrl = that.data.upImg.join(',');
    var day = 7;
    var content = "我回复";
    wx.request({
      url: 'https://www.1537u.cn/admin/wechat/save_task',
      data: {
        day: day,
        content: content,
        imgUrl: imgUrl,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
      }
    })
  },
})