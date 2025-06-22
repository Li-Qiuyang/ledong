// pages/mood/mood.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { id: 1, src: "../../icon/d1.png", word: "美滋滋" },
      { id: 2, src: "../../icon/d2.png", word: "开心" },
      { id: 3, src: "../../icon/d3.png", word: "惊讶" },
      { id: 4, src: "../../icon/d4.png", word: "后悔" },
      { id: 5, src: "../../icon/d5.png", word: "emo" },
      { id: 6, src: "../../icon/d6.png", word: "生气" },
      { id: 7, src: "../../icon/d7.png", word: "无奈" },
      { id: 8, src: "../../icon/d8.png", word: "沾沾自喜" },
      { id: 9, src: "../../icon/d9.png", word: "尬笑" },
      { id: 10, src: "../../icon/d10.png", word: "烦躁" },
      { id: 11, src: "../../icon/d11.png", word: "害怕" },
      { id: 12, src: "../../icon/d12.png", word: "大笑" },
      { id: 13, src: "../../icon/d13.png", word: "担心" },
      { id: 14, src: "../../icon/d14.png", word: "傲娇" },
    ]
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
  choose(e) {
    wx.showModal({
      editable: true,//显示输入框
      placeholderText: '自定义心情',//显示输入框提示信息
      cancelColor: '#CAE2FA',
      success: res => {
        if (res.confirm) { //点击了确认
          console.log(res.content)//用户输入的值
          if (res.content == "") {
            wx.showToast({
              title: "请输入自定义心情",
              icon: "error",
              duration: 2000
            })
          } else {
            app.globalData.mood = true;
            app.globalData.word = res.content;
            wx.reLaunch({
              url: '../my/my',
            })
          }
        }
      }
    })
  },
  mood(e) {
    const info = e.currentTarget.dataset.list;
    app.globalData.mood = true;
    console.log(info)
    app.globalData.src = info.src;
    app.globalData.word = info.word;
    wx.reLaunch({
      url: '../my/my',
    })
  },
  left: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  }
})