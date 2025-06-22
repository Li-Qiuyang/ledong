import * as THREE from '../../libs/three.weapp.js'
import loadObj from './loadObj'
function changeTwoDecimal(x) {
  var f_x = parseFloat(x);
  if (isNaN(f_x)) {
    return false;
  }
  f_x = Math.round(f_x * 100) / 100;

  return f_x;
}
var app = getApp();
Page({
  data: {
    step: "",
    sex: "",
    cavansWidth: 172,
    cavansHeight: 300,
    energy: 0,
    MET: {
      bodybuildingexercise: 3.5,
      dance: 7.8,
      pilates: 3,
      ropeskipping: 11.8,
      run: 7,
      warmup: 2.3,
      yoga: 4
    },
    title: "",
    src: "",
    sport: [
      { id: 1, title: "户外跑步", src: "../../icon/sports/run.png", name: "run" },
      { id: 2, title: "户外骑行", src: "../../icon/sports/ride.png", name: "ride" },
      { id: 3, title: "瑜伽练习", src: "../../icon/sports/yoga.png", name: "yoga" },
      { id: 4, title: "跳舞", src: "../../icon/sports/dance.png", name: "dance" },
      { id: 5, title: "塑形训练", src: "../../icon/sports/bodybuildingexercise.png", name: "bodybuildingexercise" },
      { id: 6, title: "普拉提", src: "../../icon/sports/yoga.png", name: "pilates" },
      { id: 7, title: "跳绳训练", src: "../../icon/sports/ropeskipping.png", name: "ropeskipping" },
    ],
    water: 0
  },
  water(e) {
    wx.navigateTo({
      url: '../water/water?now=' + this.data.now + '&index=' + this.data.index + '&all=' + this.data.all + '&index1=' + this.data.index1,
    })
  },
  mySport(e) {
    wx.navigateTo({
      url: '../mysport/mysport',
    })
  },
  left: function () {
    wx.switchTab({
      url: '../my/my',
    })
  },
  onShow(e) {
    this.onLoad()
  },
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'http://8.146.199.110:3000/users/userlogin',
      method: 'POST',
      data: {
        userid: app.globalData.id
      },
      success: res => {
        let user = res.data.user[0];
        console.log(user)
        let height1 = user.height;
        let weight1 = user.weight;
        let BMI = weight1 / (height1 * 0.01 * height1 * 0.01);
        let sex1 = user.sex;
        this.setData({
          head: app.globalData.head,
          height: height1,
          weight: weight1,
          BMI: BMI.toFixed(2),
          sex: sex1
        })
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/collect/getpraticetime',
      method: 'post',
      data: {
        userId: app.globalData.id,
      },
      success: res => {
        console.log(res.data.data)
        let list = res.data.data;
        let newList = [];
        let energy = 0;
        for (let i = 0; i < list.length; i++) {
          if (list[i].date == new Date().toLocaleDateString()) {
            newList.push(list[i])
          }
        }
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type == "yoga") {
            energy += this.data.MET.yoga * list[j].time / 60 * 1.05 * this.data.weight
          }
          else if (newList[j].type == "bodybuildingexercise") {
            energy += this.data.MET.bodybuildingexercise * list[j].time / 60 * 1.05 * this.data.weight
          }
          else if (newList[j].type == "dance") {
            energy += this.data.MET.dance * list[j].time / 60 * 1.05 * this.data.weight
          }
          else if (newList[j].type == "pilates") {
            energy += this.data.MET.pilates * list[j].time / 60 * 1.05 * this.data.weight
          }
          else if (newList[j].type == "ropeskipping") {
            energy += this.data.MET.ropeskipping * list[j].time / 60 * 1.05 * this.data.weight
          }
          else if (newList[j].type == "run") {
            energy += this.data.MET.run * list[j].time / 60 * 1.05 * this.data.weight
          }
          else if (newList[j].type == "warmup") {
            energy += this.data.MET.warmup * list[j].time / 60 * 1.05 * this.data.weight
          }
        }
        console.log(newList)
        let index = newList.length - 1;
        let src = "";
        let title = "";
        for (let a = 0; a < this.data.sport.length; a++) {
          if (this.data.sport[a].name == newList[index].type) {
            src = this.data.sport[a].src;
            title = this.data.sport[a].title;
          }
        }
        this.setData({
          title: title,
          src: src,
          energy: energy.toFixed(1)
        })
      }
    })
    if (JSON.stringify(options) != "{}") {
      this.setData({
        now: options.now,
        index: options.index,
        water: options.now * options.index,
        all: options.all,
        index1: options.index1
      })
    }
    wx.login({
      success: (res) => {
        let code = res.code
        wx.request({
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxd871b2310a27821d&secret=2c3c58b000854e625211819127fa43d7&js_code=${code}&grant_type=authorization_code`,
          success: (res) => {
            this.setData({
              id: res.data.openid
            })
            console.log(res.data)
            wx.getWeRunData({
              success(result) {
                // // 拿 encryptedData 到开发者后台解密开放数据
                // const encryptedData = res.encryptedData
                // // 或拿 cloudID 通过云调用直接获取开放数据
                // const cloudID = res.cloudID
                // console.log(res)
                var data = {
                  session_key: result.session_key,
                  iv: result.iv,
                  encryptedData: result.encryptedData
                }
                let appid = "wxd871b2310a27821d";
                // var pc = new WXBizDataCrypt(appid, result.session_key)
                // var data = pc.decryptData(result.encryptedData, result.iv)
                // console.log('解密后 data: ', data)

                wx.cloud.callFunction({
                  name: "getRun",
                  data: {
                    weRunData: wx.cloud.CloudID(result.cloudID),
                  }
                }).then(res => {
                  console.log(res.result.event.weRunData.data.stepInfoList[30].step)
                  that.setData({
                    step: res.result.event.weRunData.data.stepInfoList[30].step
                  })
                }).catch(err => {
                  console.error(err)
                })
              }
            })
          }
        })
      }
    })
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = new THREE.global.registerCanvas(res[0].node);
        const sex = this.data.sex;
        loadObj(canvas, THREE, sex)
      })
  },
  onUnload: function () {
    THREE.global.clearCanvas()
  },
  touchStart(e) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(e) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  },
  touchEnd(e) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
  },
  touchCancel(e) {
    // console.log('canvas', e)
  },
  longTap(e) {
    // console.log('canvas', e)
  },
  tap(e) {
    // console.log('canvas', e)
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

    let that = this
    let height = app.globalData.height.split('c')[0]
    let BMI = changeTwoDecimal(weight / (height * 0.01 * height * 0.01))
    let text = ''
    if (BMI < 18) {
      text = '偏瘦'
    } else if (BMI >= 24) {
      text = '偏胖'
    } else {
      text = '正常'
    }
    this.setData({
      weight:weight,
      BMI: BMI,
      text: text
    })
    this.hideModal2()
    let obj = {
      username: app.globalData.name,
      avatar: app.globalData.head,
      region: app.globalData.region,
      date: app.globalData.date,
      signature: app.globalData.signature,
      sex: app.globalData.sex,
      height: app.globalData.height,
      fan: null,
      concern: null,
      userid: app.globalData.id,
      weight: this.data.weight + 'kg',

    }
    console.log(obj)
    wx.request({
      url: 'http://8.146.199.110:3000/users/userupdate',
      method: 'post',
      data: {
        username: app.globalData.name,
        avatar: app.globalData.head,
        region: app.globalData.region,
        date: app.globalData.date,
        signature: app.globalData.signature,
        sex: app.globalData.sex,
        height: app.globalData.height,
        fan: null,
        concern: null,
        userid: app.globalData.id,
        weight: this.data.weight,

      },
      success: res => {
        console.log(res)
        wx.request({
          url: 'http://8.146.199.110:3000/users/userlogin',
          method: 'POST',
          data: {
            userid: app.globalData.id
          },
          success: res => {
            // 存在并且没有被注销的账号
            console.log(res)
            if (res.data.status != "user is undefined") {
              let user = res.data.user[0];
              console.log(res.data.user[0])
              app.globalData.weight = user.weight;
              let weight = user.weight
              weight = weight.split('k')[0] / 2
              console.log(weight)
              if (weight % 1 === 0) {
                weight = weight + '.0'
              }
              that.setData({
                weight: user.weight
              })
            }
          }
        })
      }
    })
  },
  confirm(e) {
    let height = this.selectComponent('#ctrlmill1').data.number

    let weight = app.globalData.weight.split('k')[0]
    console.log(weight)
    console.log(height*0.01)
    let BMI = changeTwoDecimal(weight / (height * 0.01 * height * 0.01))
    this.setData({
      height:height,
      BMI: BMI,
    })
    this.hideModal()
    let that=this
    let obj = {
      username: app.globalData.name,
      avatar: app.globalData.head,
      region: app.globalData.region,
      date: app.globalData.date,
      signature: app.globalData.signature,
      sex: app.globalData.sex,
      height: this.data.height,
      fan: null,
      concern: null,
      userid: app.globalData.id,
      weight: app.globalData.weight,
    }
    console.log(obj)
    wx.request({
      url: 'http://8.146.199.110:3000/users/userupdate',
      method: 'post',
      data: {
        username: app.globalData.name,
        avatar: app.globalData.head,
        region: app.globalData.region,
        date: app.globalData.date,
        signature: app.globalData.signature,
        sex: app.globalData.sex,
        height: this.data.height,
        fan: null,
        concern: null,
        userid: app.globalData.id,
        weight: app.globalData.weight,

      },
      success: res => {
        console.log(res)
        wx.request({
          url: 'http://8.146.199.110:3000/users/userlogin',
          method: 'POST',
          data: {
            userid: app.globalData.id
          },
          success: res => {
            // 存在并且没有被注销的账号
            console.log(res)
            if (res.data.status != "user is undefined") {
              let user = res.data.user[0];
              console.log(res.data.user[0])
              app.globalData.weight = user.weight;
              let weight = user.weight
              weight = weight.split('k')[0] / 2
              if (weight % 1 === 0) {
                weight = weight + '.0'
              }
            }
          }
        })
      }
    })
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
})
