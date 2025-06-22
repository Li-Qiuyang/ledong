// pages/classMute/classMute.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    name: "",
    line: [
      { id: 1, day: "第1天", class: [] },
      { id: 2, day: "第2天", class: [] },
      { id: 3, day: "第3天", class: [] },
      { id: 4, day: "第4天", class: [] },
      { id: 5, day: "第5天", class: [] },
      { id: 6, day: "第6天", class: [] },
      { id: 7, day: "第7天", class: [] }
    ]
  },
  watch(e) {
    wx.navigateTo({
      url: `../video/video?type=${e.currentTarget.dataset.info.lessontype}&name=${e.currentTarget.dataset.info.lessonfilename}&courseName=${e.currentTarget.dataset.info.lessonname}&index=${e.currentTarget.dataset.info.index}&lessonid=${e.currentTarget.dataset.info.lessonid}&introduction=${e.currentTarget.dataset.info.introduction}`,
    })
  },
  left(e) {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let time = new Date().toTimeString().substring(0, 8).split(":");
    if (time[0] >= 8 && time[0] <= 11) {
      this.setData({
        date: "上午好！"
      })
    }
    else if (time[0] >= 12 && time[0] <= 18) {
      this.setData({
        date: "下午好！"
      })
    } else {
      this.setData({
        date: "晚上好！"
      })
    }
    this.setData({
      name: app.globalData.name
    })
    wx.request({
      url: 'http://8.146.199.110:3000/data/getdata?type=yoga',
      method: 'GET',
      data: {},
      success: res => {
        // console.log(res.data)
        let list = this.data.line;
        for (let i = 0; i < 7; i++) {
          list[i].class[0] = res.data[i];
          list[i].class[1] = res.data[i + 1];
          list[i].class[0].time = i + 7;
          list[i].class[0].info = i + 30;
          list[i].class[1].time = i + 10;
          list[i].class[1].info = i + 20;
        }
        this.setData({
          line: list
        })

        console.log(list)
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