// pages/food/food.js
let week = ['一', '二', '三', '四', '五', '六', '日']
let color = ['#5e94e4', '#fab9b0', '#cae2fa', '#fab9b0', '#5e94e4', '#fab9b0', '#eee8d1', '#5e94e4', '#fab9b0', '#eee8d1', '#5e94e4', '#fab9b0', '#eee8d1']
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getKcal: 0,
    time: (new Date().getMonth() + 1 < 10 ?
        '0' + (new Date().getMonth() + 1) :
        new Date().getMonth() + 1) +
      '月' +
      (new Date().getDate() < 10 ?
        '0' + new Date().getDate() :
        new Date().getDate()) +
      '日 ' +
      '星期' + week[new Date().getDay() - 1],
    menu: [],
    rotateIndex: '',
    animationData: {}
  },
  refresh(e) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
    // 逆时针旋转实例
    var animation1 = wx.createAnimation({
      duration: 10,
      timingFunction: 'ease'
    })
    
    animation.rotate(360).step()
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function() {
      animation1.rotate(0).step()
     this.setData({
       animationData: animation1.export()
     })
    }.bind(this), 1300);
    this.onLoad()
  },
  dirary: function (e) {
    wx.navigateTo({
      url: '../foodDirary/foodDirary',
    })
  },
  choose: function (e) {
    console.log(e)
    let title = ''
    if (e.currentTarget.id == 1) {
      title = '早餐'
    } else if (e.currentTarget.id == 2) {
      title = '午餐'
    } else {
      title = '晚餐'
    }
    wx.navigateTo({
      url: '../foodChoose/foodChoose?title=' + title,
    })
  },
  include: function (e) {
    app.globalData.recipe = e.currentTarget.dataset.datavalue
    // console.log(e.currentTarget.dataset.datavalue.menuName)
    let name=e.currentTarget.dataset.datavalue.menuName
    wx.navigateTo({
      url: '../foodRecipe/foodRecipe?name='+name
    })
  },
  getKcal: function () {
    this.setData({
      getKcal: 0
    })
    var value = {
      userid: app.globalData.id,
      date: new Date().toISOString().substring(0, 10)
    }
    wx.request({
      url: 'http://8.146.199.110:3000/food/getdayfood',
      method: 'POST',
      data: value,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res.data)
        res.data.map(item => {
          this.setData({
            getKcal: Number(this.data.getKcal) + Number(item.foodEnergy)
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.request({
      url: 'http://8.146.199.110:3000/menu/getmenu',
      method: 'GET',
      success: res => {
        console.log(res.data)
        let Arr = res.data
        var arrNew = [];

        for (var i = 0; i < 3; i++) {
          var _num = Math.floor(Math.random() * Arr.length)
          var mm = Arr[_num];
          Arr.splice(_num, 1)
          arrNew.push(mm)
        }

        console.log(arrNew)
        arrNew.map((item, index) => {
          item.color = color[index]
        })
        that.setData({
          menu: arrNew
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
    this.getKcal()
    // var animation = wx.createAnimation({
    //   duration: 800,
    //   timingFunction: "linear"
    // })
    // this.animation = animation
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