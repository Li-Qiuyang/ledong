// pages/myFriend/myFriend.js
const app = getApp()
let judge = false;
var allConcern = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    fans: true,
    ifSearch: false,
    ifConcerned:true,
    searchContent: []
  },
  fan(e) {
    this.setData({
      fans: true
    })
    this.getFan()
  },
  concern(e) {
    this.setData({
      fans: false
    })
    this.getConcern()
  },
  // 关注粉丝
  concernUser(e) {
    var value = {
      userId:e.currentTarget.dataset.info.data.fansId,
      fansId:app.globalData.id
    }
    wx.request({
      url:'http://8.146.199.110:3000/users/concern',
      method:'POST',
      data:value,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:res => {
        let arr = this.data.fans
        arr.map(item=>{
          if(item.data.fansId == e.currentTarget.dataset.info.data.fansId){
            item.ifConcern = true
          }
        })
        this.setData({
          fans:arr
        })
      }
    })
  },
  // 取消关注粉丝
  delUser(e) {
    let that = this;
    let index = e.target.dataset.info.id - 1;
    let newFan = this.data.fan;
    wx.showModal({
      content: '确定取消关注吗？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.request({
            url: 'http://8.146.199.110:3000/users/unconcern',//取消关注
            method: 'POST',
            data: {
              userId: e.currentTarget.dataset.info.data.fansId,
              fansId: app.globalData.id 
            },
            success: res => {
              let arr = that.data.fans
              arr.map(item=>{
                if(item.data.fansId == e.currentTarget.dataset.  info.data.fansId){
                  item.ifConcern = ''
                }
              })
              that.setData({
                fans:arr
              })
            }
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  // 关注其他用户关注的人
  conConcern(e){
    wx.request({
      url:'http://8.146.199.110:3000/users/concern',
      method:'POST',
      data:{
        userId:e.currentTarget.dataset.info.data.userId,
        fansId:app.globalData.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:res => {
        this.getConcern()
      }
    })
  },
  // 取消关注关注的人
  delConcern(e) {
    let that = this;
    wx.showModal({
      content: '确定取消关注吗？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.request({
            url: 'http://8.146.199.110:3000/users/unconcern',//取消关注
            method: 'POST',
            data: {
              userId: e.currentTarget.dataset.info.data.userId,
              fansId: app.globalData.id
            },
            success: res => {
              that.getConcern()
            }
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  searchtext(e) {
    this.setData({
      content: e.detail.value
    })
    if(e.detail.value.length == 0){
      this.getConcern()
    }
  },
  search(e) {
    let arr = []
    this.data.concern.map(item=>{
      if (item.concern[0].username.indexOf(this.data.content) != -1) {
        arr.push(item)
      }
    })
    this.setData({
      concern:arr
    })
  },
  getConcern:function(){
    wx.request({
      url: 'http://8.146.199.110:3000/users/getconcern',
      method: 'POST',
      data: {
        fansId: this.data.id
      },
      success: res => {
        let arr = res.data
        if(this.data.id == app.globalData.id){
          arr.map(item=>{
            item.ifConcerned = true
          })
          this.setData({
            concern:arr
          })
        }else{
          wx.request({
            url: 'http://8.146.199.110:3000/users/getconcern',
            method: 'POST',
            data: {
              fansId: app.globalData.id
            },
            success: res => {
              arr.map(item=>{
                for(let i=0;i<res.data.length;i++){
                  if(item.data.userId == res.data[i].data.userId){
                    item.ifConcerned = true
                  }else{
                    item.ifConcerned = false
                  }
                }
              })
              this.setData({
                concern:arr
              })
            }
          })
        }
      }
    })
  },
  getFan:function(){
    wx.request({
      url: 'http://8.146.199.110:3000/users/getfans',
      method: 'POST',
      data: {
        userId: this.data.id
      },
      success: res => {
        let arr = res.data
        if(this.data.id == app.globalData.id){
          arr.map(item=>{
            for(let i=0;i<this.data.concern.length;i++){
              if(item.data.fansId == this.data.concern[i].data.userId){
                item.ifConcern = true
              }
            }
          })
          this.setData({
            length:arr.length,
            fans:arr
          })
        }else{
          wx.request({
            url: 'http://8.146.199.110:3000/users/getconcern',
            method: 'POST',
            data: {
              userId: app.globalData.id
            },
            success: res => {
              arr.map(item=>{
                for(let i=0;i<res.data.length;i++){
                  if(item.data.fansId == res.data[i].data.fansId){
                    item.ifConcern = true
                  }
                }
              })
              this.setData({
                length:arr.length,
                fans:arr
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.fan == "yes") {
      this.setData({
        fans: true,
        id:options.id
      })
      this.getConcern()
      this.getFan()
    } else {
      this.setData({
        fans: false,
        id:options.id
      })
      this.getConcern()
    }
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
      delta: 1
    })
  }
})