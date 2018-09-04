// pages/socks/socks.js
const app = getApp()

var websocket = require('../../utils/websocket.js');

var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */

  data: {
    newslist: [],
    userInfo: {},
    scrollTop: 0,
    aniStyle: true, //动画效果
    message: "",
    previewImgList: [],
    showView: true,
    autoplay: false,
    imgUrls: [
      ['../../imgs/faces/ee_1.png',
        '../../imgs/faces/ee_2.png',
        '../../imgs/faces/ee_3.png',
        '../../imgs/faces/ee_4.png',
        '../../imgs/faces/ee_5.png',
        '../../imgs/faces/ee_6.png',
        '../../imgs/faces/ee_7.png',
        '../../imgs/faces/ee_8.png',
        '../../imgs/faces/ee_9.png',
        '../../imgs/faces/ee_10.png',
        '../../imgs/faces/ee_11.png',
        '../../imgs/faces/ee_12.png',
        '../../imgs/faces/ee_13.png',
        '../../imgs/faces/ee_14.png',
        '../../imgs/faces/ee_15.png',
        '../../imgs/faces/ee_16.png',
        '../../imgs/faces/ee_17.png',
        '../../imgs/faces/ee_18.png',
        '../../imgs/faces/ee_19.png',
        '../../imgs/faces/ee_20.png',
        '../../imgs/faces/ee_21.png',
        '../../imgs/faces/ee_22.png',
        '../../imgs/faces/ee_23.png',
        '../../imgs/faces/ee_24.png',
      ],
      [
        '../../imgs/faces/ee_25.png',
        '../../imgs/faces/ee_26.png',
        '../../imgs/faces/ee_27.png',
        '../../imgs/faces/ee_28.png',
        '../../imgs/faces/ee_29.png',
        '../../imgs/faces/ee_30.png',
        '../../imgs/faces/ee_31.png',
        '../../imgs/faces/ee_32.png',
        '../../imgs/faces/ee_33.png',
        '../../imgs/faces/ee_34.png',
        '../../imgs/faces/ee_35.png',
      ],
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function() {

    var that = this

    if (app.globalData.userInfo) {

      that.setData({

        userInfo: app.globalData.userInfo

      })

    }

    //调通接口

    websocket.connect(that.data.userInfo, function(res) {

      // console.log(JSON.parse(res.data))
      console.log(res)

      var list = []

      list = that.data.newslist

      list.push(JSON.parse(res.data))

      that.setData({

        newslist: list

      })

    })

  },

  // 页面卸载

  onUnload() {

    wx.closeSocket();

    // wx.showToast({

    //   title: '连接已断开~',

    //   icon: "none",

    //   duration: 2000

    // })

  },

  //事件处理函数

  send: function() {

    var flag = this

    if (this.data.message.trim() == "") {

      wx.showToast({

        title: '消息不能为空哦~',

        icon: "none",

        duration: 2000

      })

    } else {

      setTimeout(function() {

        flag.setData({

          increase: false,
          message: '',

        })

      }, 500)

      websocket.send('{ "content": "' + this.data.message + '", "date": "' + utils.formatTime(new Date()) + '","type":"text", "nickname": "' + this.data.userInfo.nickname + '", "headimgurl": "' + this.data.userInfo.headimgurl + '" }')

      // this.bottom()

    }

  },

  //监听input值的改变

  bindChange(res) {

    this.setData({

      message: res.detail.value

    })

  },

  cleanInput() {

    //button会自动清空，所以不能再次清空而是应该给他设置目前的input值

    this.setData({

      message: this.data.message

    })

  },

  increase() {

    this.setData({

      increase: true,

      aniStyle: true

    })

  },

  //点击空白隐藏message下选框

  outbtn:function() {
    var that = this;
    var showView = that.data.showView;
    that.setData({

      showView: true,

      aniStyle: true

    })

  },

  //发送图片
  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://www.1537u.cn/admin/wechat/upload_img', //服务器地址

          filePath: tempFilePaths[0],

          name: 'file',

          headers: {

            'Content-Type': 'form-data'

          },
          success: function(res) {
            websocket.send('{"images":"' + "https://www.1537u.cn/Public/UploadWechat/" + res.data + '","date":"' + utils.formatTime(new Date()) + '","type":"image","nickname":"' + that.data.userInfo.nickname + '","headimgurl":"' + that.data.userInfo.headimgurl + '"}')
          }
        })

      }
    })
  },

  //图片预览

  previewImg(e) {

    var that = this

    //必须给对应的wxml的image标签设置data-set=“图片路径”，否则接收不到

    var res = e.target.dataset.src

    var list = this.data.previewImgList //页面的图片集合数组

    //判断res在数组中是否存在，不存在则push到数组中, -1表示res不存在

    if (list.indexOf(res) == -1) {

      this.data.previewImgList.push(res)

    }

    wx.previewImage({

      current: res, // 当前显示图片的http链接

      urls: that.data.previewImgList // 需要预览的图片http链接列表

    })

  },

  //聊天消息始终显示最底端

  bottom: function() {

    var query = wx.createSelectorQuery()

    query.select('#flag').boundingClientRect()

    query.selectViewport().scrollOffset()

    query.exec(function(res) {

      wx.pageScrollTo({

        scrollTop: res[0].bottom // #the-id节点的下边界坐标

      })

      res[1].scrollTop // 显示区域的竖直滚动位置

    })

  },
  emoji: function() {
    var that = this;
    var showView = that.data.showView;
    that.setData({
      showView: !showView
    })
  },
  sendEmoji:function(e){

    var that=this;
    var str=e.target.dataset.emoji;
    if(str>=24){
      var index=e.target.dataset.index;
      var img = that.data.imgUrls[1][index];
    }else{
      var img = that.data.imgUrls[0][str];
    }
    websocket.send('{"emoji":"' + img + '","date":"' + utils.formatTime(new Date()) + '","type":"emoji","nickname":"' + that.data.userInfo.nickname + '","headimgurl":"' + that.data.userInfo.headimgurl + '"}')
  },

})