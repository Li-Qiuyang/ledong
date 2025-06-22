// pages/square/square.js
var app = getApp();
var arr = []
// let color = ['#CAE2FA', '#5E94E4']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList: [],
    rightList: [],
    point1: false,
    point2: true,
    content: '',
    value: [],
    subject: [{
      topic: '#我的减肥餐',
      color: 'rgb(250, 185, 176)'
    },
    {
      topic: '#记录汗水',
      color: 'rgb(94, 148, 228)'
    },
    {
      topic: '#如何暴瘦二十斤',
      color: 'rgb(206, 239, 219)'
    },
    {
      topic: '#如何调节情绪',
      color: 'rgb(189, 170, 233)'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPeople()
    if (this.data.point1) {
      this.getConcern()
    } else {
      this.getRecommend()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(11)
    this.getPeople()
    this.getRecommend()
    // this.getConcern()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: '',
      method: "GET",
      header: {
        'content-type': 'json'
      },
      success: res => {
        that.setData({
          list: res.data
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  discover() {
    this.setData({
      point1: true,
      point2: false,
      content: ''
    })
    this.getConcern()
  },
  recommend() {
    this.setData({
      point1: false,
      point2: true,
      content: ''
    })
    this.getRecommend()
  },
  add(e) {
    if (app.globalData.head == "") {
      wx.showToast({
        title: "请先登录",
        icon: "error",
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../publishMnuscript/publishManuscript',
      })
    }
  },
  topics: function (e) {
    wx.request({
      url: 'http://8.146.199.110:3000/users/user2forward',
      method: 'POST',
      data: {
        user2Id: app.globalData.id
      },
      success: res => {
        this.setData({
          forward: res.data
        })
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/users/getallcontent',
      method: 'GET',
      success: res => {
        let recommend = res.data
        console.log(recommend)
        recommend.map(item => {
          item.imgs = item.data.imgs.split(',')
          for (let i = 0; i < this.data.concern.length; i++) {
            if (this.data.concern[i].data.userId == item.data.userId) {
              item.concern = true
            } else {
              item.concern = false
            }
          }
          for (let i = 0; i < item.likedata.length; i++) {
            if (item.likedata[i].user2Id == app.globalData.id) {
              item.likeJudge = true
            }
          }
          for (let i = 0; i < this.data.forward.length; i++) {
            if (item.data.userId == this.data.forward[i].data.userId && item.data.postId == this.data.forward[i].data.postId) {
              item.forwardJudge = true
            }
          }
        })
        var t = 0;
        for (let i = 0; i < recommend.length; i++) {
          for (let j = 0; j < recommend.length; j++) {
            if (Date.parse(new Date(recommend[i].data.time)) > Date.parse(new Date(recommend[j].data.time))) {
              t = recommend[i]
              recommend[i] = recommend[j]
              recommend[j] = t
            }
          }
        }
        for (let i = 0; i < recommend.length; i++) {
          if (recommend[i].data.userId == app.globalData.id) {
            recommend[i].data.ismine = true
          } else {
            recommend[i].data.ismine = false
          }
        }
        let topic = e.currentTarget.dataset.topic.topic
        let arr = []
        recommend.map(item => {
          if (item.data.content.indexOf(topic) != -1) {
            arr.push(item)
          }
        })
        this.setData({
          value: arr
        })
      }
    })
  },
  searchtext(e) {
    this.setData({
      content: e.detail.value
    })
    if (e.detail.value == "" && this.data.point1) {
      this.getConcern()
    } else if (e.detail.value == "" && !this.data.point1) {
      this.getRecommend()
    }
  },
  search(e) {
    if (this.data.point1) {
      if (this.data.content.length != 0) {
        let arr = []
        this.data.list.map(item => {
          if (item.data.title.indexOf(this.data.content) != -1) {
            arr.push(item)
          }
        })
        this.setData({
          list: arr
        })
      } else {
        this.getConcern()
      }
    } else {
      if (this.data.content.length != 0) {
        let arr = []
        this.data.value.map(item => {
          if (item.data.content.indexOf(this.data.content) != -1) {
            arr.push(item)
          }
        })
        this.setData({
          value: arr
        })
      } else {
        this.getRecommend()
      }
    }
  },
  like: function (e) { //点赞
    if (e.currentTarget.dataset.item.likeJudge) {
      let arr = []
      e.currentTarget.dataset.item.likedata.map(item => {
        if (item.user2Id == app.globalData.id) {
          arr.push(item)
        }
      })
      var value = {
        userId: arr[0].userId,
        postId: arr[0].postId,
        user2Id: app.globalData.id,
      }
      wx.request({
        url: 'http://8.146.199.110:3000/users/dislike',
        method: 'POST',
        data: value,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          this.getRecommend()
        }
      })
    } else {
      var value = {
        userId: e.currentTarget.dataset.item.data.userId,
        postId: e.currentTarget.dataset.item.data.postId,
        user2Id: app.globalData.id,
        time: new Date().toISOString().substring(0, 10)
      }
      wx.request({
        url: 'http://8.146.199.110:3000/users/like',
        method: 'POST',
        data: value,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          this.getRecommend()
        }
      })
      if (e.currentTarget.dataset.item.data.userId != app.globalData.id) {
        wx.request({
          url: 'http://8.146.199.110:3000/users/updatemsg',
          method: 'POST',
          data: {
            msgNum: Number(e.currentTarget.dataset.item.user[0].msgNum) + Number(1),
            userid: e.currentTarget.dataset.item.user[0].userid
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: res => {
            console.log(res.data)
          }
        })
      }
    }
  },
  concern: function (e) {
    if (app.globalData.id != e.currentTarget.dataset.item.data.userId) {
      if (e.currentTarget.dataset.item.concern) {
        wx.request({
          url: 'http://8.146.199.110:3000/users/unconcern',
          method: 'POST',
          data: {
            userId: e.currentTarget.dataset.item.data.userId,
            fansId: app.globalData.id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: res => {
            let arr = this.data.value
            arr.map(item => {
              if (item.data.userId == e.currentTarget.dataset.item.data.userId) {
                item.concern = !item.concern
              }
            })
            this.setData({
              value: arr
            })
          }
        })
      } else {
        wx.request({
          url: 'http://8.146.199.110:3000/users/concern',
          method: 'POST',
          data: {
            userId: e.currentTarget.dataset.item.data.userId,
            fansId: app.globalData.id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: res => {
            let arr = this.data.value
            arr.map(item => {
              if (item.data.userId == e.currentTarget.dataset.item.data.userId) {
                item.concern = !item.concern
              }
            })
            this.setData({
              value: arr
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: "不可以关注自己",
        icon: "error",
        duration: 2000
      })
    }
  },
  remark: function (e) {
    app.globalData.infor = []
    app.globalData.infor.push(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  getConcern: function () {
    wx.request({
      url: 'http://8.146.199.110:3000/users/getconcern',
      method: 'POST',
      data: {
        fansId: app.globalData.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        // this.getRecommend()
        let arr = []
        if (arr.length == 0) {
          res.data.map(item => {
            for (let i = 0; i < this.data.value.length; i++) {
              if (item.data.userId == this.data.value[i].data.userId) {
                arr.push(this.data.value[i])
              }
            }
          })
          var t = 0;
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (Date.parse(new Date(arr[i].data.time)) > Date.parse(new Date(arr[j].data.time))) {
                t = arr[i]
                arr[i] = arr[j]
                arr[j] = t
              }
            }
          }
          this.setData({
            list: arr
          })
        }
      }
    })
  },
  getRecommend: function () {
    wx.request({
      url: 'http://8.146.199.110:3000/users/user2forward',
      method: 'POST',
      data: {
        user2Id: app.globalData.id
      },
      success: res => {
        this.setData({
          forward: res.data
        })
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/users/getallcontent',
      method: 'GET',
      success: res => {
        let recommend = res.data
        recommend.map(item => {
          item.imgs = item.data.imgs.split(',')
          for (let i = 0; i < this.data.concern.length; i++) {
            if (this.data.concern[i].data.userId == item.data.userId) {
              item.concern = true
            } else {
              item.concern = false
            }
          }
          for (let i = 0; i < item.likedata.length; i++) {
            if (item.likedata[i].user2Id == app.globalData.id) {
              item.likeJudge = true
            }
          }
          for (let i = 0; i < this.data.forward.length; i++) {
            if (item.data.userId == this.data.forward[i].data.userId && item.data.postId == this.data.forward[i].data.postId) {
              item.forwardJudge = true
            }
          }
        })
        var t = 0;
        for (let i = 0; i < recommend.length; i++) {
          if (recommend[i].data.userId == app.globalData.id) {
            recommend[i].data.ismine = true
          } else {
            recommend[i].data.ismine = false
          }
          for (let j = 0; j < recommend.length; j++) {
            if (Date.parse(new Date(recommend[i].data.time)) > Date.parse(new Date(recommend[j].data.time))) {
              t = recommend[i]
              recommend[i] = recommend[j]
              recommend[j] = t
            }
          }
        }
        this.setData({
          value: recommend
        })
        this.getConcern()
      }
    })

  },
  delete(e) {
    wx.request({
      url: 'http://8.146.199.110:3000/users/delcontent',
      method: 'POST',
      data: {
        userId: e.currentTarget.dataset.item.data.userId,
        postId: e.currentTarget.dataset.item.data.postId
      },
      success: res => {
        wx.request({
          url: 'http://8.146.199.110:3000/users/userdel',
          method: 'POST',
          data: {
            userId: e.currentTarget.dataset.item.data.userId,
            postId: e.currentTarget.dataset.item.data.postId
          },
          success: res => {
            console.log(res.data)
          }
        })
        wx.request({
          url: 'http://8.146.199.110:3000/users/dellike',
          method: 'POST',
          data: {
            userId: e.currentTarget.dataset.item.data.userId,
            postId: e.currentTarget.dataset.item.data.postId
          },
          success: res => {
            console.log(res.data)
          }
        })
        wx.request({
          url: 'http://8.146.199.110:3000/users/delforward',
          method: 'POST',
          data: {
            userId: e.currentTarget.dataset.item.data.userId,
            postId: e.currentTarget.dataset.item.data.postId
          },
          success: res => {
            console.log(res.data)
          }
        })
        this.onLoad()
      }

    })
  },
  getPeople: function () {
    wx.request({
      url: 'http://8.146.199.110:3000/users/getconcern',
      method: 'POST',
      data: {
        fansId: app.globalData.id
      },
      success: res => {
        this.setData({
          concern: res.data
        })
      }
    })
  },
  other: function (e) {
    var item = e.currentTarget.dataset.item.user[0]
    wx.navigateTo({
      url: '../homepage/homepage?head=' + item.avatar + '&name=' + item.username + '&signature=' + item.signature + '&id=' + item.userid + '&tag=' + item.tag,
    })
  },
  //收藏个人动态
  forward: function (e) {
    let infor = e.currentTarget.dataset.item
    if (infor.forwardJudge) {
      wx.request({
        url: 'http://8.146.199.110:3000/users/unforward',
        method: 'POST',
        data: {
          userId: infor.data.userId,
          postId: infor.data.postId,
          user2Id: app.globalData.id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          let arr = this.data.value
          arr.map(item => {
            if (infor.data.postId == item.data.postId) {
              item.forward = item.forward - 1
              item.forwardJudge = false
            }
          })
          this.setData({
            value: arr
          })
        }
      })
    } else {
      wx.request({
        url: 'http://8.146.199.110:3000/users/forward',
        method: 'POST',
        data: {
          userId: infor.data.userId,
          postId: infor.data.postId,
          user2Id: app.globalData.id,
          time: new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0, 8),
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          if (e.currentTarget.dataset.item.data.userId != app.globalData.id) {
            wx.request({
              url: 'http://8.146.199.110:3000/users/updatemsg',
              method: 'POST',
              data: {
                msgNum: Number(e.currentTarget.dataset.item.user[0].msgNum) + Number(1),
                userid: e.currentTarget.dataset.item.user[0].userid
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: res => {
                console.log(res.data)
              }
            })
          }
          let arr = this.data.value
          arr.map(item => {
            if (infor.data.postId == item.data.postId) {
              item.forward = item.forward + 1
              item.forwardJudge = true
            }
          })
          this.setData({
            value: arr
          })
        }
      })
    }
  },
})