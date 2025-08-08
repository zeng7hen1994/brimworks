import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('editor', ['editingElement'])
  },
  methods: {
    ...mapActions('editor', [
      'setEditingElement'
    ]),
    /**
     * 将插件属性的 自定义增强编辑器注入 属性编辑面板中
     */
    mixinEnhancedPropsEditor (editingElement) {
      const { components } = editingElement.editorConfig
      for (const key in components) {
        if (this.$options.components[key]) return
        this.$options.components[key] = components[key]
      }
    },
    renderPropsEditorPanel (h, editingElement) {
      const propsConfig = editingElement.editorConfig.propsConfig
      return (
        <a-form
          ref="form"
          size="mini"
          id="props-edit-form"
          label-width="100px"
          label-position="left"

        >
          {
            Object.keys(propsConfig).map(propKey => {
              const item = propsConfig[propKey]
              // https://vuejs.org/v2/guide/render-function.html
              const data = {
                style: { width: '100%' },
                props: {
                  ...item.prop,
                  // https://vuejs.org/v2/guide/render-function.html#v-model
                  value: editingElement.pluginProps[propKey] || item.defaultPropValue
                },
                on: {
                  // https://vuejs.org/v2/guide/render-function.html#v-model
                  // input (e) {
                  //   editingElement.pluginProps[propKey] = e.target ? e.target.value : e
                  // }
                  change (e) {
                    // TODO fixme: update plugin props in vuex with dispatch
                    editingElement.pluginProps[propKey] = e.target ? e.target.value : e
                  }
                }
              }
              return (
                <a-form-item label={item.label} labelCol={{ span: 8 }} wrapperCol={{ span: 14, offset: 2 }}>
                  { h(item.type, data) }
                </a-form-item>
              )
            })
          }
        </a-form>
      )
    }
  },
  render (h) {
    const ele = this.editingElement
    if (!ele) return (<span>请先选择一个元素</span>)
    this.mixinEnhancedPropsEditor(ele)
    return this.renderPropsEditorPanel(h, ele)
  }
}
