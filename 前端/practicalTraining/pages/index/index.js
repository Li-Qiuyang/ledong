const app = getApp()

Page({
  data: {
    hideModal: true, 
    animationData: {}, 
  },
  onLoad: function () {
    setTimeout(() => {
      this.showModal()
    }, 1000)
  },
  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease', 
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn(); //调用显示动画
    }, 200)
  },
  start:function(){
    console.log('start')
    wx.switchTab({
      url: '../sport/sport',
    })
  },
  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  }
})