// pages/myCollect/myCollect.js
var app = getApp()
let menu = []
let arr = []
let k = 0;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fir: true,
        sec: false,
    },
    left: function (e) {
        wx.navigateBack({
            delta: 1,
        })
    },
    change1(e) {
        this.setData({
            fir: true,
            list:this.data.videoList
        })
        if (this.data.fir) {
            this.setData({
                sec: false
            })
        }
    },
    change2(e) {
        this.setData({
          sec: true,
          menuList:menu
        })
        if(this.data.fir){
          this.setData({
            fir: false
          })
        }
    },
    include:function(e){
      app.globalData.recipe = e.currentTarget.dataset.datavalue
      wx.navigateTo({
        url: '../foodRecipe/foodRecipe?isCollected='+'true'
      })
    },
    lesson:function(e){
      let isCollected = true
      wx.navigateTo({
        url: `../video/video?type=${e.currentTarget.dataset.datavalue.lessontype}&name=${e.currentTarget.dataset.datavalue.lessonfilename}&courseName=${e.currentTarget.dataset.datavalue.lessonname}&index=${e.currentTarget.dataset.datavalue.index}&lessonid=${e.currentTarget.dataset.datavalue.lessonid}&introduction=${e.currentTarget.dataset.datavalue.introduction}&isCollected=${isCollected}`,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.request({
          url: 'http://8.146.199.110:3000/collect/getlesson',
          method: 'post',
          data: {
            userid: app.globalData.id
          },
          success: res => {
            let lesson = res.data.collectlesson
            let list=[]
            for(let i=0;i<lesson.length;i++){
              let obj=lesson[i][0]
              list.push(obj)
            }
            list.map(item=>{
              item.pratice = 0
            })
            wx.request({
              url: 'http://8.146.199.110:3000/collect/getpraticetime',
              method: 'post',
              data: {
                  userId: app.globalData.id,
              },
              success: res => {
                list.map(item=>{
                  for(let i=0;i<res.data.data.length;i++){
                    if(res.data.data[i].lesson.length > 0){
                      if(item.lessonid == res.data.data[i].lesson[0].lessonid && res.data.data[i].date == new Date().toLocaleDateString()){
                        item.pratice = Math.ceil(Number(item.pratice) + Number(res.data.data[i].time))
                        item.judge = true
                      }
                    }
                  }
                })
                this.setData({
                  list:list
                })
              }
            })
          }
              
        })
        wx.request({
          url: 'http://8.146.199.110:3000/menu/getusermenu',
          method: 'post',
          data: {
            userid: app.globalData.id
          },
          success: res => {
            let arr = res.data
            wx.request({
              url:'http://8.146.199.110:3000/menu/getmenu',
              method:'GET',
              success:res => {
                menu = []
                for(let i=0;i<arr.length;i++){
                  for(let j=0;j<res.data.length;j++){
                    if(arr[i].menuid == res.data[j].menuId){
                      menu.push(res.data[j])
                    }
                  }
                }
              }
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