// pages/foodDirary/foodDirary.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth: 180, // 画布宽度
    canvasHeight: 180, // 画布高度
    weight: '',
    getKcal: 0,
    allKcal: 1500,
    reduceKcal: 0,
    date: new Date().toISOString().substring(0, 10),
    add: 0,
    foodProtein: '',
    foodFat: '',
    foodCarbohyrate: '',
    remainKcal: '',
    MET: {
      bodybuildingexercise: 3.5,
      dance: 7.8,
      pilates: 3,
      ropeskipping: 11.8,
      run: 7,
      warmup: 2.3,
      yoga: 4
    },
    calorie: 0,
    day: [{
        id: '1',
        name: '早餐'
      },
      {
        id: '2',
        name: '午餐'
      },
      {
        id: '3',
        name: '晚餐'
      }
    ],
    name: '早餐',
    food: [],
    allFood: []
  },

  // 初始化时调用即可
  showCanvasRing: function () {
    try {
      //作画
      var ctx = wx.createCanvasContext("circleBar", this); //canvas组建封装，需要后加个this
      ctx.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight); // 清除画布

      var circle_r = this.data.canvasWidth / 2 - 10; //画布的一半，用来找中心点和半径
      let that = this;
      console.log(that.data.add)
      //定义起始点
      ctx.translate(this.data.canvasWidth / 2, this.data.canvasWidth / 2);

      //灰色圆弧
      ctx.beginPath();
      ctx.setStrokeStyle("#D6E4FF");
      ctx.setLineWidth(10);
      ctx.setLineCap("round"); //线条结束端点样式 butt 平直 round 圆形 square 正方形
      ctx.arc(0, 0, circle_r - 15, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.closePath();

      // 蓝色圆弧
      ctx.beginPath();
      ctx.setStrokeStyle("#499df8");
      ctx.setLineWidth(12);
      ctx.arc(0, 0, circle_r - 15, 1.5 * Math.PI, that.data.add * Math.PI, false);
      ctx.stroke();
      ctx.closePath();

      // 文字-总得分
      ctx.setTextAlign("center"); // 字体位置
      ctx.setFillStyle("#333333");
      ctx.font = "normal normal 12px Arial,sans-serif";
      ctx.fillText("还可摄入", 0, -20);
      // 文字-具体分数
      ctx.setTextAlign("center"); // 字体位置
      ctx.setFillStyle("#000000");
      ctx.font = "normal bold 36px Arial,sans-serif";
      ctx.fillText(that.data.remainKcal, 0, 20);

      // 绘图
      ctx.draw(false, function () {
        //将生成好的图片保存到本地
        wx.canvasToTempFilePath({
            canvasId: "circleBar",
            success: function (res) {
              var tempFilePath = res.tempFilePath;
              that.setData({
                loadImagePath: tempFilePath,
              });
            },
            fail: function (res) {},
          },
          that
        );
      });
    } catch (error) {}
  },
  chooseDay: function (e) {
    var name = e.currentTarget.dataset.datavalue.name
    this.setData({
      name: name
    })
    this.getFood()
  },
  getFood: function () {
    var food = []
    this.data.allFood.map((item) => {
      if (item.title == this.data.name) {
        food.push(item)
      }
    })
    this.setData({
      food: food
    })
  },
  changeDate: function (e) {
    this.setData({
      date: e.detail.value
    })
    this.onLoad()
  },
  left: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  getFood: function () {
    var value = {
      userid: app.globalData.id,
      date: this.data.date
    }
    wx.request({
      url: 'http://8.146.199.110:3000/food/getdayfood',
      method: 'POST',
      data: value,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.setData({
          allFood: res.data,
          getKcal: 0,
          foodProtein: 0,
          foodFat: 0,
          foodCarbohyrate: 0
        })
        var food = []
        this.data.allFood.map((item) => {
          this.setData({
            getKcal: Number(this.data.getKcal) + Number(item.foodEnergy),
            foodProtein: Number(this.data.foodProtein) + Number(item.foodProtein),
            foodFat: Number(this.data.foodFat) + Number(item.foodFat),
            foodCarbohyrate: Number(this.data.foodCarbohyrate) + Number(item.foodCarbohyrate)
          })
          if (item.title == this.data.name) {
            food.push(item)
          }
        })
        this.setData({
          food: food,
          remainKcal: this.data.allKcal - this.data.getKcal + this.data.reduceKcal,
          add: (this.data.getKcal * 2 + 2250) / 1500
        })
        this.showCanvasRing()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.weight)
    let weight = app.globalData.weight.split('.')[0]
    this.setData({
      weight: weight / 2
    })
    wx.request({
      url: 'http://8.146.199.110:3000/collect/getpraticetime',
      method: 'post',
      data: {
        userId: app.globalData.id,
      },
      success: res => {
        let list = res.data.data
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
          if (list[i].type == 'bodybuildingexercise') {
            let calorie = this.data.MET.bodybuildingexercise * list[i].time / 60 * 1.05 * this.data.weight
            list[i].calorie = Math.ceil(calorie)
          }
          if (list[i].type == 'dance') {
            let calorie = this.data.MET.dance * list[i].time / 60 * 1.05 * this.data.weight
            list[i].calorie = Math.ceil(calorie)
          }
          if (list[i].type == 'pilates') {
            let calorie = this.data.MET.pilates * list[i].time / 60 * 1.05 * this.data.weight
            list[i].calorie = Math.ceil(calorie)
          }
          if (list[i].type == 'ropeskipping') {
            let calorie = this.data.MET.ropeskipping * list[i].time / 60 * 1.05 * this.data.weight
            list[i].calorie = Math.ceil(calorie)
          }
          if (list[i].type == 'run') {
            let calorie = this.data.MET.run * list[i].time / 60 * 1.05 * this.data.weight
            list[i].calorie = Math.ceil(calorie)
          }
          if (list[i].type == 'warmup') {
            let calorie = this.data.MET.warmup * list[i].time / 60 * 1.05 * this.data.weight
            list[i].calorie = Math.ceil(calorie)
          }
          if (list[i].type == 'yoga') {
            let calorie = this.data.MET.yoga * list[i].time / 60 * 1.05 * this.data.weight
            list[i].calorie = Math.ceil(calorie)
          }
        }
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            if (list[i].type == list[j].type) {
              list[i].calorie = list[i].calorie + list[j].calorie
              list.splice(j, 1)
            }
          }
        }
        let newlist = []
        for (let i = 0; i < list.length; i++) {
          let obj = {
            date: list[i].date,
            calorie: list[i].calorie
          }
          newlist.push(obj)
        }
        for (let i = 0; i < newlist.length; i++) {
          if (newlist[i].date == this.data.date) {
            this.setData({
              reduceKcal: newlist[i].calorie
            })
          }
        }
      }
    })
    this.getFood()
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