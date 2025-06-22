// pages/mysport/mysport.js
var app = getApp()
import * as echarts from "../../components/echarts/echarts.min"
function changeTwoDecimal(x) {
  var f_x = parseFloat(x);
  if (isNaN(f_x)) {
    alert('function:changeTwoDecimal->parameter error');
    return false;
  }
  f_x = Math.round(f_x * 100) / 100;

  return f_x;
}

function Option(chart, da) {
  var option = {
    tooltip: {
      trigger: 'item'
    },
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },

      type: 'pie',
      center: ['50%', '50%'], //位置
      radius: ['30%', '40%'], //圈大小

      data: da
    }]
  };
  chart.setOption(option);
  return chart;
}

function Option2(chart, data) {

  var option = {
    title: {
      text: '近一周运动时长'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: ['分钟']
    },
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {},
    series: [{
      name: '分钟',
      type: 'line',
      data: data
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
    backgroundColor: ['#D2E1FF', '#D2E1FF', '#D2E1FF', '#D2E1FF'],
    plan: ['跑步', '骑行', '行走', '饮食日程', '健身课程'],
    value: 1,
    items: [],
    isFirst: true,
    modalHidden: true,
    date: new Date().toISOString().substring(0, 10),
    ec: {
      lazyLoad: true
    },
    MET: {
      bodybuildingexercise: 3.5,
      dance: 7.8,
      pilates: 3,
      ropeskipping: 11.8,
      run: 7,
      warmup: 2.3,
      yoga: 4
    },
    calorie: 0
  },
  exam: function (e) {
    wx.navigateTo({
      url: '../exam/exam',
    })
  },
  bindViewTap: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })

  },
  addplan: function () {
    wx.navigateTo({
      url: '../course/course',
    })
  },
  // 点击确定 添加日程
  modalBindaconfirm: function () {
    this.setData({
      backgroundColor: ['#D2E1FF', '#D2E1FF', '#D2E1FF', '#D2E1FF'],
    })
    let list = this.data.items
    console.log(list)
    for (let i = 0; i < list.length; i++) {
      wx.request({
        url: 'http://8.146.199.110:3000/users/uploadschedule',
        method: 'post',
        data: {
          userId: app.globalData.id,
          name: list[i].name,
          date: new Date().toLocaleDateString(),
          isDone: 0
        },
        success: res => {
          console.log(res)
          this.getschedule()
        }
      })
    }
    this.setData({
      modalHidden: !this.data.modalHidden,
      items: []
    })
  },
  // 删除日程
  delSchedule: function (e) {
    console.log(e.currentTarget.dataset.sid)
    wx.request({
      url: 'http://8.146.199.110:3000/users/delschedule',
      method: 'post',
      data: {
        userId: app.globalData.id,
        sId: e.currentTarget.dataset.sid
      },
      success: res => {
        console.log(res)
        this.getschedule()
      }
    })
  },
  //取消按钮点击事件
  modalBindcancel: function () {
    this.setData({
      backgroundColor: ['#D2E1FF', '#D2E1FF', '#D2E1FF', '#D2E1FF'],
      modalHidden: !this.data.modalHidden,
    })
  },
  // 修改日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      calorie: 0
    })
    this.getOption();
  },
  // 修改日程是否完成
  changeDone: function (e) {
    // console.log(e.currentTarget.dataset.sid)
    console.log(e.currentTarget.dataset.isdone)
    if (e.currentTarget.dataset.isdone == 0) {
      this.setData({
        isDone: 1
      })
    } else if (e.currentTarget.dataset.isdone == 1) {
      this.setData({
        isDone: 0
      })
    }
    wx.request({
      url: 'http://8.146.199.110:3000/users/updateisdone',
      method: 'post',
      data: {
        userId: app.globalData.id,
        sId: e.currentTarget.dataset.sid,
        isDone: this.data.isDone
      },
      success: res => {
        this.getschedule()
      }
    })
  },
  //获取日程信息
  getschedule: function (e) {
    wx.request({
      url: 'http://8.146.199.110:3000/users/getschedule',
      method: 'post',
      data: {
        userId: app.globalData.id
      },
      success: res => {
        console.log(res.data)
        let today = new Date().toLocaleDateString()
        console.log(today)
        let schedulelist = res.data
        for (let i = 0; i < schedulelist.length; i++) {
          if (schedulelist[i].date !== today) {
            this.setData({
              isDone: 0
            })

            wx.request({
              url: 'http://8.146.199.110:3000/users/updateisdone',
              method: 'post',
              data: {
                userId: app.globalData.id,
                sId: schedulelist[i].sId,
                isDone: this.data.isDone
              },
              success: res => {
                console.log(res)
              }
            })
            wx.request({
              url: 'http://8.146.199.110:3000/users/updateschedule',
              method: 'post',
              data: {
                userId: app.globalData.id,
                sId: schedulelist[i].sId,
                name: schedulelist[i].name,
                date: today
              },
              success: res => {
                console.log(res)
              }
            })
          }
        }

        this.setData({
          item: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    let weight = app.globalData.weight
    // weight = weight.split('斤')[0] / 2
    // console.log(weight)
    // if (weight % 1 === 0) {
    //   weight = weight + '.0'
    // }
    this.setData({
      weight: weight
    })
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
    this.getschedule()
    this.Component = this.selectComponent('#mychart')
    this.Component2 = this.selectComponent('#mychart2')
    this.getOption();
    let today = new Date().toLocaleDateString()
    let str = today.split('/')
    for (let j = 0; j < str.length; j++) {
      if (str[j].length == 1) {
        str[j] = '0' + str[j]
      }
    }
    str = str.join('-')
    console.log(str)
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
  init_echart2: function (chartdata) {
    this.Component2.init((canvas, width, height, dpr) => {
      let chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      Option2(chart, chartdata)

      return chart;
    });
  },
  // 给图表加数据
  getOption: function () {
    wx.request({
      url: 'http://8.146.199.110:3000/collect/getpraticetime',
      method: 'post',
      data: {
        userId: app.globalData.id,
      },
      success: res => {
        let list = res.data.data
        console.log(list)
        let list2 = []
        // 改时间格式
        for (let i = 0; i < list.length; i++) {
          let str = list[i].date
          str = str.split('/')
          for (let j = 0; j < str.length; j++) {
            if (str[j].length == 1) {
              str[j] = '0' + str[j]
            }
          }
          str = str.join('-')
          list[i].date = str
          // 按时间查找
          let newlist = []
          if (list[i].date == this.data.date) {
            newlist.push(list[i])
            console.log(list[i])
            if (list[i].type == 'bodybuildingexercise') {
              let obj = {
                name: '身体塑形',
                value: changeTwoDecimal(list[i].time)
              }
              list2.push(obj)
              let calorie = this.data.calorie
              calorie += this.data.MET.bodybuildingexercise * list[i].time / 60 * 1.05 * this.data.weight
              console.log(this.data.calorie)
              this.setData({
                calorie: changeTwoDecimal(calorie)
              })
            }
            if (list[i].type == 'dance') {
              let obj = {
                name: '舞蹈',
                value: changeTwoDecimal(list[i].time)
              }
              list2.push(obj)
              let calorie = this.data.calorie
              calorie += this.data.MET.dance * list[i].time / 60 * 1.05 * this.data.weight
              this.setData({
                calorie: changeTwoDecimal(calorie)
              })
            }
            if (list[i].type == 'pilates') {
              let obj = {
                name: '普拉提',
                value: changeTwoDecimal(list[i].time)
              }
              list2.push(obj)
              let calorie = this.data.calorie
              calorie += this.data.MET.pilates * list[i].time / 60 * 1.05 * this.data.weight
              this.setData({
                calorie: changeTwoDecimal(calorie)
              })
            }
            if (list[i].type == 'ropeskipping') {
              let obj = {
                name: '跳绳',
                value: changeTwoDecimal(list[i].time)
              }
              list2.push(obj)
              let calorie = this.data.calorie
              calorie += this.data.MET.ropeskipping * list[i].time / 60 * 1.05 * this.data.weight
              this.setData({
                calorie: changeTwoDecimal(calorie)
              })
            }
            if (list[i].type == 'run') {
              let obj = {
                name: '跑步',
                value: changeTwoDecimal(list[i].time)
              }
              list2.push(obj)
              let calorie = this.data.calorie
              calorie += this.data.MET.run * list[i].time / 60 * 1.05 * this.data.weight
              this.setData({
                calorie: changeTwoDecimal(calorie)
              })
            }
            if (list[i].type == 'warmup') {
              let obj = {
                name: '热身',
                value: changeTwoDecimal(list[i].time)
              }
              list2.push(obj)
              let calorie = this.data.calorie
              calorie += this.data.MET.warmup * list[i].time / 60 * 1.05 * this.data.weight
              this.setData({
                calorie: changeTwoDecimal(calorie)
              })
            }
            if (list[i].type == 'yoga') {
              let obj = {
                name: '瑜伽',
                value: changeTwoDecimal(list[i].time)
              }
              list2.push(obj)
              console.log(list2)
              let calorie = this.data.calorie
              calorie += this.data.MET.yoga * list[i].time / 60 * 1.05 * this.data.weight
              this.setData({
                calorie: changeTwoDecimal(calorie)
              })
            }
          }
        }
        console.log(list2)

        var newData = []
        var newObj = {}
        list2.forEach((el, i) => {
          console.log(el)
          if (!newObj[el.name]) {
            newData.push(el);
            newObj[el.name] = true;
          } else {
            newData.forEach(el => {
              if (el.name === list2[i].name) {
                el.value = el.value + list2[i].value;
                // el.citys = [...el.citys, ...oldDataRule[i].citys]; // es6语法
              }
            })
          }
        })
        console.log(newData)
        list2 = newData

        this.init_echart(newData)
        // 折线图
        let week = new Date().getDay()
        let day = new Date().getDate()
        let weeklist = []
        for (let i = week - 1; i >= 0; i--) {
          for (let j = 0; j < list.length; j++) {
            let date = list[j].date.split('-')[2]
            if (date == day - i) {
              if (weeklist[week - i - 1]) {
                weeklist[week - i - 1] += changeTwoDecimal(list[j].time)
              } else {
                weeklist[week - i - 1] = changeTwoDecimal(list[j].time)
              }
            }
          }
          if (!weeklist[i]) {
            weeklist[i] = 0
          }
        }
        console.log(weeklist)
        this.init_echart2(weeklist)
        this.setData({
          timeList: list2,
        })
      }
    })
  },

  // 添加运动日程
  addsport: function (e) {
    let index = e.currentTarget.dataset.index
    let colorlist = this.data.backgroundColor
    let arr = this.data.items;
    if (colorlist[index] == '#D2E1FF') {
      colorlist[index] = '#5E94E4'
      let obj = {
        name: e.currentTarget.id
      }
      arr.push(obj)
    } else {
      colorlist[index] = '#D2E1FF';
      console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == this.data.plan[index]) {
          arr.splice(i, 1)
        }
      }
    }
    console.log(arr)
    this.setData({
      backgroundColor: colorlist,
      items: arr,
    })
  },
  // 添加饮食日程
  addfood: function (e) {
    let arr = this.data.items;
    let index = e.currentTarget.dataset.index
    let colorlist = this.data.backgroundColor
    if (colorlist[index] == '#D2E1FF') {
      colorlist[index] = '#5E94E4'
      arr.push({
        name: '早餐 建议460千卡'
      })
      arr.push({
        name: '午餐 建议620千卡'
      })
      arr.push({
        name: '晚餐 建议420千卡'
      })
    } else {
      colorlist[index] = '#D2E1FF'
      for (let i = 0; i < arr.length; i++) {
        console.log(i)
        if (arr[i].name.indexOf('餐') !== -1) {
          console.log(i)
          arr.splice(i, 1)
        }
      }
      for (let i = 0; i < arr.length; i++) {
        console.log(i)
        if (arr[i].name.indexOf('餐') !== -1) {
          console.log(i)
          arr.splice(i, 1)
        }
      }
    }
    console.log(arr)
    this.setData({
      items: arr,
      backgroundColor: colorlist
    })
  },
  left: function (e) {
    wx.navigateBack({
      delta: 1,
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
    this.onLoad()
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