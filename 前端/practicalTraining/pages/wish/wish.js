const app = getApp();
var bulletChatList = [];
var id = 0;
var cycle = null; //计时器
var topArray = [10, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300]; //用来做随机top值
var usedTop = [];

Page({
  data: {
    bulletChatData: [],
    messageList: [],

  },
  onLoad: function (e) {
    wx.request({
      url: 'http://8.146.199.110:3000/wish/getwish',
      method: 'get',
      success: res => {
        let list = []
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          list.push({
            text: res.data[i].name,
            avatar: res.data[i].user[0].avatar
          })
        }
        this.setData({
          messageList: list,
        })
        var _this = this;
        cycle = setInterval(function () {
          let arr = _this.data.messageList
          if (arr[id] == undefined) {
            id = 0;
            // 2.无限循环弹幕
            var obj = {};
            obj.text = arr[id].text;
            obj.avatar = arr[id].avatar;
            var num = Math.floor(Math.random() * topArray.length);
            obj.top = topArray[num]; //拿到随机值 Math.ceil向上取整
            // 被使用了，从原数组删掉并添加到已使用的数组里
            usedTop.push(topArray[num]);
            topArray.splice(num, 1);
            obj.color = _this.getRandomColor();
            bulletChatList.push(obj);
            _this.setData({
              bulletChatData: bulletChatList
            })
            id++;
          } else {
            var obj = {};
            obj.text = arr[id].text;
            obj.avatar = arr[id].avatar;
            var num = Math.floor(Math.random() * topArray.length);
            obj.top = topArray[num]; //拿到随机值 
            // 被使用了，从原数组删掉并添加到已使用的数组里
            usedTop.push(topArray[num]);
            topArray.splice(num, 1);
            obj.color = _this.getRandomColor();
            bulletChatList.push(obj);
            _this.setData({
              bulletChatData: bulletChatList
            })
            id++;
          }
          if (usedTop.length > 5) {
            // 从已使用的数组删掉并添加到原数组里
            topArray.push(usedTop.shift());
          }
        }, 1000)
      }
    })
  },
  onShow: function () {
    this.onLoad()
  },
  getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  },
  onHide() {
    clearInterval(cycle)
    id = 0;
    bulletChatList = []
  },

  getValue(e) {
    this.setData({
      title: e.detail.value
    })
  },
  send(e) {
    wx.request({
      url: 'http://8.146.199.110:3000/wish/uploadwish',
      data: {
        wishName: this.data.title,
        userId: app.globalData.id
      },
      method: 'post',
      success: res => {
        console.log(res)
        this.onLoad()
      }
    })
  },
  mywish() {
    wx.navigateTo({
      url: '../mywish/mywish',
    })
  },
  left() {
    wx.navigateBack({
      delta: 1,
    })
  }

});