// pages/record/record.js
const app = getApp()
var path = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrow: true,
    sport: [
      { id: 1, name: '跑步' },
      { id: 2, name: '骑行' }
    ],
    name: '跑步',
    id: 1,
    allNum: 0,
    allMeters: 0,
    latitude: "",
    longitude: "",
    date: '',
    content: [],
    data: []
  },

  // 左移
  left1: function () {
    if (path != 0) {
      path--;
      this.setData({
        data: this.data.content[path]
      })
      this.get()
      this.move()
    } else {
      wx.showToast({
        title: "到达第一个",
        icon: "error",
        duration: 2000
      })
    }
  },

  // 右移
  right1: function () {
    if (path < this.data.content.length - 1) {
      path++;
      this.setData({
        data: this.data.content[path]
      })
      this.get()
      this.move()
    } else {
      wx.showToast({
        title: "到达最后一个",
        icon: "error",
        duration: 2000
      })
    }
  },

  // 选择运动类型 
  choose: function () {
    this.setData({
      arrow: !this.data.arrow
    })
  },

  // 选择运动类型
  chooseContent: function (e) {
    console.log(e)
    let sport = []
    this.data.allSport.map(item => {
      if (item.type == 'run' && e.currentTarget.dataset.datavalue.id == '1') {
        sport.push(item)
      } else if (item.type == 'ride' && e.currentTarget.dataset.datavalue.id == '2') {
        sport.push(item)
      }
    })
    if (sport.length != 0) {
      // 跑步的总距离
      var meters = 0
      sport.map(item => {
        meters = Number(meters) + Number(item.distance)
      })
      this.setData({
        latitude: sport[0].points[0].latitude,
        longitude: sport[0].points[0].longitude,
        content: sport,
        data: sport[0],
        allNum: sport.length,
        allMeters: meters,
        arrow: true,
        name: e.currentTarget.dataset.datavalue.name,
        id: e.currentTarget.dataset.datavalue.id,
      })
      this.get()
      this.move()
    } else {
      this.setData({
        content: [],
        data: [],
        allNum: 0,
        allMeters: 0,
        arrow: true,
        name: e.currentTarget.dataset.datavalue.name,
        id: e.currentTarget.dataset.datavalue.id,
      })
    }
  },
  path: function (e) {
    wx.navigateTo({
      url: '../path/path',
    })
  },
  left: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  // 路线
  get: function () {
    var icon = ''
    if (this.data.name == '跑步') {
      icon = '../../icon/path/people_run.png'
    } else if (this.data.name == '骑行') {
      icon = '../../icon/path/people_ride.png'
    }
    let point = this.data.data.points
    this.setData({
      markers: [
        {
          id: 1,
          width: 42,
          height: 42,
          rotate: 0,
          latitude: point[0].latitude,
          longitude: point[0].longitude,
          iconPath: icon,
          anchor: {
            x: 0.5,
            y: 0.5,
          }
        },
        {
          id: 2,
          width: 30,
          height: 30,
          rotate: 0,
          latitude: point[0].latitude,
          longitude: point[0].longitude,
          iconPath: '../../icon/path/start.png',
        },
        {
          id: 3,
          width: 30,
          height: 30,
          rotate: 0,
          latitude: point[point.length - 1].latitude,
          longitude: point[point.length - 1].longitude,
          iconPath: '../../icon/path/end.png',
        }
      ],
      polyline: [{
        "points": point,
        "color": "#0091ff",
        "width": 6,
        "arrowLine": true
      }],
      latitude: point[0].latitude,
      longitude: point[0].longitude
    })
  },

  // 移动路线
  move: function () {
    this.map = wx.createMapContext('map', this)
    this.map.moveAlong({
      markerId: 1,
      path: this.data.data.points,
      autoRotate: true,
      duration: 50000,
      success: (e) => {
        console.log('成功', e)
      },
      fail: (e) => {
        console.log('失败', e)
      },
      complete: (e) => {
        console.log('ok', e)
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取运动轨迹
    var that = this;
    wx.request({
      url: 'http://8.146.199.110:3000/map/getmap',
      method: 'get',
      success: res => {
        let allSport = []
        res.data.map(item => {
          if (item.id == app.globalData.id) {
            allSport.push(item)
          }
        })
        // 获得运动轨迹的经纬度
        allSport.map(item => {
          let arr = item.point.split('{')
          let arr1 = arr.splice(0, 1)
          let arr2 = []
          arr.map(item => {
            arr2.push(item.split('}')[0])
          })
          let point = []
          arr2.map(item => {
            let obj = {
              longitude: item.split('"')[2].split(":")[1].split(",")[0],
              latitude: item.split('"')[4].split(":")[1]
            }
            point.push(obj)
          })
          item.points = point
        })
        // //用户运动轨迹排序
        var t = 0;
        for (let i = 0; i < allSport.length; i++) {
          for (let j = 0; j < allSport.length; j++) {
            if (Date.parse(new Date(allSport[i].date)) > Date.parse(new Date(allSport[j].date))) {
              t = allSport[i]
              allSport[i] = allSport[j]
              allSport[j] = t
            }
          }
        }
        this.setData({  //用户的运动记录
          allSport: allSport
        })
        var sport = []
        allSport.map(item => {
          if (item.type == 'run') {
            sport.push(item)
          }
        })
        if (sport.length != 0) {
          // 跑步的总距离
          var meters = 0
          sport.map(item => {
            meters = Number(meters) + Number(item.distance)
          })
          that.setData({
            latitude: sport[0].points[0].latitude,
            longitude: sport[0].points[0].longitude,
            allSport: allSport,
            content: sport,
            data: sport[0],
            allNum: sport.length,
            allMeters: meters
          })
          that.get()
          that.move()
        } else {
          that.setData({
            allSport: allSport,
            content: [],
            data: [],
            allNum: 0,
            allMeters: 0
          })
        }
        wx.request({
          url: 'http://8.146.199.110:3000/users/userlogin',
          method: 'POST',
          data: {
            userid: app.globalData.id
          },
          success: res => {
            that.setData({
              avatar: res.data.user[0].avatar
            })
          }
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

  }
})