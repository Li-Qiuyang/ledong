// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    deleteImg: "../../icon/w1.png",
    choose: false,
    problem: [
      { id: 1, title: "播放", content: "声音画面异常、倍速、播放错误等", lists: ["卡顿/一直加载", "倍速", "黑屏/提示错误", "清晰度", "声音和画面异常", "其他"] },
      { id: 2, title: "登录", content: "登录、昵称头像、设备、个人信息保护等", lists: ["提示错误", "点击无响应", "个人信息保护", "实名认证问题", "账号异常", "其他"] },
      { id: 3, title: "社区广场", content: "广场、话题、圈儿", lists: ["圈儿", "帖子/评论", "广场", "话题"] },
      { id: 4, title: "建议", content: "", lists: ["建议"] },
      { id: 5, title: "内容", content: "搜索异常、更新延时、内容不适、信息错误", lists: ["精选内容推荐", "更新不及时", "内容搜索", "海报/文字错误", "视频缺集", "其他"] },
      { id: 6, title: "其他", content: "闪退、页面异常、广告、个人页、侵权等", lists: ["手机闪退/卡屏/死机", "广告", "个人中心设置问题", "页面显示异常", "侵权举报", "其他"] },
      { id: 7, title: "举报相关", content: "违规评论、辱骂、广告等", lists: [] },
    ],
    haveChosen: false,
    list: [],
    writing: "",
    submitContent: 1
  },
  button2(e) {
    this.setData({
      submitContent: 3
    })
  },
  button1(e) {
    wx.switchTab({
      url: '../my/my',
    })
  },
  submit() {
    setTimeout(() => {
      wx.showToast({
        title: "正在提交中",
        icon: "loading",
        duration: 3000
      })
    }, 1000)
    setTimeout(() => {
      this.setData({
        submitContent: 2
      })
    }, 5000)
  },
  getContent(e) {
    this.setData({
      writing: e.detail.value
    })
    console.log(this.data.writing)
  },
  back() {
    this.setData({
      choose: false
    })
  },
  select(e) {
    let list = this.data.problem;
    let index = e.currentTarget.dataset.id - 1;
    console.log(list[index]);
    this.setData({
      haveChosen: true,
      choose: false,
      list: list[index].lists
    })
  },
  classify() {
    this.setData({
      choose: true
    })
  },
  add() {
    var that = this;
    let pics = that.data.pics;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        for (let i = 0; i < res.tempFiles.length; i++) {
          pics.push(res.tempFiles[i].tempFilePath)
        }
        that.setData({
          pics: pics
        })
      }
    })
  },
  deleteItem(e) {
    for (let i = 0; i < this.data.pics.length; i++) {
      let newArr = this.data.pics.filter(item => item != e.currentTarget.dataset.src)
      this.setData({
        pics: newArr
      })
    }
  },
  preview(e) {
    console.log(this.data.pics)
    let currentUrl = e.currentTarget.dataset.src;
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.pics // 需要预览的图片http链接列表
    })
  },
  left(e) {
    wx.navigateBack({
      delta: 1,
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

  }
})