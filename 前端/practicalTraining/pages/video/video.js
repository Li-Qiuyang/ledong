// pages/video/video.js
var app = getApp()
var index1, index2, index3, index4, index5 = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected: false,
  },
  // 添加日程
  addSchedule: function (e) {
    if(!this.data.isAdd){
      wx.request({
        url: 'http://8.146.199.110:3000/users/uploadschedule',
        method: 'post',
        data: {
          userId: app.globalData.id,
          name: this.data.name,
          date: new Date().toLocaleDateString(),
          isDone: 0
        },
        success: res => {
          console.log(res)
          this.setData({
            isAdd: true
          })
        }
      })
    }
  },
  collect: function (e) {
    if (this.data.isCollected) {
      wx.request({
        url: 'http://8.146.199.110:3000/collect/uncollectlesson',
        method: 'POST',
        data: {
          userid: app.globalData.id,
          lessonid: this.data.lessonid
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
        url: 'http://8.146.199.110:3000/collect/collectlesson',
        method: 'POST',
        data: {
          index: this.data.index,
          userid: app.globalData.id,
          lessonid: this.data.lessonid,
          lessontype: this.data.type
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
  left: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  videoTime: function (e) {
    this.setData({
      time: parseInt(e.detail.duration) + '秒'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    wx.request({
      url: 'http://8.146.199.110:3000/users/getschedule',
      method: 'post',
      data: {
        userId: app.globalData.id
      },
      success: res => {
        let list=res.data
        for(let i=0;i<list.length;i++){
          if(options.courseName==list[i].name){
            this.setData({
              isAdd:true
            })
          }
        }
      }
    })
    if (options.isCollected) {
      this.setData({
        isCollected: true
      })
    }
    if (options.introduction) {
      let that = this
      let arr = options.introduction.split('[')[1]
      let arr1 = arr.split(']')[0]
      let arr2 = arr1.split(",")
      let videolist = []
      arr2.map(item => {
        item.split("'")
        videolist.push(item.split("'")[1])
        item = item.split("'")[1]
      })
      videolist.map((item, index) => {
        if (item == '适用人群') {
          index1 = index
        } else if (item == '动作简述') {
          index2 = index
          that.setData({
            people: videolist.slice(index1 + 1, index2)
          })
        } else if (item == '作用') {
          index3 = index
          that.setData({
            steps: videolist.slice(index2 + 1, index3)
          })
        } else if (item == '器具推荐') {
          index4 = index
          that.setData({
            role: videolist.slice(index3 + 1, index4)
          })
        } else if (item == '图片') {
          index5 = index
          that.setData({
            appliance: videolist.slice(index4 + 1, index5)
          })
        }
      })
      if (index2 != 'undefined' && typeof (index3) == 'undefined') {
        that.setData({
          steps: videolist.slice(index2 + 1, videolist.length)
        })
      }
      if (typeof (index3) != 'undefined' && typeof (index4) == 'undefined') {
        that.setData({
          role: videolist.slice(index3 + 1, videolist.length)
        })
      }
      if (typeof (index4) != 'undefined' && typeof (index5) != 'undefined') {
        that.setData({
          pic: videolist.slice(index5 + 1, videolist.length)
        })
      }
    }

    this.setData({
      name: options.courseName,
      type: options.type,
      lessonid: options.lessonid,
      index: options.index,
      url: 'http://8.146.199.110:3000/video/' + options.type + '/' + options.name
    })
    console.log(this.data)
    wx.request({
      url: 'http://8.146.199.110:3000/collect/getlesson',
      method: 'post',
      data: {
        userid: app.globalData.id
      },
      success: res => {
        let lesson = res.data.collectlesson
        let list = []
        for (let i = 0; i < lesson.length; i++) {
          let obj = lesson[i][0]
          list.push(obj)
        }
        console.log(list)
        if (list) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].lessonid == options.lessonid) {
              this.setData({
                isCollected: true
              })
            }
          }
        }
      }
    })

  },
  videorequestFullScreen() {
    console.log(this.data)
    wx.navigateTo({
      url: `../videolearn/videolearn?url=${this.data.url}&type=${this.data.type}&name=${this.data.name}&videoId=${this.data.lessonid}`,
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      videoContext: wx.createVideoContext('Video')
    })
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

// people:['·压力过大渴望平静的人群','·养生需要和爱好的人群','·渴望摆脱某些坏习惯的人'],
//       steps:['1.以跪坐的姿态，跪立起身，让双手落在双肩的正下方，尽量五指张开。','2.让膝盖分开两个拳头，保持大小腿夹角九十度，可以回勾双脚的前脚掌。','3.稳定住之后去微弯手肘，避免手臂的超伸，缓慢的让右脚向后滑行，让右腿缓慢的向上抬起，与胯同高，同时回勾右脚的前脚掌。','4.稳定住身体，肚脐眼再次推向后背，让左臂向前去伸展，眼睛看向左手指尖，让肩膀尽力的向后去推送，在此停留五个呼吸。','5.停留五个呼吸之后，弯曲右膝，右膝收回左手臂收回，再次调整身体。','6.肚脐眼推向后背，左腿向后滑行，缓慢向上抬起，肚脐眼再次推向后背，让右手臂向前伸展，再次去感受身体纵向被拉长，再次停留五个呼吸。','7.曲左膝收回右手，让整个体式趋势平稳地走出来。'],
//       role:[],