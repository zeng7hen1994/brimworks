/**
 * 作品预览的渲染引擎，其实就是简单遍历 pages 以及 elements，显示即可
 */
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'font-awesome/css/font-awesome.min.css'
import { pluginsList } from './mixins/load-plugins.js'
import Element from './components/core/models/element'
Vue.config.productionTip = false
Vue.use(Antd)

const Engine = {
  name: 'engine',
  methods: {
    renderPreview (h, _elements) {
      const elements = _elements.map(element => new Element(element))
      return (
        <div style={{ height: '100%', position: 'relative' }}>
          {
            elements.map((element, index) => {
              const style = element.getStyle({ position: 'absolute' })
              const data = {
                style,
                props: element.getProps({ mode: 'preview' })
              }
              return h(element.name, data)
            })
          }
        </div>
      )
    }
  },
  render (h) {
    const work = window.__work
    return (
      <div id="work-container" data-work-id={work.id}>
        <div class="swiper-container">
          <div class="swiper-wrapper">{
            work.pages.map(page => {
              return (
                <section class="swiper-slide flat">
                  {/* this.walk(h, page.elements) */}
                  { this.renderPreview(h, page.elements) }
                </section>
              )
            })
          }</div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    )
  }
}

const install = function (Vue) {
  Vue.component(Engine.name, Engine)
  pluginsList.forEach(plugin => {
    Vue.component(plugin.name, plugin.component)
  })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Engine
}
