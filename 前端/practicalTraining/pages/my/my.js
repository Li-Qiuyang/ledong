// pages/my/my.js
var app = getApp();
let arr = []

function changeTwoDecimal(x) {
  var f_x = parseFloat(x);
  if (isNaN(f_x)) {
    alert('function:changeTwoDecimal->parameter error');
    return false;
  }
  f_x = Math.round(f_x * 100) / 100;

  return f_x;
}
Page({
  login: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    setNum: 0,
    getNum: 0,
    date: new Date().toISOString().substring(0, 10),
    recordnum1: 0,
    recordnum2: 0,
    hasUserInfo: app.globalData.hasUserInfo,
    signature: app.globalData.signature,
    head: app.globalData.head,
    name: app.globalData.name,
    mood: false,
    src: "",
    text: "",
    id: ""
  },
  cancel(e) {
    this.hideModal()
  },
  confirm(e) {
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
      weight: weight,
      BMI: BMI,
      text: text
    })
    this.hideModal()
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
      weight: this.data.weight,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.id)
    if(app.globalData.head){
      wx.request({
        url: 'http://8.146.199.110:3000/users/userlogin',
        method: 'POST',
        data: {
          userid: app.globalData.id
        },
        success: res => {
          // 存在并且没有被注销的账号
          console.log(res.data.user[0])
          app.globalData.weight=res.data.user[0].weight
          app.globalData.height=res.data.user[0].height
          let height = app.globalData.height.split('c')[0]
          let BMI = changeTwoDecimal(app.globalData.weight / (height * 0.01 * height * 0.01))
          let text = ''
          if (BMI < 18) {
            text = '偏瘦'
          } else if (BMI >= 24) {
            text = '偏胖'
          } else {
            text = '正常'
          }
          this.setData({
            msgNum: res.data.user[0].msgNum,
            weight:res.data.user[0].weight,      
            BMI: BMI,
            text: text
          })
        }
      })
    
    this.setData({
      name: app.globalData.name,
      head: app.globalData.head,
      hasUserInfo: app.globalData.hasUserInfo,
      signature: app.globalData.signature,
      src: app.globalData.src,
      word: app.globalData.word,
      mood: app.globalData.mood,
      time: app.globalData.time1,
    })
    wx.request({
      url: 'http://8.146.199.110:3000/collect/getpraticetime',
      method: 'post',
      data: {
        userId: app.globalData.id,
      },
      success: res => {
        console.log(res.data)
        let list = res.data.data
        let time = 0
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
          if (list[i].date == this.data.date) {
            time += Math.ceil(list[i].time)
          }
        }
        console.log(time)
        let alltime = 0
        for (let i = 0; i < res.data.data.length; i++) {
          // / console.log(res.data.data[i])
          alltime += parseInt(res.data.data[i].time)
        }
        app.globalData.time1 = alltime
        console.log(time)
        this.setData({
          time: alltime,
          todaytime: time
        })
      }
    })
    }
  },
  feedback(e) {
    if (app.globalData.head == "") {
      wx.showToast({
        title: "请先登录/注册",
        icon: "error",
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../feedback/feedback',
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  getMsg() {
    wx.request({
      url: 'http://8.146.199.110:3000/users/getlike',
      method: 'POST',
      data: {
        userId: app.globalData.id
      },
      success: res => {
        arr = []
        res.data.map(item => {
          if (item.data.user2Id != app.globalData.id) {
            item.infor = '点赞了这条动态'
            arr.push(item)
          }
        })
        console.log(arr.length)
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/users/getforward',
      method: 'POST',
      data: {
        userId: app.globalData.id
      },
      success: res => {
        let forward = res.data
        let user = []
        wx.request({
          url: 'http://8.146.199.110:3000/users/userlogin',
          method: 'POST',
          data: {
            userid: app.globalData.id
          },
          success: res => {
            user = res.data.user
            forward.map(item => {
              item.infor = '收藏了这条动态'
              item.user2 = item.user
              item.user = user
              arr.push(item)
            })
          }
        })
      }
    })
    wx.request({
      url: 'http://8.146.199.110:3000/users/getcomment',
      method: 'POST',
      data: {
        userId: app.globalData.id
      },
      success: res => {
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].user2Id != app.globalData.id) {
            res.data[i].data.infor = '评论了:' + res.data[i].data.discussContent
            arr.push(res.data[i])
          }
        }
        console.log(arr)
        var t = 0;
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length; j++) {
            if (Date.parse(new Date(arr[i].data.time)) > Date.parse(new Date(arr[j].data.time))) {
              t = arr[i]
              arr[i] = arr[j]
              arr[j] = t
            }
          }
        }
        console.log(arr.length)
      }
    })
  },
  getNum(e) {
    console.log('e', e.detail)
    this.setData({
      getNum: e.detail
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      name: app.globalData.name,
      head: app.globalData.head,
      hasUserInfo: app.globalData.hasUserInfo,
      signature: app.globalData.signature
    })
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

  },
  pointing() {
    wx.navigateTo({
      url: '../homepage/homepage',
    })
  },
  mood() {
    wx.navigateTo({
      url: '../mood/mood',
    })
  },
  wish() {
    wx.navigateTo({
      url: '../wish/wish',
    })
  },
  myCollect() {
    if (app.globalData.head == "") {
      wx.showToast({
        title: "请先登录",
        icon: "error",
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../myCollect/myCollect',
      })
    }
  },
  sport: function (e) {
    wx.navigateTo({
      url: '../mysport/mysport',
    })
  },
  chooseWeight: function (e) {
    this.showModal()
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
      showModalStatus: true
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
  set() {
    if (app.globalData.head == "") {
      wx.showToast({
        title: "请先登录/注册",
        icon: "error",
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../setting/setting',
      })
    }
  },
  msg() {
    if (app.globalData.head == "") {
      wx.showToast({
        title: "请先登录/注册",
        icon: "error",
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../msg/msg',
      })
    }
  },
  information() {
    if (app.globalData.head == "") {
      wx.showToast({
        title: "请先登录/注册",
        icon: "error",
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../obj/index',
      })
    }
  },
  aboutUs(e) {
    if (app.globalData.head == "") {
      wx.showToast({
        title: "请先登录/注册",
        icon: "error",
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../aboutUs/aboutUs',
      })
    }
  },
  record(e) {
    if (app.globalData.head == "") {
      wx.showToast({
        title: "请先登录/注册",
        icon: "error",
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../record/record',
      })
    }
  },
  login1() {
    wx.login({
      success: (res) => {
        let code = res.code
        wx.request({
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxd871b2310a27821d&secret=2c3c58b000854e625211819127fa43d7&js_code=${code}&grant_type=authorization_code`,
          success: (res) => {
            this.setData({
              id: res.data.openid
            })
            wx.request({
              url: 'http://8.146.199.110:3000/users/userlogin',
              method: 'POST',
              data: {
                userid: this.data.id
              },
              success: res => {
                // 存在并且没有被注销的账号
                console.log(res.data.user[0].msgNum)
                this.setData({
                  msgNum: res.data.user[0].msgNum
                })
                if (res.data.status != "user is undefined") {
                  let user = res.data.user[0];
                  console.log(res.data.user[0])
                  app.globalData.id = user.userid;
                  app.globalData.head = user.avatar;
                  app.globalData.name = user.username;
                  app.globalData.sex = user.sex;
                  app.globalData.date = user.date;
                  app.globalData.height = user.height;
                  app.globalData.region = user.region;
                  app.globalData.signature = user.signature || "你还没有个性签名哦~";
                  app.globalData.hasUserInfo = true;
                  let weight = user.weight
                  weight = weight.split('k')[0]
                  console.log(weight)
                  if (weight % 1 === 0) {
                    weight = weight + '.0'
                  }
                  console.log(weight)
                  app.globalData.weight = weight;
                  wx.request({
                    url: 'http://8.146.199.110:3000/collect/getpraticetime',
                    method: 'post',
                    data: {
                      userId: app.globalData.id,
                    },
                    success: res => {
                      // console.log(res.data)
                      let time = 0
                      for (let i = 0; i < res.data.data.length; i++) {
                        // console.log(res.data.data[i])
                        time += parseInt(res.data.data[i].time)
                      }
                      app.globalData.time1 = time
                      console.log(time)
                      this.setData({
                        time: time
                      })
                      this.onLoad()
                    }
                  })
                  this.setData({
                    name: app.globalData.name,
                    head: app.globalData.head,
                    hasUserInfo: app.globalData.hasUserInfo,
                    signature: app.globalData.signature,
                    weight: weight
                  })
                  wx.showToast({
                    title: "登录成功！",
                    icon: "success",
                    duration: 2000
                  })
                  this.getMsg()
                  // 被注销的账号需要先注册
                } else {
                  wx.showToast({
                    title: "请先注册！",
                    icon: "error",
                    duration: 2000
                  })
                }
              },
              // 不存在的账号
              fail: err => {
                wx.showToast({
                  title: "请先注册！",
                  icon: "error",
                  duration: 2000
                })
              }
            })
          }
        })
      }
    })
  }
})