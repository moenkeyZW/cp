// pages/task/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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

  upload: function() {
    var that = this
    wx.chooseImage({
      count: 4,
      success: function(res) {
        console.log(res.tempFilePaths);
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
            success: function (res) {
              console.log(res)
              var data = res.data
              //do something
            }
          })
        }
      }
    })

  },
})