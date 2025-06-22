// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: 'cloud1-0g7e9ie673d4125a',
      traceUser: true
    })
  },
  globalData: {
    hasUserInfo: false,
    name: "",
    signature: "你还没有个性签名哦~",
    head: "",
    src: "",
    word: "",
    home: "",
    birth: "",
    chosenSrc: "",
    man: "../../icon/man.png",
    woman: "../../icon/woman.png",
    id: 0,
    distance: 0.00,
    num: 0,
    start: 1,
    type: '',
    time: '00:00',
    point: [],
    markers: [],
    recipe: '',
    value: [],
    infor: [],
    skipNum: 0,
    square: false,
    height: "",
    weight: "",
    dynamic: [],
    homeId: ''
  }
})
