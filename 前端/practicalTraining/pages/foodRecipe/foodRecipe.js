// pages/foodRecipe/foodRecipe.js
var app = getApp()
import * as echarts from "../../components/echarts/echarts.min"

function Option(chart, da) {
  var option = {
    tooltip: {
      trigger: 'item'
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
      radius: ['55%', '70%'], //圈大小

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
  },
  collect: function () {
    if (this.data.isCollected) {
      wx.request({
        url: 'http://8.146.199.110:3000/collect/uncollectmenu',
        method: 'POST',
        data: {
          userid: app.globalData.id,
          menuid: app.globalData.recipe.menuId
        },
        success: res => {
          console.log(res);
          if (res.data.status == "delete success") {
            this.setData({
              isCollected: false
            })
          }
        }
      })
    } else {
      wx.request({
        url: 'http://8.146.199.110:3000/collect/collectmenu',
        method: 'POST',
        data: {
          userid: app.globalData.id,
          menuid: app.globalData.recipe.menuId,
        },
        success: res => {
          console.log(res);
          if (res.data.status == "collect success") {
            this.setData({
              isCollected: true
            })
          }
        }
      })
    }
  },
  left: function () {
    wx.navigateBack({
      url: '../food/food'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    console.log(options)
    this.setData({
      name: options.name
    })
    let method = []

    if (options.isCollected) {
      this.setData({
        isCollected: true,
        menu: app.globalData.recipe,
        method: app.globalData.recipe.descs.split('。').slice(0, -1)
      })
    } else {
      wx.request({
        url: 'http://8.146.199.110:3000/menu/getusermenu',
        method: 'post',
        data: {
          userid: app.globalData.id
        },
        success: res => {
          res.data.map(item => {
            if (item.menuid == app.globalData.recipe.menuId) {
              this.setData({
                isCollected: true
              })
            }
          })
        }
      })
      this.setData({
        menu: app.globalData.recipe,
        method: app.globalData.recipe.descs.split('。').slice(0, -1)
      })
    }

    this.Component = this.selectComponent('#mychart')
    this.getOption();
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
    console.log(app.globalData.recipe.menuFat)
    let all = parseFloat(app.globalData.recipe.menuCarbohyrate.split('g').slice(0, -1)[0]) + parseFloat(app.globalData.recipe.menuProtein.split('g').slice(0, -1)[0]) + parseFloat(app.globalData.recipe.menuFat.split('g').slice(0, -1)[0]);
    let value1 = parseFloat(app.globalData.recipe.menuCarbohyrate.split('g').slice(0, -1)[0]) / all * 100;
    let value2 = parseFloat(app.globalData.recipe.menuProtein.split('g').slice(0, -1)[0]) / all * 100;
    let value3 = parseFloat(app.globalData.recipe.menuFat.split('g').slice(0, -1)[0]) / all * 100;
    list = [
      {
        value: value1,
        name: '碳水化合物' + app.globalData.recipe.menuCarbohyrate,
        itemStyle: {
          color: '#91b6ee'
        }
      },
      {
        value: value2,
        name: '蛋白质' + app.globalData.recipe.menuProtein,
        itemStyle: {
          color: '#f1e151'
        }
      },
      {
        value: value3,
        name: '脂肪' + app.globalData.recipe.mwnuFat,
        itemStyle: {
          color: '#f7b2a9'
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