// components/milliliter-input/milliliter-input.js

/** 附带输入框的数字拨盘自定义组件，封装了milliliter自定义组件
 *  在引用页面使用 this.selectComponent() 获取组件对象，调用 number 可获取组件值
 *  careate by DH.tab
 *  2021/07/14
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /** 最大值 */
    max: { type: Number, value: 120 },
    /** 最小值 */
    min: { type: Number, value: 0 },
    /** 值 */
    value: { type: Number, value: 0 },
    /** 单位名称 */
    unitName: { type: String },
    /** 单位值 */
    unitVal: { type: String, value: '厘米' },
    /** 是否精确到3位小数 */
    float: { type: Boolean, value: false },
    /** 是否不可为空 */
    noEmpty: { type: Boolean, value: false },
  },

  /**
   * 组件的初始数据
   */
  data: {
    number: 0,
    isblur: true,
    first: true
  },

  attached() {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 数字拨盘值改变事件 */
    changeNumber(e) {
      if (this.data.first)
        this.setData({ first: false })
      else
        this.setData({ number: e.detail })
    },

    // 文本框获得焦点
    onNumberFocus(e) {
      this.setData({ isblur: false })
    },

    // 文本框输入事件
    onNumberInput(e) {
      let val = e.detail.value

      // 检查是否出现多个小数点
      let a = val.toString().indexOf('.'),
        b = val.toString().lastIndexOf('.'),
        res = '';

      if (a != b) {
        let t = val.toString().split('')
        t.splice(t.lastIndexOf('.'), 1)
        res = t.join('')
        this.setData({ number: res })
      }
    },

    // 文本框失去焦点
    onNumberBlur(e) {
      let val = e.detail.value

      // 检查输入值是否溢出上限或下限
      if (parseInt(val) > this.data.max)
        val = this.data.max
      if (parseInt(val) < this.data.min)
        val = this.data.min

      // 检查是否需要保留三位小数
      if (this.data.float) {
        let t = val.toString().split('.')
        if (t.length > 1 && t[1].length > 3)
          val = `${t[0]}.${t[1].substr(0, 3)}`
        this.setData({
          value: parseFloat(val),
          number: parseFloat(val)
        })
      } else {
        let tmp = val.toString().split('.')
        if (tmp.length > 1)
          this.setData({
            value: parseFloat(tmp[0] + '.' + tmp[1].substr(0, 1)),
            number: parseFloat(tmp[0] + '.' + tmp[1].substr(0, 1))
          })
        else
          this.setData({
            value: parseFloat(val),
            number: parseFloat(val)
          })
      }
      this.setData({ isblur: true })
    },
  }
})
