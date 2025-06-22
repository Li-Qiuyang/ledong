// pages/publishMnuscript/publishManuscript.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    img: "",
    pics: [],
    current: "",
    urls: "",
    show: true,
    deleteImg: "../../icon/w1.png",
    hiddenmodalput: false,
    isAddress: false,
    subject: ['#我的减肥餐', '#记录汗水', '#如何暴瘦二十斤', '#如何调节情绪', '#运动就是坚持', '#运动健身', '#跑步', '#运动生活', '#今天很wow', '#营养健康'],
    modify: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.dynamic)
    if (app.globalData.dynamic.length != 0) {
      this.setData({
        title: app.globalData.dynamic[0].data.title,
        content: app.globalData.dynamic[0].data.content,
        pics: app.globalData.dynamic[0].imgs,
        modify: false
      })
      if (app.globalData.dynamic[0].data.address !== "undefined" && app.globalData.dynamic[0].data.address) {
        this.setData({
          isAddress: true,
          address: app.globalData.dynamic[0].data.address
        })
      } else {
        this.setData({
          isAddress: false
        })
      }
    }
  },
  getLocation: function () {
    this.setData({
      isAddress: true
    })
    let that = this
    wx.getLocation({
      success: function (res) {
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=',
          method: 'GET',
          data: {
            location: `${res.latitude},${res.longitude}`,
            key: 'EZNBZ-Q2RAI-KUIGN-UXXBV-KTF2Q-NFFSN'
          },
          success: (res) => {
            that.setData({
              address: res.data.result.address
            })
          }
        })
      }
    })
  },
  delete(e) {
    this.setData({
      isAddress: false,
      address: ""
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

  },
  left(e) {
    app.globalData.dynamic = []
    wx.navigateBack({
      delta: 1,
    })
  },
  getTitle(e) {
    this.setData({
      title: e.detail.value
    })
    console.log(e.detail.value)
  },
  getContent(e) {
    this.setData({
      content: e.detail.value
    })
    console.log(e.detail.value)
  },
  // 添加
  add() {
    var that = this;
    let pics = that.data.pics;
    console.log(pics)
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        let picss = []
        for (let i = 0; i < res.tempFiles.length; i++) {
          picss.push(res.tempFiles[i].tempFilePath)
        }

        if (picss.length > 9) {
          wx.showToast({
            title: "最多选9张图片",
            icon: "error",
            duration: 2000
          })
          picss = picss.filter((item, index) => {
            return index < 9
          })
          let newArr1 = [];
          for (let j = 0; j < picss.length; j++) {
            //得到每一个图片的地址
            let index = picss[j].lastIndexOf("\/");
            let name = picss[j].substring(index + 1, picss[j].length);
            wx.cloud.uploadFile({
              cloudPath: `img/${name}`, // 上传至云端的路径
              filePath: picss[j], // 每个图片的地址
              success: res => {
                pics.push(res.fileID)
                that.setData({
                  pics: pics,
                  show: false
                })
              },
              fail: console.error
            })
          }
        } else if (picss.length < 9) {
          let newArr1 = [];
          for (let j = 0; j < picss.length; j++) {
            //得到每一个图片的地址
            let index = picss[j].lastIndexOf("\/");
            let name = picss[j].substring(index + 1, picss[j].length);
            wx.cloud.uploadFile({
              cloudPath: `img/${name}`, // 上传至云端的路径
              filePath: picss[j], // 每个图片的地址
              success: res => {
                // newArr1.push(res.fileID)
                pics.push(res.fileID)
                that.setData({
                  pics: pics,
                  show: false
                })
              },
              fail: console.error
            })
          }
        } else if (picss.length == 9) {
          let newArr1 = [];
          for (let j = 0; j < picss.length; j++) {
            //得到每一个图片的地址
            let index = picss[j].lastIndexOf("\/");
            let name = picss[j].substring(index + 1, picss[j].length);
            wx.cloud.uploadFile({
              cloudPath: `img/${name}`, // 上传至云端的路径
              filePath: picss[j], // 每个图片的地址
              success: res => {
                pics.push(res.fileID)
                that.setData({
                  pics: pics,
                  show: false
                })
              },
              fail: console.error
            })
          }
        }
      }
    })
  },
  // 预览图片
  preview(e) {
    console.log(this.data.pics)
    let currentUrl = e.currentTarget.dataset.src;
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.pics // 需要预览的图片http链接列表
    })
  },
  // 删除
  deleteItem(e) {
    for (let i = 0; i < this.data.pics.length; i++) {
      let newArr = this.data.pics.filter(item => item != e.currentTarget.dataset.src)
      this.setData({
        pics: newArr
      })
    }
    console.log(this.data.pics.length)
    if (this.data.pics.length < 9) {
      this.setData({
        show: true
      })
    }
  },
  // 发布
  publish(e) {
    console.log(this.data.pics)
    if (!this.data.modify) {
      var value = {
        userId: app.globalData.id,
        time: new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0, 8),
        title: this.data.title,
        content: this.data.content,
        imgs: this.data.pics,
        postId: app.globalData.dynamic[0].data.postId,
        address: this.data.address
      }
      console.log(value)
      wx.request({
        url: 'http://8.146.199.110:3000/users/updatecontent',
        method: 'POST',
        data: value,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          console.log(res.data)
          app.globalData.dynamic = []
        }
      })
    } else {
      var value = {
        userId: app.globalData.id,
        time: new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0, 8),
        title: this.data.title,
        content: this.data.content,
        imgs: this.data.pics,
        address: this.data.address
      }
      console.log(value)
      wx.request({
        url: 'http://8.146.199.110:3000/users/uploadcontent',
        method: 'POST',
        data: value,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          console.log(res.data)
        }
      })
    }
    // app.globalData.square = true
    wx.navigateBack({
      url: '../square/square'
    })
    // app.globalData.value.push(value)
  },
  //点击我显示底部弹出框
  clickme: function () {
    console.log('1')
    this.showModal();
  },

  //显示对话框
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
  topics: function (e) {
    this.setData({
      content: this.data.content + e.currentTarget.dataset.topic
    })
    this.hideModal()
  }
})