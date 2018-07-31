// pages/person/index.js
const app = getApp();

const ageArr = [],
  heightArr = [],
  weightArr = []
for (let i = 1; i < 101; i++) {
  ageArr.push(i)
}
for (let i = 100; i < 220; i++) {
  heightArr.push(i)
}
for (let i = 30; i < 180; i++) {
  weightArr.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      gender: '',
      birthday: '请填写',
      height: '',
      weight: '',
      school: '',
      xueli: '',
    },
    genderArray: ['男', '女'],
    ageArr: ageArr,
    heightArr: heightArr,
    weightArr: weightArr,
    EducationalArray: ['高中/中专', '专科', '本科', '研究生'],
    region: ['省', '市', '区'],
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
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.base_url +'wechat/info',
      data: {
        openid: wx.getStorageSync('openid'),
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.status===1){
          that.setData({
            region:res.data.info.szd,
            'userInfo.gender':res.data.info.sex,
            'userInfo.birthday': res.data.info.birthday,
            'userInfo.school': res.data.info.school,
            'userInfo.xueli': res.data.info.xueli,
            'userInfo.height':res.data.info.height,
            'userInfo.weight':res.data.info.weight,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  personHandle: function (e) {
    console.log(e)
    let gender = e.detail.value.gender;
    let birthday = e.detail.value.birthday;
    let region = e.detail.value.region;
    let province = region[0];
    let city = region[1];
    let area = region[2];
    let height = e.detail.value.height;
    let weight = e.detail.value.weight;
    let school = e.detail.value.school;
    let educational = e.detail.value.educational;
    let mes = "";
    if (gender === "") {
      mes = "性别"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }
    if (birthday === "" || birthday === "请填写") {
      mes = "生日"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }
    if (region === "" || region[0] == "省") {
      mes = "所在地"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }

    if (height === "") {
      mes = "身高"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }
    if (weight === "") {
      mes = "体重"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }
    if (school === "") {
      mes = "学校"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }
    if (educational === "" || educational == null) {
      mes = "学历"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
      return
    }
    gender = gender === '男' ? 1 : 2
    wx.request({
      url: app.globalData.base_url + 'wechat/save_info',
      data: {
        sex: gender,
        birthday: birthday,
        province: province,
        city : city,
        area : area,
        height: height,
        weight:weight,
        school:school,
        xueli: educational,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        if (res.statusCode === 200) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1500,
              mask: true,
          })
        }
      }

    })
  },

  wxInput: function (e) {
    console.log(e)
    this.setData({
      wx: e.detail.value
    })
  },
  wxSchool: function (e) {
    this.setData({
      school: e.detail.value
    })
  },
  pickGender: function (e) {
    this.setData({
      [`userInfo.gender`]: Number.parseInt(e.detail.value) + 1
    })
  },
  DateChange: function (e) {
    this.setData({
      'userInfo.birthday': e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
    })
  },
  pickHeight: function (e) {
    this.setData({
      [`userInfo.height`]: Number.parseInt(e.detail.value) + 100,
    })
  },
  pickWeight: function (e) {
    this.setData({
      [`userInfo.weight`]: Number.parseInt(e.detail.value) + 30,
    })
  },
  pickEducational: function (e) {
    this.setData({
      index: e.detail.value
    })
  },


})