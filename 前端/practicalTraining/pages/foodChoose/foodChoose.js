// pages/course/course.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        course:[],
        active: 0,
        currentTab: 0,
        food:[],
        content:'',
        hiddenmodalput:true,
        name:'',
        weight:'',
        keep:'',
        foodProtein:0,
        foodCarbohyrate:0,
        foodFat:0,
    },
    // 切换导航栏
    switchNav: function (e) {
        var page = this;
        var id = e.target.id;
        var food = []
        if(e.target.id != 0){
          this.data.all.map(item=>{
            if(item.type == e.target.id){
              food.push(item)
            }
          })
          console.log(food)
          this.setData({
            food:food
          })
        }else{
          this.setData({
            food:this.data.all
          })
        }
        if (this.data.currentTab == id) {
            return false;
        } else {
            page.setData({
                currentTab: id
            });
        }
        page.setData({
            active: id
        });
    },
    left: function (e) {
        wx.navigateBack({
            delta: 1,
        })
    },
    search:function(e){
      var food = []
      this.data.all.map(item=>{
        if(item.foodName.indexOf(this.data.content) != -1){
          food.push(item)
        }
      })
      this.setData({
        food:food
      })
    },
    content:function(e){
      this.setData({
        content:e.detail.value
      })
    },
    // plus:function(e){
    //   this.setData({
    //     hiddenmodalput:false,
    //     meal:e.currentTarget.dataset.datavalue
    //   })
    // },
    showModal: function () {
      // 显示遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
    },
    //隐藏对话框
    hideModal: function () {
      // 隐藏遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
      }.bind(this), 200)
    },
    chooseFood:function(e){
      var value = e.currentTarget.dataset.datavalue
      this.setData({
        hiddenmodalput:false,
        keep:value
      })
      this.showModal()
    },
    cancel:function(){
      this.setData({
        hiddenmodalput:true
      })
    },
    confirm:function(e){
      var pre = this.data.weight / 100
      var value = {
        userid:app.globalData.id,
        title:this.data.title,
        foodName:this.data.keep.foodName,
        foodSrc:this.data.keep.foodSrc,
        weight:this.data.weight,
        foodEnergy:(pre * this.data.keep.foodEnergy).toFixed(2),
        foodProtein:(pre * this.data.keep.foodProtein).toFixed(2),
        foodFat:(pre * this.data.keep.foodFat).toFixed(2),
        foodCarbohyrate:(pre * this.data.keep.foodCarbohyrate).toFixed(2),
        date:new Date().toISOString().substring(0, 10)
      }
      wx.request({
        url:'http://8.146.199.110:3000/food/uploaddayfood',
        method:'POST',
        data:value,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success:res => {
          console.log(res)
        }
      })
      this.hideModal()
    },
    weight:function(e){
      this.setData({
        weight:e.detail.value
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.setData({
        title:options.title
      })
      wx.request({
        url: 'http://8.146.199.110:3000/food/getfood',
        method:'get',
        success:res=>{
          this.setData({
            all:res.data,
            food:res.data
          })
        }
      })
    },
    cancel(e){
      this.hideModal()
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