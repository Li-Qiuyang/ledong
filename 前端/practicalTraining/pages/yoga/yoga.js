// pages/yoga/yoga.js
var app = getApp()
import * as echarts from "../../components/echarts/echarts.min"

function Option(chart, da) {
  var option = {
    tooltip: {
      trigger: 'item',
    },
    series: [{
      label: {
        normal: {
          fontSize: 12,
          show: false
        }
      },

      type: 'pie',
      // center: ['10%', '50%'], //位置
      radius: ['50%', '70%'], //圈大小

      data: da
    }]
  };
  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected: false,
    // backgroundColor: ['#FF6E6E', '#D2E1FF', '#E547F6'],
    value: 1,
    items: [],
    isFirst: true,
    modalHidden: true,
    ec: {
      lazyLoad: true
    },
    weight: 50,
    now: 0,
    total: 10,
    range: ['10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90'],
    percent: 0,
    date: 0,
    hasSchedule: false,
    lesson: [],
    line: [
      { id: 1, day: "第1天", class: [] },
      { id: 2, day: "第2天", class: [] },
      { id: 3, day: "第3天", class: [] },
      { id: 4, day: "第4天", class: [] },
      { id: 5, day: "第5天", class: [] },
      { id: 6, day: "第6天", class: [] },
      { id: 7, day: "第7天", class: [] }
    ],
    day: 1,
    allTimeEc: 0,
    sport: 0
  },
  // 初始化图表
  init_echart: function (chartdata) {
    this.Component.init((canvas, width, height, dpr) => {
      let chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      Option(chart, chartdata)

      return chart;
    });
  },
  // 给图表加数据
  getOption: function () {
    let list = [];
    let all = this.data.total;
    let value1 = app.globalData.allTime;
    let value2 = all - app.globalData.allTime;
    list = [
      {
        value: value1,
        name: '已运动',
        itemStyle: {
          color: '#91b6ee'
        }
      },
      {
        value: value2,
        name: '未运动',
        itemStyle: {
          color: 'rgb(240, 240, 250)'
        }
      }
    ]
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (list[i].name == list[j].name) {
          list[i].value = list[i].value + list[j].value
          list.splice(j, 1)
        }
      }
    }
    this.init_echart(list)
  },
  watch(e) {
    wx.navigateTo({
      url: `../video/video?type=${e.currentTarget.dataset.info.lessontype}&name=${e.currentTarget.dataset.info.lessonfilename}&courseName=${e.currentTarget.dataset.info.lessonname}&index=${e.currentTarget.dataset.info.index}&lessonid=${e.currentTarget.dataset.info.lessonid}&introduction=${e.currentTarget.dataset.info.introduction}`,
    })
  },
  gain() {
    var myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();

    // 获得运动时长
    wx.request({
      url: 'http://8.146.199.110:3000/collect/getpraticetime',
      method: 'post',
      data: {
        userId: app.globalData.id,
      },
      success: res => {
        let allTime = 0;
        let that = this;
        let time = res.data.data
        for (let i = 0; i < time.length; i++) {
          if (time[i].date == year + "/" + month + "/" + day && time[i].type == "yoga") {
            allTime += time[i].time * 1;
          }
        }
        app.globalData.allTime = allTime;
        console.log(allTime)
        that.setData({
          now: app.globalData.allTime.toFixed(1)
        })
      }
    })
  },
  class(e) {
    wx.navigateTo({
      url: '../classMute/classMute',
    })
  },
  left(e) {
    wx.switchTab({
      url: '../sport/sport',
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  into(e) {
    wx.navigateTo({
      url: `../video/video?type=${e.currentTarget.dataset.info.lessontype}&name=${e.currentTarget.dataset.info.lessonfilename}&courseName=${e.currentTarget.dataset.info.lessonname}&index=${e.currentTarget.dataset.info.index}&lessonid=${e.currentTarget.dataset.info.lessonid}&introduction=${e.currentTarget.dataset.info.introduction}`,
    })
  },
  point(e) {
    wx.navigateTo({
      url: '../mysport/mysport',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.gain();
    wx.request({
      url: 'http://8.146.199.110:3000/users/userlogin',
      method: 'POST',
      data: {
        userid: app.globalData.id
      },
      success: res => {
        let user = res.data.user[0];
        if (user.fans != null) {
          this.setData({
            hasSchedule: true
          })
        }
      }
    })
    if (app.globalData.total != undefined) {
      this.setData({
        total: app.globalData.total
      })
    }
    if (app.globalData.head == "") {
      wx.showToast({
        title: "请先登录",
        icon: "error",
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 500)
    }
    wx.request({
      url: 'http://8.146.199.110:3000/data/getdata?type=yoga',
      method: 'GET',
      data: {},
      success: res => {
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
          line: list[this.data.day - 1]
        })
        let recommendLesson = [];
        for (let i = 6; i > 1; i--) {
          recommendLesson.push(res.data[i]);
        }
        this.setData({
          lesson: recommendLesson
        })
      },
      fail: error => {
        console.log(error)
      }
    })
    if (options.change == "true") {
      this.setData({
        hasSchedule: options.change
      })
    }
    var myDate = new Date();
    let year = myDate.getFullYear();
    let month = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
    let day = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
    this.setData({
      // 几号
      date: year + "-" + month + "-" + day
    })
    this.Component = this.selectComponent('#mychart');
    setTimeout(() => {
      this.getOption()
    }, 300)
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
    if (app.globalData.gain == true) {
      this.gain();
      this.getOption();
    }
    console.log(app.globalData.gain)
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
  changes(e) {
    let index = e.detail.value;
    this.setData({
      total: this.data.range[index]
    })
    app.globalData.total = this.data.range[index]
    this.gain();
    this.getOption();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  assess(e) {
    wx.navigateTo({
      url: '../assessCondition/assessCondition',
    })
  }
})