// pages/skip/skip.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    target: [
      { id: 1, type: '个数' },
      { id: 2, type: '时长' },
      { id: 3, type: '自由' }
    ],
    id: 3,
    skipNum: 0,
    skipTime: '1:00',
    allNum: 0
  },
  video: function (e) {
    wx.navigateTo({
      url: `../video/video?type=${e.currentTarget.dataset.datavalue.lessontype}&name=${e.currentTarget.dataset.datavalue.lessonfilename}&courseName=${e.currentTarget.dataset.datavalue.lessonname}&index=${e.currentTarget.dataset.datavalue.index}&lessonid=${e.currentTarget.dataset.datavalue.lessonid}&introduction=${e.currentTarget.dataset.datavalue.introduction}`,
    })
  },
  btn: function () {
    wx.navigateTo({
      url: `../skipVideo/skipVideo?skipNum=${this.data.skipNum}&skipTime=${this.data.skipTime}`,
    })
  },
  chooseTarget: function (e) {
    this.setData({
      id: e.currentTarget.dataset.datavalue.id
    })
    if (this.data.id == 1) {
      this.setData({
        skipTime: '1:00'
      })
    } else if (this.data.id == 2) {
      this.setData({
        skipNum: 0
      })
    } else {
      this.setData({
        skipTime: '1:00',
        skipNum: 0
      })
    }
  },
  plus: function () {
    if (this.data.id == 1) {
      this.setData({
        skipNum: this.data.skipNum + 100
      })
    } else {
      var index = this.data.skipTime.indexOf(':')
      var time = Number(this.data.skipTime.slice(0, index)) + 1
      this.setData({
        skipTime: time + ':' + '00'
      })
    }
  },
  minus: function () {
    if (this.data.id == 1 && this.data.skipNum > 0) {
      this.setData({
        skipNum: this.data.skipNum - 100
      })
    } else if (this.data.id == 2 && this.data.skipTime != '1:00') {
      var index = this.data.skipTime.indexOf(':')
      var time = Number(this.data.skipTime.slice(0, index)) - 1
      this.setData({
        skipTime: time + ':' + '00'
      })
    }
  },
  left: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://8.146.199.110:3000/data/getdata?type=ropeskipping',
      method: 'get',
      success: res => {
        let arr = []
        let arr1 = []
        for (var i = 0; i < 10; i++) {
          if (i >= 7) {
            arr.push(res.data[i])
          }
          if (i <= 3 && i > 0) {
            arr1.push(res.data[i])
          }
        }
        this.setData({
          dataList: arr,
          action: arr1
        })
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/gram/getuserskip',
      method: 'post',
      data: {
        userId: app.globalData.id,
        date: new Date().toLocaleDateString()
      },
      success: res => {
        let num = 0
        res.data.map(item => {
          num = Number(item.skipNum) + Number(num)
        })
        this.setData({
          allNum: num
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
    if (app.globalData.skipNum != 0) {
      wx.request({
        url: 'http://8.146.199.110:3000/gram/getuserskip',
        method: 'post',
        data: {
          userId: app.globalData.id,
          date: new Date().toLocaleDateString()
        },
        success: res => {
          let num = 0
          res.data.map(item => {
            num = Number(item.skipNum) + Number(num)
          })
          this.setData({
            allNum: num
          })
          app.globalData.skipNum = 0
        }
      })
    }
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