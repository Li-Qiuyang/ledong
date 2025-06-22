var app = getApp();
var arr = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: 0
  },

  left(e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  detail: function (e) {
    var item = e.currentTarget.dataset.item
    var value = {
      data: item.content[0],
      imgs: item.content[0].imgs.split(','),
      user: item.user,
      likedata: item.likedata,
      forward: item.forward,
      like: item.like,
      comment: item.comment,
      forwardJudge: item.forwardJudge,
      likeJudge: item.likeJudge,
      concern: false
    }
    app.globalData.infor = []
    app.globalData.infor.push(value)
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://8.146.199.110:3000/users/updatemsg',
      method: 'post',
      data: {
        msgNum: 0,
        userid: app.globalData.id
      }
    })
    this.getAll()
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

  },
  getAll: function () {
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
      url: 'http://8.146.199.110:3000/users/userlogin',
      method: 'POST',
      data: {
        userid: app.globalData.id
      },
      success: res => {
        this.setData({
          user: res.data.user
        })
      }
    })
    arr = []
    wx.request({
      url: 'http://8.146.199.110:3000/users/getlike',
      method: 'POST',
      data: {
        userId: app.globalData.id
      },
      success: res => {
        res.data.map(item => {
          if (item.data.user2Id != app.globalData.id) {
            item.infor = '点赞了这条动态'
            item.imgs = item.content[0].imgs.split(",");
            arr.push(item)
          }
        })
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/users/getforward',
      method: 'POST',
      data: {
        userId: app.globalData.id
      },
      success: res => {
        res.data.map(item => {
          if (item.data.user2Id != app.globalData.id) {
            item.infor = '收藏了这条动态'
            item.imgs = item.content[0].imgs.split(",");
            item.user2 = item.user
            item.user = this.data.user
            arr.push(item)
          }
        })
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/users/getcomment',
      method: 'POST',
      data: {
        userId: app.globalData.id
      },
      success: res => {
        res.data.map(item => {
          if (item.data.user2Id != app.globalData.id) {
            item.infor = '评论了:' + item.data.discussContent
            item.imgs = item.content[0].imgs.split(",");
            arr.push(item)
          }
        })
        arr.map(item => {
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
          dataList: arr
        })
      }
    })
  }
})
