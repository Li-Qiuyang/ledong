// pages/homepage/homepage.js
var app = getApp();
var user = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currindex: 1,
    title: [
      { id: 1, word: "动态" },
      { id: 2, word: "相册" },
      { id: 3, word: "收藏" }
    ],
    label: [
      { id: 1, tag: "健身达人", color: '#FFC0CB' },
      { id: 2, tag: "健康", color: '#6495ED' },
      { id: 3, tag: "减肥", color: '#AFEEEE' },
      { id: 4, tag: "吃饱才有力气减肥", color: '#7FFFAA' },
      { id: 5, tag: "夜跑", color: '#F0E68C' },
      { id: 6, tag: "篮球", color: '#FF8C00' },
      { id: 7, tag: "跳绳", color: '#F08080' },
      { id: 8, tag: "瑜伽", color: '#5E94E4' }
    ],
    likeNum: 0,
    haveTag: []
  },

  // 动态的切换
  by_choose: function (e) {
    let infor = e.currentTarget.dataset.item
    let arr = this.data.content
    console.log(e)
    arr.map(item => {
      if (infor.data.postId == item.data.postId) {
        item.by_choose = !item.by_choose
        this.setData({
          content: arr
        })
      }
    })
  },
  concern: function (e) {
      if (this.data.isConcern) {
        wx.request({
          url: 'http://8.146.199.110:3000/users/unconcern',
          method: 'POST',
          data: {
            userId: this.data.id,
            fansId: app.globalData.id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: res => {
            this.setData({
              isConcern:!this.data.isConcern
            })
          }
        })
      } else {
        wx.request({
          url: 'http://8.146.199.110:3000/users/concern',
          method: 'POST',
          data: {
            userId: this.data.id,
            fansId: app.globalData.id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: res => {
            this.setData({
              isConcern:!this.data.isConcern
            })
          }
        })
      }
  },
  hideChoose: function (e) {
    let infor = e.currentTarget.dataset.item
    let arr = this.data.content
    arr.map(item => {
      if (infor.data.postId == item.data.postId) {
        item.by_choose = !item.by_choose
      }
    })
    this.setData({
      content: arr
    })
  },

  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  // 标签
  delTag: function (e) {  //删除标签
    let tag = this.data.haveTag
    tag = tag.filter(function (item) {
      return item !== e.currentTarget.dataset.label
    });
    wx.request({
      url: 'http://8.146.199.110:3000/users/updatetag',
      method: 'POST',
      data: {
        userid: app.globalData.id,
        tag: tag
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res.data)
      }
    })
    this.setData({
      showModalStatus: false,
      haveTag: tag
    })
  },
  tag: function (e) {  //更新标签
    let exist = false
    this.data.haveTag.map(item => {
      if (item == e.currentTarget.dataset.label.tag) {
        exist = true
        wx.showToast({
          title: "标签已存在",
          icon: "error",
          duration: 2000
        })
        this.setData({
          showModalStatus: false
        })
      }
    })
    if (!exist) {
      let tag = this.data.haveTag
      tag.push(e.currentTarget.dataset.label.tag)
      wx.request({
        url: 'http://8.146.199.110:3000/users/updatetag',
        method: 'POST',
        data: {
          userid: app.globalData.id,
          tag: tag
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          console.log(res.data)
        }
      })
      this.setData({
        showModalStatus: false,
        haveTag: tag
      })
    }
  },

  // 跳转页面
  concerns: function () {
    wx.navigateTo({
      url: '../myFriend/myFriend?fan=' + 'no' + '&id=' + app.globalData.homeId,
    })
  },
  fan: function () {
    wx.navigateTo({
      url: '../myFriend/myFriend?fan=' + 'yes' + '&id=' + app.globalData.homeId,
    })
  },

  //动态点赞&&取消点赞
  like: function (e) {
    if (e.currentTarget.dataset.item.likeJudge) {
      let arr = []
      e.currentTarget.dataset.item.likedata.map(item => {
        if (item.user2Id == app.globalData.homeId) {
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
          this.getContent()
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
          this.getContent()
        }
      })
    }
  },

  // 跳转到详情页面
  remark: function (e) {
    app.globalData.infor = []
    app.globalData.infor.push(e.currentTarget.dataset.item)
    console.log(app.globalData.infor)
    wx.navigateTo({
      url: '../comment/comment',
    })
  },

  // 删除个人动态
  delete: function (e) {
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
        this.getContent()
      }
    })
  },

  // 跳转到修改页面
  edit: function (e) {
    app.globalData.dynamic = []
    app.globalData.dynamic.push(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../publishMnuscript/publishManuscript',
    })
  },

  // 获取个人动态
  getContent: function () {
    wx.request({
      url: 'http://8.146.199.110:3000/users/getcontent',
      method: 'POST',
      data: {
        userId: app.globalData.homeId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        let arr = res.data
        wx.request({
          url: 'http://8.146.199.110:3000/users/user2forward',
          method: 'POST',
          data: {
            user2Id: app.globalData.id
          },
          success: res => {
            let like = 0
            arr.map(item => {
              item.imgs = item.data.imgs.split(',')
              item.by_choose = false
              like = like + item.like
              for (let i = 0; i < item.likedata.length; i++) {
                if (item.likedata[i].user2Id == app.globalData.id) {
                  item.likeJudge = true
                }
              }
              for (let i = 0; i < res.data.length; i++) {
                if (item.data.userId == res.data[i].data.userId && item.data.postId == res.data[i].data.postId) {
                  item.forwardJudge = true
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
              content: arr,
              likeNum: like
            })
          }
        })
      }
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
        console.log(res.data)
        let list=res.data
        for(let i=0;i<list.length;i++){
          if(list[i].concern[0].userid==this.data.id){
            this.setData({
              isConcern:true
            })
          }else{
            this.setData({
              isConcern:false
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getForward()
    this.getConcern()
    // console.log(options)
    if (options.head) {
      var have = []
      if (options.tag != 'undefined' && options.tag) {
        have = options.tag.split(',')
        if (have[0] == 'null') {
          have = []
        }
      }
      this.setData({
        head: options.head,
        name: options.name,
        signature: options.signature || '你还没有个性签名哦',
        id: options.id,
        currentId: app.globalData.id,
        haveTag: have
      })
      app.globalData.homeId = options.id
      this.getAll()
      this.getContent()
    } else {
      wx.request({
        url: 'http://8.146.199.110:3000/users/userlogin',
        method: 'POST',
        data: {
          userid: app.globalData.id
        },
        success: res => {
          let user = res.data.user[0]
          var have = []
          if (user.tag != 'undefined' && user.tag) {
            have = user.tag.split(',')
            if (have[0] == 'null') {
              have = []
            }
          }
          this.setData({
            head: user.avatar,
            name: user.username,
            signature: user.signature || '你还没有个性签名哦',
            id: app.globalData.id,
            currentId: app.globalData.id,
            haveTag: have
          })
          app.globalData.homeId = app.globalData.id
          this.getAll()
          this.getContent()
        }
      })
    }
  },

  // 获取到点赞、关注、粉丝
  getAll: function () {
    var that = this
    wx.request({
      url: 'http://8.146.199.110:3000/users/getfans',
      method: 'POST',
      data: {
        userId: app.globalData.homeId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        that.setData({
          fans: res.data.length
        })
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/users/getconcern',
      method: 'POST',
      data: {
        fansId: app.globalData.homeId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        that.setData({
          concern: res.data.length
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
    this.getForward()
    this.getAll()
    this.getContent()
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

  },

  // 返回
  left: function (e) {
    app.globalData.homeId = ''
    wx.navigateBack({
      delta: 1,
    })
  },

  // 选择动态、相册和收藏
  type(e) {
    this.setData({
      currindex: e.currentTarget.dataset.list.id
    })
    if (e.currentTarget.dataset.list.id == 3) {
      this.getForward()
    }
  },

  preview(e) {
    let list = this.data.content;
    let imgList = [];
    let index = 0;
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].imgs.length; j++) {
        imgList[index] = list[i].imgs[j];
        index = index + 1;
      }
    }
    let currentUrl = e.currentTarget.dataset.src;
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  preview1(e) {
    let currentUrl = e.currentTarget.dataset.src;
    let urls = [];
    urls.push(currentUrl)
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: urls  // 需要预览的图片http链接列表
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
          let arr = this.data.content
          arr.map(item => {
            if (infor.data.postId == item.data.postId) {
              item.forward = item.forward - 1
              item.forwardJudge = false
            }
          })
          this.setData({
            content: arr
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
          let arr = this.data.content
          arr.map(item => {
            if (infor.data.postId == item.data.postId) {
              item.forward = item.forward + 1
              item.forwardJudge = true
            }
          })
          this.setData({
            content: arr
          })
        }
      })
    }
  },

  // 获取收藏动态
  getForward: function (e) {
    wx.request({
      url: 'http://8.146.199.110:3000/users/user2forward',
      method: 'POST',
      data: {
        user2Id: app.globalData.homeId
      },
      success: res => {
        let arr = res.data
        arr.map(item => {
          item.forwardJudge = true
          item.imgs = item.content[0].imgs.split(',')
          for (let i = 0; i < item.likedate.length; i++) {
            if (item.likedate[i].user2Id == app.globalData.id) {
              item.likeJudge = true
            }
          }
          item.data = item.content[0]
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
          collect: arr
        })
        console.log(this.data.collect)
      }
    })
  },
  col_like: function (e) {  //点赞
    if (e.currentTarget.dataset.item.likeJudge) {
      wx.request({
        url: 'http://8.146.199.110:3000/users/dislike',
        method: 'POST',
        data: {
          userId: e.currentTarget.dataset.item.data.userId,
          postId: e.currentTarget.dataset.item.data.postId,
          user2Id: app.globalData.id,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          if (e.currentTarget.dataset.item.data.userId == app.globalData.id) {
            this.setData({
              likeNum: this.data.likeNum - 1
            })
          }
          this.getForward()
        }
      })
    } else {
      wx.request({
        url: 'http://8.146.199.110:3000/users/like',
        method: 'POST',
        data: {
          userId: e.currentTarget.dataset.item.data.userId,
          postId: e.currentTarget.dataset.item.data.postId,
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
          if (e.currentTarget.dataset.item.data.userId == app.globalData.id) {
            this.setData({
              likeNum: this.data.likeNum + 1
            })
          }
          this.getForward()
        }
      })
    }
  },
  col_forward: function (e) { //取消收藏
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
          let arr = this.data.collect
          let index
          arr.map((item, index) => {
            if (item.data.postId == infor.data.postId) {
              index = index
            }
          })
          arr.splice(index, 1)
          this.setData({
            collect: arr
          })
        }
      })
    }
  },
})