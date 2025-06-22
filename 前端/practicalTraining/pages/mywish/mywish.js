const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  left: function (options) {
    wx.navigateBack({
      delta: 1,
    })
  },
  delete(e) {
    console.log(e.currentTarget.id)
    wx.request({
      url: 'http://8.146.199.110:3000/wish/delwish',
      method: 'POST',
      data: {
        userId:app.globalData.id,
        wishId:e.currentTarget.id
      },
      success: res => {
        this.onLoad();
        console.log(res);
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://8.146.199.110:3000/wish/getwish',
      method: 'get',
      success: res => {
        console.log(res.data)
        let list = res.data
        let mywish = []
        for (let i = 0; i < list.length; i++) {
          console.log(list[i].user[0].userid)
          if (list[i].user[0].userid&&list[i].user[0].userid == app.globalData.id) {
            mywish.push(list[i])
          }
        }
        this.setData({
          mywish: mywish
        })
        console.log(this.data.mywish)
      },
      fail: err => {
        console.error(err)
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