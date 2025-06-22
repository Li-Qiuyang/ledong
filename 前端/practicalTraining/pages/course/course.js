// pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    arr: ['yoga','pilates', 'bodybuildingexercise', 'dance','ropeskipping','run','warmup'],
    active: 0,
    currentTab: 0,
    pageId: 0,
    isSearch:false
  },
  // 切换导航栏
  switchNav: function (e) {
    let page = this;
    let id = e.target.id;
    console.log(id)
    wx.request({
      url: 'http://8.146.199.110:3000/data/getdata?type=' + this.data.arr[id],
      method: 'get',
      success: res => {
        let list = res.data;
        console.log(list);
        console.log(list)
        this.setData({
          courseList: list
        })
      }
    })
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id,
        pageId: id
      });
    }
    page.setData({
      active: id
    });
  },
  video: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `../video/video?type=${e.currentTarget.dataset.type}&name=${e.currentTarget.dataset.name}&courseName=${e.currentTarget.dataset.coursename}&index=${e.currentTarget.dataset.index}&lessonid=${e.currentTarget.dataset.lessonid}&introduction=${e.currentTarget.dataset.introduction}`,
    })
  },
  left: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  addValue:function(e){
    console.log(e.detail.value)
    this.setData({
      value:e.detail.value
    })
  },
  search:function(e){
    wx.navigateTo({
      url: `../searchCourse/searchCourse?value=${this.data.value}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://8.146.199.110:3000/data/getdata?type=yoga',
      method: 'get',
      success: res => {
        console.log(res);
        let list = res.data;
        this.setData({
          courseList: list
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