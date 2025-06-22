// pages/water/water.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goal: 5,
    now: 0,
    array: ['1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400', '2500', '2600', '2700', '2800', '2900', '3000'],
    array2: ['50', '100', '150', '200', '250', '300', '350', '400', '450', '500', '550', '600'],
    index: 0,
    index2: 0
  },
  add(e) {
    if (this.data.now < this.data.goal) {
      this.setData({
        now: this.data.now + 1
      })
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      goal: parseInt(this.data.array[e.detail.value].slice("") / this.data.array2[this.data.index2].slice(""))
    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value,
      goal: parseInt(this.data.array[this.data.index].slice("") / this.data.array2[e.detail.value].slice(""))
    })
  },
  left(e) {
    wx.navigateTo({
      url: '../obj/index?now=' + this.data.now + '&index=' + this.data.array2[this.data.index2] + '&all=' + this.data.goal + '&index1=' + this.data.array[this.data.index],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    if (options.index != "undefined" && options.index != "undefined" && options.all != "undefined" && options.index1 != "undefined") {
      this.setData({
        now: parseInt(options.now),
        goal: parseInt(options.all),
        item: options.index,
        item1: options.index1
      })
      for (let i = 0; i < this.data.array2.length; i++) {
        if (options.index == this.data.array2[i]) {
          this.setData({
            index2: i
          })
        }
      }
      for (let i = 0; i < this.data.array.length; i++) {
        if (options.index1 == this.data.array[i]) {
          this.setData({
            index: i
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