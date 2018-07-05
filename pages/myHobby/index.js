// pages/myHobby/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    showViewMusic: true,
    showViewMovie: true,
    showViewBook: true,
    showViewPet: true,
    sportList: [
      { name: '篮球', value: '0', checked: false, },
      { name: '足球', value: '1', checked: false, },
      { name: '乒乓球', value: '2', checked: false, },
      { name: '游泳', value: '3', checked: false, },
      { name: '跑步', value: '4', checked: false, },
      { name: '单车', value: '5', checked: false, },
      { name: '瑜伽', value: '6', checked: false, },
      { name: '羽毛球', value: '7', checked: false, },
      { name: '网球', value: '8', checked: false, },
      { name: '爬山', value: '9', checked: false, },
      { name: '滑板', value: '10', checked: false, },
      { name: '台球', value: '11', checked: false, },
      { name: '滑雪', value: '12', checked: false, },
      { name: '健身', value: '13', checked: false, },
      { name: '攀岩', value: '14', checked: false, },
      { name: '不喜欢', value: '15', checked: false, },
    ],
    sportArr: '',
    sportChoose: true,
    musicList: [
      { name: '流行', value: '0', checked: false, },
      { name: '乡村', value: '1', checked: false, },
      { name: '摇滚', value: '2', checked: false, },
      { name: '民谣', value: '3', checked: false, },
      { name: '轻音乐', value: '4', checked: false, },
      { name: '说唱', value: '5', checked: false, },
      { name: '爵士', value: '6', checked: false, },
      { name: '古典', value: '7', checked: false, },
      { name: '民族', value: '8', checked: false, },
      { name: '电子', value: '9', checked: false, },
      { name: '金属', value: '10', checked: false, },
      { name: '朋克', value: '11', checked: false, },
      { name: '古风', value: '12', checked: false, },
      { name: '嘻哈', value: '13', checked: false, },
      { name: '都行', value: '14', checked: false, },
      { name: '不喜欢', value: '15', checked: false, },
    ],
    musicArr: '',
    musicChoose: true,
    movieList: [
      { name: '科幻', value: '0', checked: false, },
      { name: '喜剧', value: '1', checked: false, },
      { name: '动作', value: '2', checked: false, },
      { name: '悬疑', value: '3', checked: false, },
      { name: '爱情', value: '4', checked: false, },
      { name: '文艺', value: '5', checked: false, },
      { name: '战争', value: '6', checked: false, },
      { name: '记录', value: '7', checked: false, },
      { name: '魔幻', value: '8', checked: false, },
      { name: '犯罪', value: '9', checked: false, },
      { name: '惊悚', value: '10', checked: false, },
      { name: '不喜欢', value: '11', checked: false, },
    ],
    movieArr: '',
    movieChoose: true,
    bookList: [
      { name: '美食', value: '0', checked: false, },
      { name: '艺术', value: '1', checked: false, },
      { name: '诗歌', value: '2', checked: false, },
      { name: '散文', value: '3', checked: false, },
      { name: '童话', value: '4', checked: false, },
      { name: '漫画', value: '5', checked: false, },
      { name: '武侠', value: '6', checked: false, },
      { name: '哲学', value: '7', checked: false, },
      { name: '传记', value: '8', checked: false, },
      { name: '历史', value: '9', checked: false, },
      { name: '国学', value: '10', checked: false, },
      { name: '言情', value: '11', checked: false, },
      { name: '名著', value: '12', checked: false, },
      { name: '玄幻', value: '13', checked: false, },
      { name: '推理', value: '14', checked: false, },
      { name: '不喜欢', value: '15', checked: false, },
    ],
    bookArr: '',
    bookChoose: true,
    petList: [
      { name: '猫', value: '0', checked: false, },
      { name: '狗', value: '1', checked: false, },
      { name: '乌龟', value: '2', checked: false, },
      { name: '鱼', value: '3', checked: false, },
      { name: '不喜欢', value: '4', checked: false, },
      { name: '想养但没', value: '5', checked: false, },
    ],
    petArr: '',
    petChoose: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    showView: (options.showView == "true" ? true : false);
    showViewMusic: (options.showViewMusic == "true" ? true : false);
    showViewMovie: (options.showViewMovie == "true" ? true : false);
    showViewBook: (options.showViewBook == "true" ? true : false);
    showViewPet: (options.showViewPet == "true" ? true : false);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  hobbyHandle: function (e) {
    console.log(e)
    let sport = e.detail.value.sport;
    console.log(sport[0])
    let music = e.detail.value.music;
    let movie = e.detail.value.movie;
    let book = e.detail.value.book;
    let pet = e.detail.value.pet;
    let mes = "";
    if (sport[0] === undefined) {
      mes = "喜欢的运动"
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
    if (music[0] === undefined) {
      mes = "喜欢的音乐"
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
    if (movie[0] === undefined) {
      mes = "喜欢的电影"
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
    if (book[0] === undefined) {
      mes = "喜欢的书籍"
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

    if (pet === "") {
      mes = "喜欢的宠物"
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
          success: function (res) {
          }
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
          success: function (res) {
          }
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
          success: function (res) {
          }
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
          success: function (res) {
          }
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
    console.log(e)
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

})