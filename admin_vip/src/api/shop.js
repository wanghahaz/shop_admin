import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }
let goods = {
  // 商品列表
  getList: (params) => {
    return request({
      url: 'mall/goods',
      method: 'get',
      params
    })
  }
}
let classFiy = {
  // 商品列表
  getList: (params) => {
    return request({
      url: 'mall/cate',
      method: 'get',
      params
    })
  },
  getFiy: (params) => {
    return request({
      url: 'mall/cate/get_cate',
      method: 'get',
      params
    })
  },
  edit: (id, pay, data) => {
    return request({
      url: `mall/cate/edit/${id}`,
      method: pay,
      data
    })

  }

}
export {
  goods,
  classFiy
}
