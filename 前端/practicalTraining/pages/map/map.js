// pages/map/map.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    polyline:[], //路线
    time:'00:00',
    distance:'0.00', //km
    num:0,
    start:1,
  },
  back:function () {
    var that = this;
    clearInterval(that.start)
    wx.navigateTo({
      url: '../run/run',
    })
  },

  getLocation:function(e){
    var that = this;
    wx.getLocation({
      type:'gcj02',
      altitude: true, //高精度定位
      success:function(res){
        var len = app.globalData.point.length
        that.getDistance(app.globalData.point[len - 1].latitude,app.globalData.point[len - 1].longitude,res.latitude,res.longitude)
        app.globalData.point.push({longitude: Number(res.longitude)+ Number( app.globalData.num * 0.0001),latitude: Number(res.latitude
          )+ Number( app.globalData.num * 0.0001)})
        // that.getDistance(app.globalData.point[len - 1].latitude,app.globalData.point[len - 1].longitude,res.latitude,res.longitude)
        // app.globalData.point.push({longitude: res.longitude,latitude: res.latitude})
      }
    })
  },
  line:function(e) {
    var that = this;
    that.setData({
      polyline:[{
        points:app.globalData.point,
        color:'#000000',
        width:4,
        dottedLine:false
      }]
    })
  },
  // 将经纬度转换成三角函数中度分表形式
  rad:function (d) {
    return d * Math.PI / 180.0;
  },
  // 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  getDistance:function(lat1,long1,lat2,long2){
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
    if(parseInt(meters) >= 1){
      that.setData({
        distance:meters.toFixed(2)
      })
      app.globalData.distance = meters.toFixed(2)
    }else if(meters == 0){
      that.setData({
        distance:Number(0).toFixed(2)
      })
      app.globalData.distance = Number(0).toFixed(2)
    }else{
      that.setData({
        distance:((meters * 100).toFixed(2) / 1000 ).toFixed(2)
      })
      app.globalData.distance = ((meters * 100) / 1000 ).toFixed(2)
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    that.setData({
      start:options.start,
      time:app.globalData.time,
      distance:app.globalData.distance
    })
    wx.getLocation({
      type:'gcj02',
      altitude: true, //高精度定位
      success:function(res){
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
        if(that.data.start == 1){
          app.globalData.point.push({longitude:res.longitude,latitude:res.latitude})
        }
      }
    })
    if(that.data.start == 1){
      that.start = setInterval(repeat,1000);
      function repeat(){
        that.getLocation();
        that.time();
        that.line();
      }
    }
  },

  time:function (e) {
    var that = this;
    app.globalData.num ++
    var minute = Math.ceil(app.globalData.num/60) - 1;
    if(app.globalData.num % 60 == 0){
      minute = Math.ceil(app.globalData.num/60)
    }
    var second = app.globalData.num % 60;
    if(minute < 10){
      minute = '0' + minute
    }
    if(second < 10){
      second = '0' + second
    }
    var keeptime = minute + ':' + second;
    that.setData({
      time:minute + ':' + second
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