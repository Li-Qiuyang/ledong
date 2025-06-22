// pages/molding/molding.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sure: false,
    preference: [
      { id: 1, title: "全身", src: "../../icon/num/num1.png", choose: true },
      { id: 2, title: "胸背", src: "../../icon/num/num2.png", choose: false },
      { id: 3, title: "上肢", src: "../../icon/num/num3.png", choose: false },
      { id: 4, title: "腰腹", src: "../../icon/num/num4.png", choose: false },
      { id: 5, title: "臀腿", src: "../../icon/num/num5.png", choose: false },
    ],
    list: [],
    course: [],
    video: [
      { id: 1, title: "全身", choose: true },
      { id: 2, title: "颈肩", choose: false },
      { id: 3, title: "手臂", choose: false },
      { id: 4, title: "胸部", choose: false },
      { id: 5, title: "背部", choose: false },
      { id: 6, title: "腰腹", choose: false },
      { id: 7, title: "臀部", choose: false },
      { id: 8, title: "腿部", choose: false },
    ],
    content: []
  },
  open(e){
    wx.navigateTo({
      url: `../video/video?type=${e.currentTarget.dataset.info.lessontype}&name=${e.currentTarget.dataset.info.lessonfilename}&courseName=${e.currentTarget.dataset.info.lessonname}&index=${e.currentTarget.dataset.info.index}&lessonid=${e.currentTarget.dataset.info.lessonid}&introduction=${e.currentTarget.dataset.info.introduction}`,
    })
  },
  choose2(e) {
    let item = e.currentTarget.dataset.info;
    let list = this.data.video;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == item.id) {
        list[i].choose = true;
      } else {
        list[i].choose = false;
      }
    }
    this.setData({
      video: list
    })
    wx.request({
      url: 'http://8.146.199.110:3000/data/getdata?type=bodybuildingexercise',
      method: 'GET',
      data: {},
      success: res => {
        if (item.id == 1) {
          this.setData({
            content: res.data
          })
        } else {
          let newContent = [];
          for (let i = item.id; i < res.data.length; i++) {
            newContent.push(res.data[i])
          }
          this.setData({
            content: newContent
          })
        }
      }
    })
  },
  choose1(e) {
    let item = e.currentTarget.dataset.info;
    let newOne = this.data.preference;
    for (let i = 0; i < newOne.length; i++) {
      if (item.id == newOne[i].id) {
        if (newOne[i].choose == true) {
          newOne[i].choose = false
        }
        else if (newOne[i].choose == false) {
          newOne[i].choose = true;
        }
      }
    }
    this.setData({
      list: newOne
    })
  },
  left(e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  submit(e) {
    this.setData({
      preference: this.data.list,
      sure: false
    })
    wx.request({
      url: 'http://8.146.199.110:3000/data/getdata?type=bodybuildingexercise',
      method: 'GET',
      data: {},
      success: res => {
        let num = 0;
        let course = [];
        for (let i = 0; i < this.data.preference.length; i++) {
          if (this.data.preference[i].choose == true) {
            num += 1;
          }
        }
        for (let j = 0; j < num; j++) {
          course.push(res.data[j])
        }
        this.setData({
          course: course
        })
      }
    })
  },
  cancle(e) {
    this.setData({
      sure: false
    })
  },
  change(e) {
    this.setData({
      list: this.data.preference,
      sure: true
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      list: this.data.preference
    })
    wx.request({
      url: 'http://8.146.199.110:3000/data/getdata?type=bodybuildingexercise',
      method: 'GET',
      data: {},
      success: res => {
        this.setData({
          content: res.data
        })
        let num = 0;
        let course = [];
        for (let i = 0; i < this.data.preference.length; i++) {
          if (this.data.preference[i].choose == true) {
            num += 1;
          }
        }
        for (let j = 0; j < num; j++) {
          course.push(res.data[j])
        }
        this.setData({
          course: course
        })
      }
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