// pages/startRun/startRun.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    type: ''
  },
  left: function () {
    wx.switchTab({
      url: '../sport/sport',
    })
  },

  startRun: function (e) {
    var prepare = true;
    wx.navigateTo({
      url: '../prepare/prepare?prepare=' + prepare,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    app.globalData.type = options.type
    that.setData({
      type: options.type
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
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