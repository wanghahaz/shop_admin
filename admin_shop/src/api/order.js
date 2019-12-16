import request from '@/utils/request'

// 订单l列表
export function getList(params) {
  return request({
    url: 'agent/goods/order',
    method: 'get',
    params
  })
}
// 发货
export function send(id, data) {
  return request({
    url: `agent/goods/order/deliver/${id}`,
    method: 'post',
    data
  })
}
// 订单详情
export function getOrder(id, params) {
  return request({
    url: `agent/goods/order/info/${id}`,
    method: 'get',
    params
  })
}
// s售后列表
export function getSaleList(params) {
  return request({
    url: 'agent/refund',
    method: 'get',
    params
  })
}
// 售后详情
export function getSale(id, params) {
  return request({
    url: `agent/refund/info/${id}`,
    method: 'get',
    params
  })
}
// 处理售后订单
export function refund(id, data) {
  return request({
    url: `agent/refund/deal/${id}`,
    method: 'POST',
    data
  })
}
