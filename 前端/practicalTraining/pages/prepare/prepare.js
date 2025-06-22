// pages/prepare/prepare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdown: 3 //倒计时
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    var prepare = options.prepare;
    if (prepare) {
      that.timer = setInterval(reduce, 1000)
      function reduce() {
        that.setData({
          countdown: that.data.countdown - 1
        })
        if (that.data.countdown == 1) {
          clearInterval(that.timer)
          wx.navigateTo({
            url: '../run/run?prepare=' + prepare,
          })
        }
      }
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
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    innerAudioContext.src = "https://s19.aconvert.com/convert/p3r68-cdx67/72v6o-qhv8q.mp3"  //音频路径
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    });
    innerAudioContext.onError(res => {
      console.log(res.errCode)
      console.log(res.errMsg)
    });
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