Page({
  data: {
    courseList: [],
    // 轮播图
    imgUrls: [{
      link: '../course/course',
      url: '../../images/sport-banner/lALPKHQpUxvtQ6HNAX_NA4Q_900_383.png_720x720q90g.jpg'
    },
    {
      link: '../wish/wish',
      url: '../../images/sport-banner/wish.png'
    },
    {
      link: '../course/course',
      url: '../../images/sport-banner/lALPKG0OVdJgQ5vNAX_NA4Q_900_383.png_720x720q90g.jpg'
    },
    {
      link: '../course/course',
      url: '../../images/sport-banner/lALPKH7RzwpAw5jNAX_NA4Q_900_383.png_720x720q90g.jpg'
    },
    {
      link: '../course/course',
      url: '../../images/sport-banner/lALPJxDj2r5jQ6bNAX_NA4Q_900_383.png_720x720q90g.jpg'
    }
    ],
    slideWidth: '', //滑块宽
    slideLeft: 0, //滑块位置
    totalLength: '', //当前滚动列表总长
    slideShow: false, //滑块是否显示
    slideRatio: '', //滑块比例
    dataList: [
      {
        text: '跑步',
        src: '../../icon/sport/run.png',
        link: '../startRun/startRun?type=run'
      },
      {
        text: '骑行',
        src: '../../icon/sport/bike.png',
        link: '../startRun/startRun?type=ride'
      },
      {
        text: '瑜伽',
        src: '../../icon/sport/yoga.png',
        link: '../yoga/yoga'
      },
      {
        text: '跳绳',
        src: '../../icon/sport/jump.png',
        link: '../skip/skip'
      },
      {
        text: '塑形训练',
        src: '../../icon/sport/sport.png',
        link: '../molding/molding'
      },
      {
        text: '我的运动',
        src: '../../icon/sport/my.png',
        link: '../mysport/mysport'
      },
      {
        text: '更多课程',
        src: '../../icon/sport/more.png',
        link: '../course/course'
      }
    ],
    autoplay: true, //是否自动轮播
    interval: 4000, //间隔时间
    duration: 2000, //滑动时间
  },
  searchtext: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  search: function (e) {
    let value = this.data.searchValue
    if (value == '跑步') {
      wx.navigateTo({
        url: '../startRun/startRun',
      })
    }
    else if (value == '课程') {
      wx.navigateTo({
        url: '../course/course',
      })
    }
    else if (value == '记录' || value == '我的运动') {
      wx.navigateTo({
        url: '../mysport/mysport',
      })
    }
  },
  onLoad: function () {
    wx.request({
      url: 'http://8.146.199.110:3000/data/getalldata',
      method: 'get',
      success: res => {
        let arr = []
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].isrecommend == 1) {
            arr.push(res.data[i])
          }
        }
        arr[0].imageUrl = '../../images/sport-course/yoga.webp'
        arr[0].text = '在动态中增强肌腱，在静态中塑造曲线'
        arr[1].imageUrl = '../../images/sport-course/warmup.webp'
        arr[1].text = '热身增强肌腱及运动的延展性，能够减少肌肉拉伤'
        arr[2].imageUrl = '../../images/sport-course/run.webp'
        arr[2].text = '跑步时要抬头挺胸，收紧腹部肌群'
        arr[3].imageUrl = '../../images/sport-course/jump.webp'
        arr[3].text = '跳绳是最简单的燃脂运动'
        arr[4].imageUrl = '../../images/sport-course/pulati.webp'
        arr[4].text = '普拉提通过深层肌肉的练习从而改善姿态'
        arr[5].imageUrl = '../../images/sport-course/dance.webp'
        arr[5].text = '超上头燃脂舞，新手友好轻松暴汗'
        arr[6].imageUrl = '../../images/sport-course/bodyexerise.webp'
        arr[6].text = '30分钟暴汗全身减脂操'
        for (let j = 0; j < arr.length; j++) {
          arr[j].id = 'demo' + j
        }
        this.setData({
          courseList: arr
        })
      }
    })
    var systemInfo = wx.getSystemInfoSync();
    this.setData({
      windowWidth: systemInfo.windowWidth,
    })
    this.getRatio()
  },
  getRatio: function () {
    if (this.data.dataList.length < 4) {
      this.setData({
        slideShow: false
      })
    } else {
      var _totalLength = this.data.dataList.length * 173; //分类列表总长度
      var _ratio = 80 / _totalLength * (750 / this.data.windowWidth); //滚动列表长度与滑条长度比例
      var _showLength = 750 / _totalLength * 80; //当前显示蓝色滑条的长度(保留两位小数)
      this.setData({
        slideWidth: _showLength,
        totalLength: _totalLength,
        slideShow: true,
        slideRatio: _ratio
      })
    }
  },
  //slideLeft动态变化
  getleft: function (e) {
    this.setData({
      slideLeft: e.detail.scrollLeft * this.data.slideRatio
    })
  },
  video: function (e) {
    if (e.currentTarget.dataset.datavalue.introduction) {
      wx.navigateTo({
        url: `../video/video?type=${e.currentTarget.dataset.datavalue.lessontype}&name=${e.currentTarget.dataset.datavalue.lessonfilename}&courseName=${e.currentTarget.dataset.datavalue.lessonname}&index=${e.currentTarget.dataset.datavalue.index}&lessonid=${e.currentTarget.dataset.datavalue.lessonid}&introduction=${e.currentTarget.dataset.datavalue.introduction}`,
      })

    } else {
      wx.navigateTo({
        url: `../video/video?type=${e.currentTarget.dataset.datavalue.lessontype}&name=${e.currentTarget.dataset.datavalue.lessonfilename}&courseName=${e.currentTarget.dataset.datavalue.lessonname}`,
      })
    }
  },
  course: function (e) {
    wx.navigateTo({
      url: '../course/course',
    })
  }
})