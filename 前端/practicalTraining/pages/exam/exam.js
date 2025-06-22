// pages/assessCondition/assessCondition.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    over: false,
    itemId: 1,
    goalId: 0,
    nowBodyId: 0,
    goalBodyId: 0,
    placeId: 0,
    stageId: 0,
    timeId: 0,
    problemId: 0,
    bodyProblemId: 0,
    sitId: 0,
    habbitId: 0,
    improveId: 0,
    goal: [
      { id: 1, src: "../../icon/assess/a1.png", title: "减肥塑形", info: "提升全身代谢水平，加速燃脂，重塑形体美" },
      { id: 2, src: "../../icon/assess/a4.png", title: "身体调理", info: "形神兼修，由内到外缓解身体紧张和不适" },
      { id: 3, src: "../../icon/assess/a2.png", title: "体态改善", info: "放松肌肉和关节，改善不良的体态" },
      { id: 4, src: "../../icon/assess/a3.png", title: "入门到进阶", info: "专注的瑜伽练习，精进瑜伽水平" },
    ],
    nowBody: [],
    goalBody: [],
    place: [
      { id: 1, src: "../../icon/body/b7.png", title: "上肢" },
      { id: 2, src: "../../icon/body/b8.png", title: "胸部" },
      { id: 3, src: "../../icon/body/b9.png", title: "腰腹" },
      { id: 4, src: "../../icon/body/b10.png", title: "臀腿" },
    ],
    stage: [
      { id: 1, src: "../../icon/assess/a5.png", title: "瑜伽新手", info: "对瑜伽有一些了解，运动基础较弱或没有" },
      { id: 2, src: "../../icon/assess/a6.png", title: "初级爱好者", info: "有一些瑜伽训练经验，但接触的不多" },
      { id: 3, src: "../../icon/assess/a7.png", title: "中级爱好者", info: "有瑜伽运动习惯，对瑜伽有一定的认识" },
      { id: 4, src: "../../icon/assess/a8.png", title: "瑜伽大师", info: "是瑜伽从业者或专家，想提高专业度" },
    ],
    time: [
      { id: 1, title: "0-20分钟" },
      { id: 2, title: "20分钟以上" }
    ],
    problem: [
      { id: 1, src: "../../icon/assess/a10.png", title: '有' },
      { id: 2, src: "../../icon/assess/a9.png", title: '没有' }
    ],
    sit: [
      { id: 1, src: "../../icon/assess/a10.png", title: '有' },
      { id: 2, src: "../../icon/assess/a9.png", title: '没有' }
    ],
    bodyProblem: [
      { id: 1, src: "../../icon/assess/b1.png", title: "肩颈不适" },
      { id: 2, src: "../../icon/assess/b2.png", title: "腰背疼痛" },
      { id: 3, src: "../../icon/assess/b3.png", title: "脊柱侧弯" },
      { id: 4, src: "../../icon/assess/b4.png", title: "身体疲劳" },
    ],
    improve: [
      { id: 1, src: "../../icon/assess/b5.png", title: "柔韧度" },
      { id: 2, src: "../../icon/assess/b6.png", title: "肌耐力" },
      { id: 3, src: "../../icon/assess/b7.png", title: "平衡力" },
      { id: 4, src: "../../icon/assess/b8.png", title: "综合技能" },
    ],
    habbit: [
      { id: 1, src: "../../icon/assess/a10.png", title: '有' },
      { id: 2, src: "../../icon/assess/a9.png", title: '没有' }
    ],
    sex: ""
  },
  choose1(e) {
    this.setData({
      goalId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      this.setData({
        itemId: 2
      })
    }, 1000)
  },
  choose2(e) {
    this.setData({
      nowBodyId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      this.setData({
        itemId: 3
      })
    }, 1000)
  },
  choose3(e) {
    this.setData({
      goalBodyId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      this.setData({
        itemId: 4
      })
    }, 1000)
  },
  choose4(e) {
    this.setData({
      placeId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      this.setData({
        itemId: 5
      })
    }, 1000)
  },
  choose5(e) {
    this.setData({
      stageId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      this.setData({
        itemId: 6
      })
    }, 1000)
  },
  choose6(e) {
    this.setData({
      timeId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      wx.showToast({
        title: "生成方案中",
        icon: "loading",
        duration: 4000
      })
    }, 1000)
    setTimeout(() => {
      wx.navigateTo({
        url: '../yoga/yoga?change=true',
      })
    }, 5000)
  },
  choose7(e) {
    this.setData({
      problemId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      this.setData({
        itemId: 3
      })
    }, 1000)
  },
  choose8(e) {
    this.setData({
      bodyProblemId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      this.setData({
        itemId: 4
      })
    }, 1000)
  },
  choose9(e) {
    this.setData({
      sitId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      this.setData({
        itemId: 3
      })
    }, 1000)
  },
  choose10(e) {
    this.setData({
      habbitId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      this.setData({
        itemId: 4
      })
    }, 1000)
  },
  choose11(e) {
    this.setData({
      improveId: e.currentTarget.dataset.info.id
    })
    setTimeout(() => {
      this.setData({
        itemId: 3
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let girl = [
      { id: 1, src: "../../icon/body/b1.jpg", title: '偏瘦' },
      { id: 2, src: "../../icon/body/b2.jpg", title: '匀称' },
      { id: 3, src: "../../icon/body/b3.jpg", title: '偏胖' },
    ];
    let boy = [
      { id: 1, src: "../../icon/body/b11.jpg", title: '偏瘦' },
      { id: 2, src: "../../icon/body/b22.jpg", title: '匀称' },
      { id: 3, src: "../../icon/body/b33.jpg", title: '偏胖' },
    ];
    let girl2 = [
      { id: 1, src: "../../icon/body/b4.jpg", title: '纤瘦紧致' },
      { id: 2, src: "../../icon/body/b5.jpg", title: '健美活力' },
      { id: 3, src: "../../icon/body/b6.jpg", title: '凹凸有致' },
    ];
    let boy2 = [
      { id: 1, src: "../../icon/body/b44.jpg", title: '健康匀称' },
      { id: 2, src: "../../icon/body/b55.jpg", title: '线条紧实' },
      { id: 3, src: "../../icon/body/b66.jpg", title: '肌肉饱满' },
    ]
    wx.request({
      url: 'http://8.146.199.110:3000/users/userlogin',
      method: 'POST',
      data: {
        userid: app.globalData.id
      },
      success: res => {
        this.setData({
          sex: res.data.user[0].sex
        })
        if (this.data.sex == "女") {
          this.setData({
            nowBody: girl,
            goalBody: girl2
          })
        } else {
          this.setData({
            nowBody: boy,
            goalBody: boy2
          })
        }
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

  },
  left(e) {
    wx.navigateBack({
      delta: 1,
    })
  }
})