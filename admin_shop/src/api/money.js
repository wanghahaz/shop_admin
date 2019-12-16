import request from '@/utils/request'

// 财务管理title
export function getFinance(params) {
  return request({
    url: 'agent/finance',
    method: 'get',
    params
  })
}
// 提现记录
export function get_list(params) {
  return request({
    url: 'agent/finance/withdraw/list',
    method: 'get',
    params
  })
}
// 申请提现
export function withdraw(data) {
  return request({
    url: 'agent/finance/withdraw',
    method: 'POST',
    data
  })
}
