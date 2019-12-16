import request from '@/utils/request'

// 添加规格
export function addSku(data) {
  return request({
    url: 'agent/goods/sku/add',
    method: 'post',
    data
  })
}

// 获取商品列表
export function getGoodsList(params) {
  return request({
    url: 'agent/goods',
    method: 'get',
    params
  })
}

// 获取分类及品牌
export function getGoods(params) {
  return request({
    url: 'agent/goods/add',
    methods: 'get',
    params
  })
}
//  添加商品
export function addGoods(data) {
  return request({
    url: 'agent/goods/add',
    method: 'post',
    data
  })
}
// 获取编辑的商品
export function edGoods(id, params) {
  return request({
    url: `agent/goods/edit/${id}`,
    methods: 'get',
    params
  })
}
// 编辑商品
export function editGoods(id, data) {
  return request({
    url: `agent/goods/edit/${id}`,
    method: 'post',
    data
  })
}

// 上下架商品
export function editStatus(id, data) {
  return request({
    url: `agent/goods/status/${id}`,
    method: 'post',
    data
  })
}
// 回收商品
export function recycleGoods(id, data) {
  return request({
    url: `agent/goods/del/${id}`,
    method: 'post',
    data
  })
}
// 商品回收站列表
export function getRecycle(params) {
  return request({
    url: `agent/goods/recycle_bin`,
    method: 'get',
    params
  })
}
//  恢复商品
export function recoverGoods(id, data) {
  return request({
    url: `agent/goods/restore_recycle_goods/${id}`,
    method: 'post',
    data
  })
}
// 评价列表
export function getCommentList(params) {
  return request({
    url: `agent/comment`,
    method: 'get',
    params
  })
}
// 回复评价
export function replay(id, data) {
  return request({
    url: `agent/comment/replay/${id}`,
    method: 'post',
    data
  })
}
