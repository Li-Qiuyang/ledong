// pages/comment/comment.js
const app = getApp()
var allComment = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowInput: false, //控制输入栏
  },
  preview(e) {
    let currentUrl = e.currentTarget.dataset.src;
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.value[0].imgs // 需要预览的图片http链接列表
    })
  },
  ShowInput: function () {
    this.setData({
      isShowInput: !this.data.isShowInput
    })
  },
  input(e) {
    this.setData({
      discussContent: e.detail.value
    })
  },
  left: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  comment: function (e) {
    this.setData({
      discussContent: e.detail.value
    })
  },
  other: function (e) {
    var item = e.currentTarget.dataset.item.user[0]
    wx.navigateTo({
      url: '../homepage/homepage?head=' + item.avatar + '&name=' + item.username + '&signature=' + item.signature + '&id=' + item.userid + '&tag=' + item.tag,
    })
  },
  submit: function () {
    var that = this
    that.setData({
      isShowInput: false,
      isTransfer: false
    })
    var infor = app.globalData.infor[0]
    wx.request({
      url: 'http://8.146.199.110:3000/users/comment',
      method: 'POST',
      data: {
        userId: infor.data.userId,
        postId: infor.data.postId,
        user2Id: app.globalData.id,
        discussContent: this.data.discussContent,
        time: new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0, 8)
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(infor)
        if (infor.user[0].userid != app.globalData.id) {
          wx.request({
            url: 'http://8.146.199.110:3000/users/updatemsg',
            method: 'POST',
            data: {
              msgNum: Number(infor.user[0].msgNum) + Number(1),
              userid: infor.user[0].userid
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
          item.comment = item.comment + 1
        })
        this.setData({
          value: arr
        })
        this.getComment()
      }
    })
  },
  del_com: function (e) {
    wx.request({
      url: 'http://8.146.199.110:3000/users/delcomment',
      method: 'POST',
      data: {
        userId: e.currentTarget.dataset.item.data.userId,
        postId: app.globalData.infor[0].data.postId,
        user2Id: e.currentTarget.dataset.item.data.user2Id,
        commentid: e.currentTarget.dataset.item.data.commentid
      },
      success: res => {
        let arr = this.data.value
        arr.map(item => {
          item.comment = item.comment - 1
        })
        this.setData({
          value: arr
        })
        this.getComment()
      }
    })
  },
  getComment: function () {
    wx.request({
      url: 'http://8.146.199.110:3000/users/postcomment',
      method: 'POST',
      data: {
        postId: app.globalData.infor[0].data.postId
      },
      success: res => {
        res.data.map(item => {
          console.log(item)
          if (item.data.user2Id == app.globalData.id) {
            item.delJudge = true
          } else {
            item.delJudge = false
          }
        })
        var t = 0;
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (Date.parse(new Date(res.data[i].data.time)) > Date.parse(new Date(res.data[j].data.time))) {
              t = res.data[i]
              res.data[i] = res.data[j]
              res.data[j] = t
            }
          }
        }
        this.setData({
          comment: res.data
        })
      }
    })
  },
  like: function (e) {  //点赞
    let infor = app.globalData.infor[0]
    if (infor.likeJudge) {
      wx.request({
        url: 'http://8.146.199.110:3000/users/dislike',
        method: 'POST',
        data: {
          userId: infor.data.userId,
          postId: infor.data.postId,
          user2Id: app.globalData.id,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          let arr = this.data.value
          arr.map(item => {
            item.like = item.like - 1
            item.likeJudge = false
          })
          this.setData({
            value: arr
          })
        }
      })
    } else {
      wx.request({
        url: 'http://8.146.199.110:3000/users/like',
        method: 'POST',
        data: {
          userId: infor.data.userId,
          postId: infor.data.postId,
          user2Id: app.globalData.id,
          time: new Date().toISOString().substring(0, 10)
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
            item.like = item.like + 1
            item.likeJudge = true
          })
          this.setData({
            value: arr
          })
        }
      })
    }
  },
  concern: function (e) {  //关注
    let infor = app.globalData.infor[0]
    if (app.globalData.id != infor.data.userId) {
      if (infor.concern) {
        wx.request({
          url: 'http://8.146.199.110:3000/users/unconcern',
          method: 'POST',
          data: {
            userId: infor.data.userId,
            fansId: app.globalData.id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: res => {
            let arr = this.data.value
            arr.map(item => {
              item.concern = false
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
            userId: infor.data.userId,
            fansId: app.globalData.id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: res => {
            let arr = this.data.value
            arr.map(item => {
              item.concern = true
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
  //转发个人动态
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
            item.forward = item.forward - 1
            item.forwardJudge = false
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
            item.forward = item.forward + 1
            item.forwardJudge = true
          })
          this.setData({
            value: arr
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let recommend = app.globalData.infor
    for (let i = 0; i < recommend.length; i++) {
      if (recommend[i].user[0].userid == app.globalData.id) {
        recommend[i].data.ismine = true
      } else {
        recommend[i].data.ismine = false
      }
    }
    this.setData({
      value: recommend
    })
    this.getComment()
  },
  delete(e) {
    console.log(e.currentTarget.dataset.item.data)
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
        wx.navigateBack({
          delta: 1,
        })
      }

    })
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

  }
})