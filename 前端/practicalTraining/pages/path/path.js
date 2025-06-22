// pages/map/map.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */

  data: {
    markers: [],
    polyline: [],
    map: '',
    latitude: '',
    longitude: '',
    time: '00:00',
    speed: "06'00''",
    distance: "0.00",
    date: '2023-5-12',
    speed: "0'00''"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  get: function () {
    var that = this;
    that.setData({
      markers: [
        {
          id: 1,
          width: 42,
          height: 42,
          rotate: 0,
          latitude: app.globalData.point[0].latitude,
          longitude: app.globalData.point[0].longitude,
          iconPath: '../../icon/path/people_run.png',
          anchor: {
            x: 0.5,
            y: 0.5,
          }
        },
        {
          id: 2,
          width: 30,
          height: 30,
          rotate: 0,
          latitude: app.globalData.point[0].latitude,
          longitude: app.globalData.point[0].longitude,
          iconPath: '../../icon/path/start.png',
        },
        {
          id: 3,
          width: 30,
          height: 30,
          rotate: 0,
          latitude: app.globalData.point[app.globalData.point.length - 1].latitude,
          longitude: app.globalData.point[app.globalData.point.length - 1].longitude,
          iconPath: '../../icon/path/end.png',
        }
      ],
      polyline: [{
        "points": app.globalData.point,
        "color": "#0091ff",
        "width": 6,
        "arrowLine": true
      }],
      latitude: app.globalData.point[0].latitude,
      longitude: app.globalData.point[0].longitude
    })

    console.log('1')
  },
  move: function () {
    console.log(this.data.polyline[0])
    this.map.moveAlong({
      markerId: 1,
      path: this.data.polyline[0].points,
      autoRotate: true,
      duration: 50000,
      success: (e) => {
        console.log('成功', e)
      },
      fail: (e) => {
        console.log('失败', e)
      },
      complete: (e) => {
        console.log('ok', e)
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.map = wx.createMapContext('map', this)
    this.get()
    this.move()
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
  left(e) {
    wx.navigateBack({
      delta: 1,
    })
  }
})