import request from '@/utils/request';

// 列表
export function freightList(params) {
  return request({
    url: 'agent/setting/tmpl_rule',
    method: 'get',
    params
  })
}
// 添加
export function addFreight(data) {
  return request({
    url: 'agent/setting/tmpl_rule/add',
    method: 'post',
    data
  })
}
// 编辑
export function editFreight(pay, id, data) {
  return request({
    url: `agent/setting/tmpl_rule/edit/${id}`,
    method: pay,
    data
  })
}
// 删除
export function delFreight(data) {
  return request({
    url: `agent/setting/tmpl_rule/del`,
    method: 'post',
    data
  })
}
