// pages/skipVideo/skipVideo.js
let time = 0
let skipNum = 0
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdown: 3, //倒计时,
    isShow: true,
    num: 0,
    skipNum: 0,
    setInter: "",
    hour: 1,
    min: 1,
    sec: 1,
    showSec: "00",
    showMin: "00",
    showHour: "00",
    allTime: '',
    allNum: '',
    isSkip: true,
    // isPause:false,
    url: '../../icon/skip.gif'
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
    var that = this;
    if (options.skipNum != 0) {
      that.setData({
        allNum: options.skipNum
      })
    } else if (options.skipTime != '1:00') {
      that.setData({
        allTime: options.skipTime
      })
    } else {
      that.setData({
        allNum: '∞'
      })
    }
    that.timer = setInterval(reduce, 1000)
    function reduce() {
      that.setData({
        countdown: that.data.countdown - 1
      })
      if (that.data.countdown == 1) {
        setTimeout(() => {
          that.setData({
            countdown: 'go'
          })
          that.start()  //调用开始
        }, 1000)
        setTimeout(() => {
          clearInterval(that.timer)
          that.setData({
            isShow: false,
          })
        }, 1600)

      }
    }
  },

  // 开始计时
  start: function () {
    var that = this;
    that.setData({
      isShow: false,
      isSkip: true,
      // isPause:false,
      url: '../../icon/skip.gif'
    })
    that.skip = setInterval(startSkip, 500)  //跳绳的步数
    function startSkip() {
      that.setData({
        skipNum: that.data.skipNum + 1
      })
      if (that.data.allNum) {
        if (that.data.skipNum == that.data.allNum) {
          that.pause()
          that.modal()
        }
      }
    }
    // 获取开始时间
    var beginTime = new Date();
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        if (that.data.sec != 60) {
          if (that.data.sec <= 9) {
            let showSec = "0" + that.data.sec
            that.setData({
              showSec: showSec,
              sec: that.data.sec + 1,
            })
          } else {
            that.setData({
              showSec: that.data.sec,
              sec: that.data.sec + 1,
            })
          }
        } else {
          if (that.data.min != 60) {
            // 60s 进 1min
            if (that.data.min <= 9) {
              let showMin = "0" + that.data.min
              that.setData({
                sec: 0,
                showSec: "00",
                showMin: showMin,
                min: that.data.min + 1,
              })
            } else {
              that.setData({
                sec: 0,
                showSec: "00",
                showMin: that.data.min,
                min: that.data.min + 1,
              })
            }
          } else {
            // 60min 进 1hour
            if (that.data.hour != 24) {
              if (that.data.hour <= 9) {
                let showHour = "0" + that.data.hour
                that.setData({
                  min: 0,
                  showMin: "00",
                  showHour: showHour,
                  hour: that.data.hour + 1,
                });
              } else {
                that.setData({
                  min: 0,
                  showMin: "00",
                  showHour: that.data.hour,
                  hour: that.data.hour + 1,
                });
              }
            } else {
              //24小时
              var endTime = util.formatTime(new Date());
              //清除计时器  即清除setInter
              clearInterval(that.data.setInter);
              that.setData({
                showModal: false,
                showStop: false,
                sec: 1,
                min: 1,
                hour: 1,
                showSec: "00",
                showMin: "00",
                showHour: "00"
              })
            }
          }
        }
      }, 1000);
    if (that.data.allTime) {
      if (that.data.skipNum == that.data.allNum) {
        that.pause()
      }
    }
  },
  // 停止计时
  pause: function () {
    // 停止一切
    var that = this;
    var endTime = new Date();
    clearInterval(that.data.setInter);
    clearInterval(that.skip)
    that.setData({
      sec: this.data.sec,
      min: this.data.min,
      hour: this.data.hour,
      showSec: this.data.showSec,
      showMin: this.data.showMin,
      showHour: this.data.showHour,
      url: '../../icon/skip.jpg',
      isShow: true,
      isSkip: false,
      countdown: ''
    })
  },
  finish: function () {
    app.globalData.skipNum = this.data.skipNum
    let time = Number(this.data.showHour * 60) + Number(this.data.showMin) + '.' + Number(this.data.showSec)
    wx.request({
      url: 'http://8.146.199.110:3000/collect/ptinsert',
      method: 'post',
      data: {
        userId: app.globalData.id,
        videoId: 'skip',
        time: time,
        date: new Date().toLocaleDateString(),
        videoType: 'ropeskipping'
      },
      success: res => {
        console.log(res)
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/gram/uploadskip',
      method: 'post',
      data: {
        userId: app.globalData.id,
        skipNum: this.data.skipNum,
        date: new Date().toLocaleDateString()
      },
      success: res => {
        console.log(res.data)
      }
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  // 弹框
  modal: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '此次练习已完成，是否退出训练？',
      success: function (res) {
        if (res.confirm) {
          that.finish()
        } else if (res.cancel) {
          that.start()
        }
      }
    })
  },

  // 完成--弹框
  modalFinish: function () {
    var that = this;
    that.pause()
    wx.showModal({
      title: '提示',
      content: '是否退出训练？',
      success: function (res) {
        if (res.confirm) {
          that.finish()
        } else if (res.cancel) {
          that.start()
        }
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