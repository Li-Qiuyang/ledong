// pages/statistics/statistics.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    man: "../../icon/man2.png",
    woman: "../../icon/woman2.png",
    sex: "",
    date: "2005-05-20",
    multiArray: [
      [],
      ['cm'],
    ],
    multiIndex: [0, 0],
    multiArray2: [
      [],
      [],
      ['斤']
    ],
    multiIndex2: [0, 0, 0],
    ifTall: false,
    height: "",
    ifWeight: false,
    ifHeight: false,
    weight: "",
    img: "",
    sure: false
  },
  chooseHeight: function (e) {
    this.showModal()
  },
  chooseWeight: function (e) {
    this.showModal2()
  },
  cancel(e) {
    this.hideModal()
  },
  cancel2(e) {
    this.hideModal2()
  },
  confirm2(e) {
    let weight = this.selectComponent('#ctrlmill2').data.number
    app.globalData.weight = weight

    this.setData({
      ifWeight: true,
      weight: weight
    })
    console.log(app.globalData)
    this.hideModal2()
  },
  confirm(e) {
    let height = this.selectComponent('#ctrlmill1').data.number
    console.log(height)
    app.globalData.height = height

    this.setData({
      ifHeight: true,
      height: height,
    })
    console.log(this.data.height)
    this.hideModal()
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  showModal2: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus2: true,
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  hideModal2: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus2: false
      })
    }.bind(this), 200)
  },
  choose1(e) {
    this.setData({
      man: "../../icon/man21.png",
      woman: "../../icon/woman2.png",
      sex: "男"
    })
  },
  choose2(e) {
    this.setData({
      man: "../../icon/man2.png",
      woman: "../../icon/woman21.png",
      sex: "女"
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindMultiPickerChange(e) {
    this.setData({
      ifTall: true,
      height: this.data.multiArray[0][e.detail.value[0]] + "cm"
    })
  },
  bindMultiPickerChange2(e) {
    this.setData({
      ifWeight: true,
      weight: this.data.multiArray2[0][e.detail.value[0]] + '.' + this.data.multiArray2[1][e.detail.value[1]] + '斤'
    })
  },
  submit(e) {
    if (this.data.height != "" && this.data.weight != "" && this.data.sex != "" && this.data.date != "") {
      this.setData({
        sure: true,
        img: this.data.sex == "女" ? "../../icon/g1.png" : "../../icon/g2.png"
      })
    } else {
      wx.showToast({
        title: "都要写上哦~",
        icon: "error",
        duration: 3000
      })
    }
  },
  choose(e) {
    this.setData({
      img: "",
      sure: false
    })
  },
  // 修改个人信息
  change(e) {
    wx.request({
      url: 'http://8.146.199.110:3000/users/userupdate',
      method: 'POST',
      data: {
        userid: app.globalData.id,
        date: this.data.date.toString(),
        sex: this.data.sex,
        username: app.globalData.name,
        avatar: app.globalData.head,
        signature: app.globalData.signature,
        height: this.data.height,
        weight: this.data.weight
      },
      success: res => {
        console.log(res)
        wx.switchTab({
          url: '../sport/sport',
        })
        app.globalData.height = this.data.height;
        app.globalData.weight = this.data.weight;
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let tall = this.data.multiArray;
    for (let i = 100; i <= 226; i++) {
      tall[0][i - 100] = i;
      this.setData({
        multiArray: tall
      })
    }
    let weightContent = this.data.multiArray2;
    for (let i = 6; i <= 299; i++) {
      weightContent[0][i - 6] = i;
      this.setData({
        multiArray2: weightContent
      })
    }
    for (let j = 0; j <= 9; j++) {
      weightContent[1][j] = j;
      this.setData({
        multiArray2: weightContent
      })
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