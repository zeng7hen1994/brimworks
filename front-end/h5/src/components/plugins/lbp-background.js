/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-17 21:02:47
 * @FilePath: /luban-h5/front-end/h5/src/components/plugins/lbp-background.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: luban-h5 background image/color component/plugin
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import PropTypes from '@luban-h5/plugin-common-props'

export default {
  name: 'lbp-background',
  render () {
    let style = {
      width: '100%',
      height: '100%'
    }

    if (this.imgSrc) {
      style = {
        ...style,
        'background-size': 'cover',
        'background-position': '50% 50%',
        'background-origin': 'content-box',
        'background-image': `url(${this.imgSrc})`
      }
    } else {
      style = {
        ...style,
        backgroundColor: this.backgroundColor
      }
    }

    return (
      // [知识点:CSS] : https://codesandbox.io/s/ziyuansuzindexzaigao-wufafugaifuyuansudexiongdiyuansu-n15rd?file=/index.html
      <div style="width: 100%; height: 100%; overflow: hidden; position: absolute; z-index: 0; opacity: 1;">
        <div style={style}></div>
      </div>
    )
  },
  props: {
    imgSrc: PropTypes.image(),
    backgroundColor: PropTypes.color({ label: '背景色', defaultValue: 'rgba(255, 255, 255, 0.2)' })
  }
}
