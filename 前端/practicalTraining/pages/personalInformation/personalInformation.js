// pages/personalInformation/personalInformation.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "",
    chosenSrc: "",
    region: ["选择家乡"],
    date: '选择生日',
    man: "",
    woman: "",
    signature: "",
    name: "",
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
        if (user.sex == '女') {
          app.globalData.woman = "../../icon/woman1.png",
            app.globalData.man = "../../icon/man.png"
        }
        else if (user.sex == '男') {
          app.globalData.woman = "../../icon/woman.png",
            app.globalData.man = "../../icon/man1.png"
        } else {
          app.globalData.woman = "../../icon/woman.png",
            app.globalData.man = "../../icon/man.png"
        }
        app.globalData.home = user.region == null ? null : user.region.split(",");
        app.globalData.birth = user.date;
        app.globalData.signature = user.signature == "" ? "" : user.signature
        this.setData({
          avatar: app.globalData.head,
          value1: app.globalData.name,
          value2: app.globalData.signature == ("" || "你还没有个性签名哦~") ? "" : app.globalData.signature,
          region: app.globalData.home == null ? ["选择家乡"] : app.globalData.home,
          date: app.globalData.birth == null ? '选择生日' : app.globalData.birth,
          woman: app.globalData.woman,
          man: app.globalData.man,
          yoga: user.fans
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

  },
  left(e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  changeAvatar() {
    var that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        that.setData({
          chosenSrc: res.tempFiles[0].tempFilePath,
          avatar: res.tempFiles[0].tempFilePath
        })
        console.log(res.tempFiles[0].tempFilePath)
      }
    })
  },
  change() {
    let sex = null;
    if (this.data.woman == "../../icon/woman1.png" && this.data.man == "../../icon/man.png") {
      sex = '女'
    }
    else if (this.data.woman == "../../icon/woman.png" && this.data.man == "../../icon/man1.png") {
      sex = '男'
    }
    if (this.data.signature == "") {
      this.setData({
        value2: '你还没有个性签名哦~'
      })
    }
    wx.request({
      url: 'http://8.146.199.110:3000/users/userupdate',
      method: 'POST',
      data: {
        userid: app.globalData.id,
        username: this.data.name == "" ? this.data.value1 : this.data.name,
        avatar: this.data.chosenSrc == "" ? this.data.avatar : this.data.chosenSrc,
        region: this.data.region.toString() == "选择家乡" ? null : this.data.region.toString(),
        date: this.data.date.toString() == "选择生日" ? null : this.data.date.toString(),
        signature: this.data.signature == "" ? this.data.value2 : this.data.signature,
        sex: sex,
        collect_sport: null,
        collect_food: null,
        fans: this.data.yoga,
        concern: null,
        height: app.globalData.height,
        weight: app.globalData.weight
      },
      success: res => {
        app.globalData.head = this.data.chosenSrc == "" ? this.data.avatar : this.data.chosenSrc;
        app.globalData.name = this.data.name == "" ? this.data.value1 : this.data.name;
        app.globalData.man = this.data.man;
        app.globalData.woman = this.data.woman;
        app.globalData.home = this.data.region;
        app.globalData.birth = this.data.date;
        app.globalData.signature = this.data.signature == "" ? this.data.value2 : this.data.signature;
      },
      fail: err => {
        console.log(err)
      }
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  getUserProvince: function (e) {
    this.setData({
      region: e.detail.value     //将用户选择的省市区赋值给region
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  choose1(e) {
    this.setData({
      man: "../../icon/man1.png",
      woman: "../../icon/woman.png"
    })
  },
  choose2(e) {
    this.setData({
      woman: "../../icon/woman1.png",
      man: "../../icon/man.png"
    })
  },
  getSignature(e) {
    this.setData({
      signature: e.detail.value
    })
    console.log(this.data.signature)
  },
  getName(e) {
    console.log(e.detail.value);
    if (e.detail.value == "") {
      wx.showToast({
        title: "昵称不能为空",
        icon: "error",
        duration: 2000
      })
    }
    this.setData({
      name: e.detail.value
    })
  }
})