import './styles/radio.scss'
import commonProps from './common/props.js'
import editorConfigForProps from './common/editor-config-for-configurable-props.js'

export default {
  name: 'lbp-form-radio',
  props: {
    ...commonProps,
    value: {
      type: [String, Number],
      default: '标题演示'
    },
    aliasName: {
      type: String,
      default: '标题演示'
    },
    checked: {
      type: Boolean,
      default: false
    },
    onFocus: {
      type: Function,
      default: () => {}
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    onBlur: {
      type: Function,
      default: () => {}
    }
  },
  editorConfig: {
    propsConfig: {
      ...editorConfigForProps
    }
  },
  methods: {
    handleChange (e) {
      if (this.disabled) return
      this.$emit('change', e.target.value)
    }
  },
  render () {
    const {
      color,
      textAlign,
      backgroundColor,
      fontSize,
      lineHeight,
      borderColor,
      borderRadius,
      borderWidth,
      aliasName,
      id,
      type,
      // readOnly, // ?
      disabled,
      // tabIndex, // ?
      checked,
      // autoFocus,
      value,
      vertical
    } = this

    const style = {
      color,
      textAlign,
      backgroundColor,
      fontSize: fontSize,
      lineHeight: lineHeight + 'em',
      borderColor,
      borderRadius: borderRadius + 'px',
      borderWidth: borderWidth + 'px',
      textDecoration: 'none',
      display: vertical ? 'block' : 'inline-block'
    }

    const checkedClass = checked && 'is-checked'
    return (
      <label role="radio" tabindex="0" class="lbp-radio" style={style} aria-checked="true">
        <span class={'lbp-radio__input' + checkedClass}>
          <span class="lbp-radio__inner"></span>
          <input
            class="lbp-radio__original"
            name={aliasName}
            id={id}
            type={type}
            ref="input"
            value={value}
            disabled={disabled}
            checked={!!checked}
            onChange={this.handleChange}
          // readOnly={readOnly}
          // tabIndex={tabIndex}
          // className={`${prefixCls}-input`}
          // onClick={this.onClick}
          // onFocus={this.onFocus}
          // onBlur={this.onBlur}
          // onInput={this.onInput}
          // autoFocus={autoFocus}
          // data-type="lbp-form-input"
          // {...globalProps}
          />
          <span class="lbp-radio__label"><slot>{value}</slot></span>
        </span>
      </label>
    )
  }
}
