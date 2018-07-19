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
    userInfo: {},
    genderArray: ['男', '女'],
    ageArr: ageArr,
    heightArr: heightArr,
    weightArr: weightArr,
    EducationalArray: ['高中/中专', '专科', '本科', '研究生'],
    date: '请填写',
    region: ['省', '市', '区'],
    customItem: '全部',
    showView: true,
    showViewMusic: true,
    showViewMovie: true,
    showViewBook: true,
    showViewPet: true,
    sportList: '',
    sportArr: '',
    sportChoose: true,
    musicList: '',
    musicArr: '',
    musicChoose: true,
    movieList: '',
    movieArr: '',
    movieChoose: true,
    bookList: '',
    bookArr: '',
    bookChoose: true,
    petList: '',
    petArr: '',
    petChoose: true,

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
    var that=this;
    wx.request({
      url: 'https://www.1537u.cn/admin/wechat/lable.html',
      data: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          sportList: res.data.yundong,
          musicList: res.data.yinyue,
          movieList: res.data.dianying,
          bookList: res.data.shuji,
          petList: res.data.chongwu
        })
      },
    })
    showView: (options.showView == "true" ? true : false);
    showViewMusic: (options.showViewMusic == "true" ? true : false);
    showViewMovie: (options.showViewMovie == "true" ? true : false);
    showViewBook: (options.showViewBook == "true" ? true : false);
    showViewPet: (options.showViewPet == "true" ? true : false);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  personHandle: function (e) {
    console.log(e)
    let wxh = e.detail.value.wxh;
    let gender = e.detail.value.gender;
    let birthday = e.detail.value.birthday;
    let region = e.detail.value.region;
    let height = e.detail.value.height;
    let weight = e.detail.value.weight;
    let school = e.detail.value.school;
    let educational = e.detail.value.educational;
    let sport = e.detail.value.sport;
    let music = e.detail.value.music;
    let movie = e.detail.value.movie;
    let book = e.detail.value.book;
    let pet = e.detail.value.pet;
    let intro=e.detail.value.introduce;
    let future = e.detail.value.futureDoing;
    let now = e.detail.value.nowDoing;
    let youdian = e.detail.value.myYou;
    let quedian = e.detail.value.myQue;
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
    if (birthday === "" || birthday ==="请填写") {
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
    if (region === "" || region[0]=="省") {
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
    if (sport[0] === undefined) {
      mes = "喜欢的运动"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (music[0] === undefined) {
      mes = "喜欢的音乐"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (movie[0] === undefined) {
      mes = "喜欢的电影"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (book[0] === undefined) {
      mes = "喜欢的书籍"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }

    if (pet === "") {
      mes = "喜欢的宠物"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (intro === "") {
      mes = "我的成长经历"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (future === "") {
      mes = "我的未来规划"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (now === "") {
      mes = "我最近在做的事"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (youdian === "") {
      mes = "我的优点"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }
    if (quedian === "") {
      mes = "我的缺点"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function (res) { }
      })
      return
    }

    wx.navigateTo({
      url: '/pages/mate/index'
    })


  },
  sportChange: function (e) {
    var sportArr = '';
    var that = this
    var items = that.data.sportList;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
        sportArr = sportArr + items[i].name + ',';
        sportArr = sportArr.split(",");
      } else {
        items[i].checked = false;
      }
      if (checkArr.length > 3) {
        items[i].checked = false;
        wx.showModal({
          title: '提示',
          content: '最多选择3项',
          success: function (res) { }
        })
        return
      }
    }
    for (let j = 0; j < sportArr.length; j++) {
      if (sportArr[j] == '') {
        sportArr.splice(j, 1);
      }
    }
    if (sportArr.length > 0) {
      that.setData({
        sportChoose: false,
      })
    } else {
      that.setData({
        sportChoose: true,
      })
    }
    that.setData({
      sportList: items,
      sportArr: sportArr
    })

  },

  musicChange: function (e) {
    var musicArr = '';
    var that = this
    var items = that.data.musicList;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
        musicArr = musicArr + items[i].name + ',';
        musicArr = musicArr.split(",");
      } else {
        items[i].checked = false;
      }
      if (checkArr.length > 3) {
        items[i].checked = false;
        wx.showModal({
          title: '提示',
          content: '最多选择3项',
          success: function (res) { }
        })
        return
      }
    }
    for (let j = 0; j < musicArr.length; j++) {
      if (musicArr[j] == '') {
        musicArr.splice(j, 1);
      }
    }
    if (musicArr.length > 0) {
      that.setData({
        musicChoose: false,
      })
    } else {
      that.setData({
        musicChoose: true,
      })
    }
    that.setData({
      musicList: items,
      musicArr: musicArr
    })

  },
  movieChange: function (e) {
    var movieArr = '';
    var that = this
    var items = that.data.movieList;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
        movieArr = movieArr + items[i].name + ',';
        movieArr = movieArr.split(",");
      } else {
        items[i].checked = false;
      }
      if (checkArr.length > 3) {
        items[i].checked = false;
        wx.showModal({
          title: '提示',
          content: '最多选择3项',
          success: function (res) { }
        })
        return
      }
    }
    for (let j = 0; j < movieArr.length; j++) {
      if (movieArr[j] == '') {
        movieArr.splice(j, 1);
      }
    }
    if (movieArr.length > 0) {
      that.setData({
        movieChoose: false,
      })
    } else {
      that.setData({
        movieChoose: true,
      })
    }
    that.setData({
      movieList: items,
      movieArr: movieArr
    })

  },
  bookChange: function (e) {
    var bookArr = '';
    var that = this
    var items = that.data.bookList;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
        bookArr = bookArr + items[i].name + ',';
        bookArr = bookArr.split(",");
      } else {
        items[i].checked = false;
      }
      if (checkArr.length > 3) {
        items[i].checked = false;
        wx.showModal({
          title: '提示',
          content: '最多选择3项',
          success: function (res) { }
        })
        return
      }
    }
    for (let j = 0; j < bookArr.length; j++) {
      if (bookArr[j] == '') {
        bookArr.splice(j, 1);
      }
    }
    if (bookArr.length > 0) {
      that.setData({
        bookChoose: false,
      })
    } else {
      that.setData({
        bookChoose: true,
      })
    }
    that.setData({
      bookList: items,
      bookArr: bookArr
    })
  },
  petChange: function (e) {
    var petArr = '';
    var that = this
    var items = that.data.petList;
    var checkArr = e.detail.value;
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
        petArr = petArr + items[i].name + ',';
        petArr = petArr.split(",");
      } else {
        items[i].checked = false;
      }
    }
    for (let j = 0; j < petArr.length; j++) {
      if (petArr[j] == '') {
        petArr.splice(j, 1);
      }
    }
    if (petArr.length > 0) {
      that.setData({
        petChoose: false,
      })
    } else {
      that.setData({
        petChoose: true,
      })
    }
    that.setData({
      petList: items,
      petArr: petArr
    })

  },

  chooseSport: function (e) {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  chooseMovie: function (e) {
    var that = this;
    that.setData({
      showViewMovie: (!that.data.showViewMovie)
    })
  },
  chooseBook: function (e) {
    var that = this;
    that.setData({
      showViewBook: (!that.data.showViewBook)
    })
  },
  chooseMusic: function (e) {
    var that = this;
    that.setData({
      showViewMusic: (!that.data.showViewMusic)
    })
  },
  choosePet: function (e) {
    var that = this;
    that.setData({
      showViewPet: (!that.data.showViewPet)
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
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {

    this.setData({
      region: e.detail.value
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
  introYself: function (e) {
    console.log(e)
  },
  introFutu: function (e) {
    console.log(e)
  },
  introNow: function (e) {
    console.log(e)
  },
  introYou: function (e) {
    console.log(e)
  },
  introQue: function (e) {
    console.log(e)
  },

})