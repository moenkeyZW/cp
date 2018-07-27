// pages/hobby/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
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
    movieList:'',
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
  onLoad: function(options) {
    var that = this;
    showView: (options.showView == "true" ? true : false);
    showViewMusic: (options.showViewMusic == "true" ? true : false);
    showViewMovie: (options.showViewMovie == "true" ? true : false);
    showViewBook: (options.showViewBook == "true" ? true : false);
    showViewPet: (options.showViewPet == "true" ? true : false);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that=this;
    wx.request({
      url: app.globalData.base_url + 'wechat/hobby',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res)
        that.setData({
          sportList: res.data.yundong,
          musicList: res.data.yinyue,
          movieList: res.data.dianying,
          bookList: res.data.shuji,
          petList: res.data.chongwu
        })
        if (res.data.info) {
          that.setData({
            userInfo: res.data.info,
          })
        }
        if (res.data.info.motion) {
          that.setData({
            sportArr: res.data.info.motion,
            sportChoose: false,
          })
        }
        if (res.data.info.music) {
          that.setData({
            musicArr: res.data.info.music,
            musicChoose: false,
          })
        }
        if (res.data.info.film) {
          that.setData({
            movieArr: res.data.info.film,
            movieChoose: false,
          })
        }
        if (res.data.info.books) {
          that.setData({
            bookArr: res.data.info.books,
            bookChoose: false,
          })
        }
        if (res.data.info.pet) {
          that.setData({
            petArr: res.data.info.pet,
            petChoose: false,
          })
        }
      }

    })
  },

  hobbyHandle: function(e) {
    var that=this;
    if (that.data.userInfo.motion_value && e.detail.value.sport[0] === undefined) {
      var sport = that.data.userInfo.motion_value.join(",")
    } else {
      var sport = e.detail.value.sport.join(",");
    }
    if (that.data.userInfo.music_value && e.detail.value.music[0] === undefined) {
      var music = that.data.userInfo.music_value.join(",")
    } else {
      var music = e.detail.value.music.join(",");
    }
    if (that.data.userInfo.film_value && e.detail.value.movie[0] === undefined) {
      var movie = that.data.userInfo.film_value.join(",")
    } else {
      var movie = e.detail.value.movie.join(",");
    }
    if (that.data.userInfo.books_value && e.detail.value.book[0] === undefined) {
      var book = that.data.userInfo.books_value.join(",")
    } else {
      var book = e.detail.value.book.join(",");
    }
    if (that.data.userInfo.pet_value && e.detail.value.pet === "") {
      var pet = that.data.userInfo.pet_value
    } else {
      var pet = e.detail.value.pet;
    }
    let mes = "";
    if (sport[0] === undefined) {
      mes = "喜欢的运动"
      wx.showModal({
        title: '信息不完整',
        content: `${mes}未填写，请补充`,
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {}
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
        success: function(res) {}
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
        success: function(res) {}
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
        success: function(res) {}
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
        success: function(res) {}
      })
      return
    }
    wx.request({
      url: app.globalData.base_url + 'wechat/save_hobby',
      data: {
        motion: sport,
        music: music,
        film: movie,
        books: book,
        pet:pet,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res)
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

  sportChange: function(e) {
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
          success: function(res) {}
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

  musicChange: function(e) {
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
          success: function(res) {}
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
  movieChange: function(e) {
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
          success: function(res) {}
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
  bookChange: function(e) {
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
          success: function(res) {}
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
  petChange: function(e) {
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


  chooseSport: function(e) {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  chooseMovie: function(e) {
    var that = this;
    that.setData({
      showViewMovie: (!that.data.showViewMovie)
    })
  },
  chooseBook: function(e) {
    var that = this;
    that.setData({
      showViewBook: (!that.data.showViewBook)
    })
  },
  chooseMusic: function(e) {
    var that = this;
    that.setData({
      showViewMusic: (!that.data.showViewMusic)
    })
  },
  choosePet: function(e) {
    var that = this;
    that.setData({
      showViewPet: (!that.data.showViewPet)
    })
  },

})