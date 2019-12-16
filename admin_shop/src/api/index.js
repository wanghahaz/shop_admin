import request from '@/utils/request'

export function getIndex(params) {
  return request({
    url: 'agent/home',
    method: 'get',
    params
  })
}
