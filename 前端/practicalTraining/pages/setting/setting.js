// pages/setting/setting.js
var app = getApp();
let base = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  left(e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  personalInformation() {
    wx.navigateTo({
      url: '../personalInformation/personalInformation',
    })
  },
  quit() {
    app.globalData.hasUserInfo = false;
    app.globalData.name = "";
    app.globalData.signature = "你还没有个性签名哦~";
    app.globalData.head = "";
    app.globalData.src = "";
    app.globalData.word = "";
    app.globalData.home = "";
    app.globalData.birth = "";
    app.globalData.chosenSrc = "";
    app.globalData.man = "../../icon/man.png";
    app.globalData.woman = "../../icon/woman.png";
    wx.navigateBack({
      delta: 1,
    })
  },
  logout() {
    wx.showModal({
      content: '确定注销账号吗？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.request({
            url: 'http://8.146.199.110:3000/users/deluser',
            method: "POST",
            data: {
              userid: app.globalData.id
            },
            success: res => {
              app.globalData.hasUserInfo = false;
              app.globalData.name = "";
              app.globalData.signature = "你还没有个性签名哦~";
              app.globalData.head = "";
              app.globalData.src = "";
              app.globalData.word = "";
              app.globalData.home = "";
              app.globalData.birth = "";
              app.globalData.chosenSrc = "";
              app.globalData.man = "../../icon/man.png";
              app.globalData.woman = "../../icon/woman.png";
              wx.navigateTo({
                url: '../login/login',
              })
            },
            fail: err => {
              console.log(err);
            }
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  }
})