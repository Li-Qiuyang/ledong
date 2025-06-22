// pages/searchCourse/searchCourse.js
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
    console.log(options.value)
    wx.request({
      url: 'http://8.146.199.110:3000/data/getalldata',
      method: 'get',
      success: res => {
        console.log(res)
        let list = res.data
        let searchlist = []
        for (let i = 0; i < list.length; i++) {
          if (list[i].lessonname.indexOf(options.value) != '-1') {
            searchlist.push(list[i])
            console.log(list[i].lessontype)
            if (list[i].lessontype == 'bodybuildingexercise') {
              this.setData({
                url: '../../icon/sport/sport1.png',
                title: '塑形训练',
                text: '助你达成理想身材',
                type: 'molding'
              })
            }
            else if (list[i].lessontype == 'run') {
              this.setData({
                url: '../../icon/sport/run.png',
                title: '跑步训练',
                type: 'startRun',
                text: '跑步，On The Way'
              })
            }
            else if (list[i].lessontype == 'ropeskipping') {
              this.setData({
                url: '../../icon/sport/jump.png',
                title: '跳绳训练',
                text: '生命不息，运动不止',
                type: 'skip'
              })
            }
            else if (list[i].lessontype == 'yoga') {
              this.setData({
                url: '../../icon/sport/yoga.png',
                title: '瑜伽训练',
                text: '疲惫的身体总要有瑜伽的释放',
                type: 'yoga'
              })
            }
          }
        }
        this.setData({
          newlist: searchlist
        })
        console.log(this.data.newlist)
      }
    })
  },
  enter: function (e) {
    wx.navigateTo({
      url: `../${this.data.type}/${this.data.type}`,
    })
  },
  left: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  video: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `../video/video?type=${e.currentTarget.dataset.type}&name=${e.currentTarget.dataset.name}&courseName=${e.currentTarget.dataset.coursename}&index=${e.currentTarget.dataset.index}&lessonid=${e.currentTarget.dataset.lessonid}&introduction=${e.currentTarget.dataset.introduction}`,
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