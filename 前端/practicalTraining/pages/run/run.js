// pages/run/run.js
const app = getApp()
var id = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    time: '00:00',  //时间
    distance: '0.00', // 当前距离
    start: 1,
    run: false, //是否开始跑步
    num: 0,
    speed: "06'00''",  //速度
    minute: 0,
    second: 0
  },
  line: function (e) {  //轨迹
    var that = this;
    that.setData({
      polyline: [{
        points: app.globalData.point,
        color: '#000000',
        width: 4,
        dottedLine: false
      }]
    })
  },
  time: function (e) {
    var that = this;
    app.globalData.num++
    var minute = Math.ceil(app.globalData.num / 60) - 1;
    if (app.globalData.num % 60 == 0) {
      minute = Math.ceil(app.globalData.num / 60)
    }
    var second = app.globalData.num % 60;
    if (minute < 10) {
      minute = '0' + minute
    }
    if (second < 10) {
      second = '0' + second
    }
    that.setData({
      minute: minute,
      second: second
    })
    that.setData({
      time: minute + ':' + second
    })
  },
  // 将经纬度转换成三角函数中度分表形式
  rad: function (d) {
    return d * Math.PI / 180.0;
  },
  // 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  getDistance: function (lat1, long1, lat2, long2) {
    var that = this;
    var latitude1 = that.rad(lat1);
    var latitude2 = that.rad(lat2);
    var longitude1 = that.rad(long1);
    var longitude2 = that.rad(long2);
    var lat = latitude1 - latitude2;
    var long = longitude1 - longitude2;
    var meters = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(lat / 2), 2) + Math.cos(latitude1) * Math.cos(latitude2) * Math.pow(Math.sin(long / 2), 2)));
    meters = meters * 6378.137;
    meters = Math.round(meters * 10000) / 10000;
    if (parseInt(meters) >= 1) {
      that.setData({
        distance: meters.toFixed(2)
      })
      app.globalData.distance = meters.toFixed(2)
    } else if (meters == 0) {
      that.setData({
        distance: Number(0).toFixed(2)
      })
      app.globalData.distance = Number(0).toFixed(2)
    } else {
      that.setData({
        distance: ((meters * 100).toFixed(2) / 1000).toFixed(2)
      })
      app.globalData.distance = ((meters * 100) / 1000).toFixed(2)
    }
  },
  getLocation: function (e) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位
      success: function (res) {
        var len = app.globalData.point.length
        that.getDistance(app.globalData.point[len - 1].latitude, app.globalData.point[len - 1].longitude, res.latitude, res.longitude)
        app.globalData.point.push({ longitude: Number(res.longitude) + Number(app.globalData.num * 0.0001), latitude: Number(res.latitude) + Number(app.globalData.num * 0.0001) })
        // that.setData({longitude: Number(res.longitude)+ Number( app.globalData.num * 0.0001),latitude: Number(res.latitude)+ Number( app.globalData.num * 0.0001)
        // })
        // that.getDistance(app.globalData.point[len - 1].latitude,app.globalData.point[len - 1].longitude,res.latitude,res.longitude)
        // app.globalData.point.push({longitude: res.longitude,latitude: res.latitude})
      }
    })
  },
  pause: function () {  //暂停
    var that = this;
    this.setData({
      start: 0
    })
    clearInterval(that.start)
  },
  finish: function () {  //结束
    var value = {
      point: JSON.stringify(app.globalData.point),
      time: this.data.time,
      date: new Date().toISOString().substring(0, 10),
      type: app.globalData.type,
      distance: this.data.distance,
      head: app.globalData.head,
      id: app.globalData.id,
      speed: this.data.speed,
    }
    let sportTime = 0
    if (Math.ceil(app.globalData.num / 60) == 1) {
      console.log('1')
      sportTime = '0.' + app.globalData.num % 60
    } else {
      sportTime = Math.ceil(app.globalData.num / 60) + '.' + app.globalData.num % 60
    }
    wx.request({
      url: 'http://8.146.199.110:3000/map/uploadmap',
      method: 'POST',
      data: value,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res)
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/collect/ptinsert',
      method: 'post',
      data: {
        userId: app.globalData.id,
        videoId: app.globalData.type,
        time: sportTime,
        date: new Date().toLocaleDateString(),
        videoType: app.globalData.type
      },
      success: res => {
        console.log(res)
      }
    })

    console.log(value)
    app.globalData.point = []
    app.globalData.time = '00:00',
      app.globalData.num = 0,
      app.globalData.start = 1,
      app.globalData.distance = 0.00

    wx.navigateTo({
      url: '../startRun/startRun',
    })
  },
  keep: function () {  //继续
    var that = this
    id++
    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位
      success: function (res) {
        app.globalData.markers.push({ id: id, longitude: res.longitude, latitude: res.latitude })
        that.setData({
          start: 1
        })
      }
    })
    that.repeat()
  },
  repeat: function () {
    var that = this;
    that.start = setInterval(repeat, 1000);
    function repeat() {
      that.getLocation();
      that.time();
      that.line()
      if (that.data.distance != '0.00') {
        var time = Number(that.data.minute + '.' + that.data.second)
        var distance = Number(that.data.distance)
        var curSpeed;
        if (((time / distance).toFixed(2)).split('.')[0] >= 10) {
          curSpeed = ((time / distance).toFixed(2)).split('.')[0] + "'" + ((time / distance).toFixed(2)).split('.')[1] + "''"
        } else {
          curSpeed = "0" + ((time / distance).toFixed(2)).split('.')[0] + "'" + ((time / distance).toFixed(2)).split('.')[1] + "''"
        }
        that.setData({
          speed: curSpeed
        })
      }
    }
  },
  map: function () {
    // 截图操作
    var node = document.getElementById('container');
    domtoimage
      .toPng(node)
      .then(function (dataUrl) {
        // 导出图片
        var link = document.createElement('a');
        link.download = 'image.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error('domtoimage 出现问题! ', error);
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    if (options.prepare) {
      wx.getLocation({
        type: 'gcj02',
        altitude: true, //高精度定位
        success: function (res) {
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
          that.repeat()
          if (that.data.start == 1) {
            app.globalData.point.push({ longitude: res.longitude, latitude: res.latitude })
            app.globalData.markers.push({ id: id, longitude: res.longitude, latitude: res.latitude })
          }
        }
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