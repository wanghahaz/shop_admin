/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ') +
    '"}'
  )
}
// 计算时差
export function diffTime(startDate, endDate) {
  var diff = endDate - startDate; //时间差的毫秒数  

  //计算出相差天数  
  var days = Math.floor(diff / (24 * 3600 * 1000));

  //计算出小时数  
  var leave1 = diff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数  
  var hours = Math.floor(leave1 / (3600 * 1000));
  hours = hours > 9 ? hours : `0${hours}`;
  //计算相差分钟数  
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数  
  var minutes = Math.floor(leave2 / (60 * 1000));
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  //计算相差秒数  
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数  
  var seconds = Math.round(leave3 / 1000);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return {
    days,
    hours,
    minutes,
    seconds
  }
}
/**
 * 组合商品规格
 */

export function reduceList(list = []) {
  if (list.length > 1) {
    return list.reduce((arr, item) => {
      return setList(arr.sub || arr, item.sub)
    })
  } else {
    var ac = []
    list.forEach(item => {
      item.sub.forEach(ele => {
        ac.push({
          spec: ele.id,
          spec_name: ele.name,
          goods_thumb: '',
          goods_price: '',
          goods_market_price: '',
          goods_storage: ''
        })
      })
    })
    return ac
  }
}

function setList(source1, source2) {
  var result = []
  source1.forEach(element => {
    source2.forEach(item => {
      result.push({
        spec: `${(element.id || element.spec)}_${item.id}`,
        spec_name: `${(element.spec_name || element.name)} ${item.name}`,
        goods_thumb: '',
        goods_price: '',
        goods_market_price: '',
        goods_storage: ''
      })
    })
  })
  console.log(result)
  return result
}
