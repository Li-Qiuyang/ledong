// pages/videolearn/videolearn.js
var app = getApp()

function changeTwoDecimal(x) {
  var f_x = parseFloat(x);
  if (isNaN(f_x)) {
    alert('function:changeTwoDecimal->parameter error');
    return false;
  }
  f_x = Math.round(f_x * 100) / 100;

  return f_x;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdown: 3, //倒计时,
    isShow: true,
    num: 0,
    setInter: "",
    hour: 1,
    min: 1,
    sec: 1,
    showSec: "00",
    showMin: "00",
    showHour: "00"
  },
  screenchange: function (e) {
    console.log('123')
    app.globalData.gain = true;
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    var that = this;
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
        }, 1000)
        setTimeout(() => {
          clearInterval(that.timer)
          that.setData({
            isShow: false
          })
          that.data.videoContext.play()
        }, 1600)
      }
    }
    this.setData({
      url: options.url,
      name: options.name,
      type: options.type,
      videoId: options.videoId
    })
  },
  bindended: function (e) {
    let time = parseFloat(this.data.showHour) * 60 + parseFloat(this.data.showMin) + this.data.showSec / 60
    time=changeTwoDecimal(time)
    wx.request({
      url: 'http://8.146.199.110:3000/collect/ptinsert',
      method: 'post',
      data: {
        userId: app.globalData.id,
        videoId: this.data.videoId,
        time: time,
        date: new Date().toLocaleDateString(),
        videoType: this.data.type
      },
      success: res => {
        console.log(res)
      }
    })
  },
  // 开始计时
  start: function () {
    var that = this;
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
              console.log(endTime)

              console.log("结束计时")
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
  },
  // 停止计时
  stop: function () {
    var that = this;
    var endTime = new Date();
    console.log(endTime)

    clearInterval(that.data.setInter);
    that.setData({
      sec: this.data.sec,
      min: this.data.min,
      hour: this.data.hour,
      showSec: this.data.showSec,
      showMin: this.data.showMin,
      showHour: this.data.showHour
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      videoContext: wx.createVideoContext('Video')
    })
    console.log(this.data.videoContext)
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