import request from '@/utils/request'

// 分类列表
export function getList(params) {
  return request({
    url: 'agent/goods/store_goods_cate',
    method: 'get',
    params
  })
}
// 添加分类
export function addClfiy(data) {
  return request({
    url: 'agent/goods/store_goods_cate/add',
    method: 'post',
    data
  })
}
// 编辑分类
export function editClfiy(id, type, data) {
  return request({
    url: `agent/goods/store_goods_cate/edit/${id}`,
    method: type,
    data
  })
}
// 删除分类
export function delClfiy(id, data) {
  return request({
    url: `agent/goods/store_goods_cate/del/${id}`,
    method: 'post',
    data
  })
}
// 获取分类
export function getClfiy(params) {
  return request({
    url: 'agent/goods/store_goods_cate/get_cate',
    method: 'get',
    params
  })
}
// 店铺信息
export function getDealis(pay, data) {
  return request({
    url: `agent/setting/info`,
    method: pay,
    data
  })
}
// 商品归类列表
export function classify(params) {
  return request({
    url: 'agent/goods/store_goods_cate/classify',
    method: 'get',
    params
  })
}
// 商品分类转移
export function transfer(data) {
  return request({
    url: `agent/goods/store_goods_cate/classify/transfer`,
    method: 'post',
    data
  })
}
// 店铺运费策略
export function getStrategy(pay, data) {
  return request({
    url: `agent/setting/freight_strategy`,
    method: pay,
    data
  })
}
