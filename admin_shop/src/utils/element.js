/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */

import {
  MessageBox
} from 'element-ui'

export function confirm(obj) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(obj.content, obj.title || '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: obj.type || 'warning'
    }).then(() => {
      resolve('1')
    }).catch(() => {
      resolve('0')
    })
  })
}
