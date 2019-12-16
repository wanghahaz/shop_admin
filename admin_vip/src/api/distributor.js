import request from '@/utils/request';
export function getList(params) {
  return request({
    url: '/agent',
    method: 'get',
    params
  })
}
export function setStatus(id, data) {
  return request({
    url: `/agent/status/${id}`,
    method: 'post',
    data
  })
}
