// pages/login/login.js
var app = getApp();
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    value: '',
    username: "",
    signature: "",
    fileID: 0
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl
    })
    let index = this.data.avatarUrl.lastIndexOf("\/");
    let name = this.data.avatarUrl.substring(index + 1, this.data.avatarUrl.length);
    // console.log(name)
    wx.cloud.uploadFile({
      //这里拼接的字符串也可以使用模板字面量
      //cloudPath: `img/${fileName}.png`, 
      cloudPath: `avatar/${name}`, // 上传至云端的路径
      filePath: this.data.avatarUrl, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        this.setData({
          fileID: res.fileID
        })
        console.log(this.data.fileID)
      },
      fail: console.error
    })
  },
  getNickname(e) {
    this.setData({
      username: e.detail.value
    })
  },
  getSignature(e) {
    this.setData({
      signature: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },
  submit() {
    if (this.data.avatarUrl == "" || this.data.username == "") {
      wx.showToast({
        title: "头像昵称不为空",
        icon: "error",
        duration: 2000
      })
    }
    else {
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
                  //已存在的账号 
                  if (res.data.status != "user is undefined") {
                    wx.showToast({
                      title: "请直接登录",
                      icon: "error",
                      duration: 2000
                    })
                    // 被注销过的账号
                  } else {
                    // 注册
                    wx.request({
                      url: 'http://8.146.199.110:3000/users/userregister',
                      method: 'POST',
                      data: {
                        username: this.data.username,
                        avatar: this.data.fileID,
                        signature: this.data.signature,
                        userid: this.data.id
                      },
                      success: res => {
                        app.globalData.hasUserInfo = true;
                        app.globalData.head = this.data.fileID;
                        app.globalData.name = this.data.username;
                        app.globalData.signature = this.data.signature || "你还没有个性签名哦~";
                        app.globalData.id = this.data.id;
                        wx.navigateTo({
                          url: '../statistics/statistics',
                        })
                        wx.showToast({
                          title: '注册成功',
                          icon: "success",
                          duration: 2000
                        })
                      },
                      fail: err => {
                        console.log(err)
                      }
                    })
                  }
                },
                // 第一次注册的账号
                fail: err => {
                  // 注册
                  wx.request({
                    url: 'http://8.146.199.110:3000/users/userregister',
                    method: 'POST',
                    data: {
                      username: this.data.username,
                      avatar: this.data.fileID,
                      signature: this.data.signature,
                      userid: this.data.id
                    },
                    success: res => {
                      app.globalData.head = this.data.fileID;
                      app.globalData.name = this.data.username;
                      app.globalData.signature = this.data.signature || "你还没有个性签名哦~";
                      app.globalData.id = this.data.id
                      app.globalData.hasUserInfo = true;
                      wx.navigateTo({
                        url: '../statistics/statistics',
                      })
                      wx.showToast({
                        title: '注册成功',
                        icon: "success",
                        duration: 2000
                      })
                    },
                    fail: err => {
                      console.log(err)
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  left: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  }
})