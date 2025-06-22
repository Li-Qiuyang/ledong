Component({
  properties: {
    // 显示开关
    isShow: { type: Boolean, value: false },
    // 设置返回单位（true：身高单位保留3位小数点）（false：体重单位保留1位小数点）
    isWeight: { type: Boolean, value: false },
    // 当前指数
    num: {
      type: Number, value: 0, observer: function () {
        this.init()
      }
    },
    // 最短指数
    startNum: { type: Number, value: 0 },
    // 最长指数
    endNum: { type: Number, value: 200 },
  },

  data: {
    type: '',
    scrollWidth: 0,
    scrollLeft: 0,
    isEditVal: false,
    currval: 0
  },

  methods: {
    // 初始化
    init() {
      let { num } = this.data
      this.setData({ displayNum: num })
      if (num) {
        if (this.data.scrollWidth) {
          // 手动修改修改指数位置
          this.setNum()
        } else {
          // 初始化修改指数位置
          this.setData({ type: 'init', scrollLeft: 1 })
        }
      } else {
        this.setData({ scrollLeft: 0 })
      }
    },

    // (初始化/手动修改) 修改指数位置
    setNum() {
      console.log('原始数据：', this.data.num)
      // 当前指数
      let { num } = this.data
      // 只保留一位小数
      num = Math.floor(num * 10) / 10
      console.log('num', num)
      // 总宽度
      let { scrollWidth, startNum, endNum } = this.data
      // 10 / 20 * 100 == 50%
      // 50% / 100 * 20 == 10
      // 前后宽总值
      let restValue = 20
      // 实际总值
      let value = endNum - startNum
      // 得出前后宽占总宽的百分比 [+1以勉误差]
      let restPercent = ((restValue + 1) / (restValue + value) * 100)
      // 实际宽度 = (总宽度 - 前后宽度)
      let width = scrollWidth - (restPercent / 100 * scrollWidth)
      // 得出百分比
      let percent = (num - startNum) / value * 100
      // 得出x距离[+1以勉误差]
      let scrollLeft = (percent / 100 * width) + 1
      this.data.isEditVal = true
      this.setData({ type: '', scrollLeft: scrollLeft, currval: num })
    },

    // 监听滚动
    bindscroll(e) {
      let { type, startNum, endNum, isWeight } = this.data
      let { scrollLeft, scrollWidth } = e.detail
      if (type == 'init') {
        this.data.scrollWidth = scrollWidth
        this.setNum()
      } else {
        // 前后宽总值
        let restValue = 20
        // 实际总值
        let value = endNum - startNum
        // 得出前后宽占总宽的百分比 [+1以勉误差]
        let restPercent = ((restValue + 1) / (restValue + value) * 100)
        // 实际宽度 = (总宽度 - 前后宽度)
        let width = scrollWidth - (restPercent / 100 * scrollWidth)
        // 当前进度百分比
        let percent = scrollLeft / width * 100
        // 得出当前百分比对应的值
        let val1 = (startNum + (percent / 100 * value)).toFixed(1)
        let list = val1.split('.')
        let decimals = (list[1] >= 5) ? '.5' : '.0'
        val1 = list[0] + decimals
        // 保留3位小数点
        let val2 = (startNum + (percent / 100 * value)).toFixed(1)

        if (this.data.isEditVal) {
          val2 = this.data.displayNum
          this.data.isEditVal = false
        } else
          val2 = val2 > value ? value + '.000' : val2
        // console.log({
        //   scrollLeft: '当前x距离' + scrollLeft,
        //   scrollWidth: '总宽度' + scrollWidth,
        //   restPercent: '前后宽占总宽的百分比' + restPercent,
        //   width: '实际宽度' + width,
        //   percent: '当前进度百分比' + percent,
        //   val1: '对应的值' + val1
        // })
        let res = isWeight ? val2 : val1
        if (res >= endNum) {
          res = endNum
        }
        this.setData({ currval: res })
        this.triggerEvent('getNum', res);
      }
    },

  },
})
