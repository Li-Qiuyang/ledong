// pages/basicInfomation/basicInfomation.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasId: null
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
      url: 'http://8.146.199.110:3000/users/userlogin',
      method: 'POST',
      data: {
        userid: app.globalData.id
      },
      success: res => {
        let user = res.data.user[0];
        console.log(user)
        let height1 = user.height.split('cm').slice(0, -1)[0];
        let weight1 = user.weight.split('kg').slice(0, -1)[0];
        let BMI = weight1 / (height1 * 0.01 * height1 * 0.01)
        this.setData({
          head: app.globalData.head,
          height: height1,
          weight: weight1,
          BMI: BMI.toFixed(2)
        })
      }
    })
    // let BMI = 50 / (165 * 0.01 * 165 * 0.01)
    // this.setData({
    //   head: app.globalData.head,
    //   height: 165,
    //   weight: 50,
    //   BMI: BMI.toFixed(2)
    // })
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