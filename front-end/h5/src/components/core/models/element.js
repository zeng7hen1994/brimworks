
const defaultProps = {
  top: 100,
  left: 100,
  width: 100,
  height: 40,
  zindex: 1,
  textAlign: 'center',
  color: '#000000',
  backgroundColor: '#ffffff',
  fontSize: 14
}

class Element {
  constructor (ele) {
    this.name = ele.name
    this.uuid = +new Date()
    this.editorConfig = ele.editorConfig || {}
    /**
     * 之前版本代码：https://github.com/ly525/luban-h5/blob/a7875cbc73c0d18bc2459985ca3ce1d4dc44f141/front-end/h5/src/components/core/models/element.js#L21
     * 1.之前的版本为：this.pluginProps = {}, 改为下面的版本
     * 是因为要支持[复制画布上的元素]，所以需要先使用 ele.pluginProps 进行初始化（也就是拷贝之前的元素的值）
     *
     * 2. 移除 this.init() 原因是：如果是 复制元素，则 init 会把 copy 的值重新覆盖为初始值，copy 无效
     */
    this.pluginProps = ele.pluginProps || this.getDefaultPluginProps()
    this.commonStyle = ele.commonStyle || this.getDefaultCommonStyle()
    this.events = []
  }

  getDefaultCommonStyle () {
    return { ...defaultProps }
  }

  getDefaultPluginProps () {
    // init prop of plugin
    const propConf = this.editorConfig.propsConfig
    const pluginProps = {}
    Object.keys(propConf).forEach(key => {
      // #6
      if (key === 'name') {
        console.warn('Please do not use {name} as plugin prop')
        return
      }
      pluginProps[key] = propConf[key].defaultPropValue
    })
    return pluginProps
  }

  getStyle (position = 'static') {
    const pluginProps = this.pluginProps
    const commonStyle = this.commonStyle
    let style = {
      top: `${pluginProps.top || commonStyle.top}px`,
      left: `${pluginProps.left || commonStyle.left}px`,
      width: `${pluginProps.width || commonStyle.width}px`,
      height: `${pluginProps.height || commonStyle.height}px`,
      fontSize: `${pluginProps.fontSize || commonStyle.fontSize}px`,
      color: pluginProps.color || commonStyle.color,
      // backgroundColor: pluginProps.backgroundColor || commonStyle.backgroundColor,
      textAlign: pluginProps.textAlign || commonStyle.textAlign,
      position
    }
    return style
  }

  getClass () {

  }

  getData () {

  }

  clone () {
    return new Element({
      name: this.name,
      editorConfig: this.editorConfig,
      pluginProps: JSON.parse(JSON.stringify(this.pluginProps)),
      commonStyle: {
        ...this.commonStyle,
        top: this.commonStyle.top + 20,
        left: this.commonStyle.left + 20
      }
    })
  }
}

export default Element
