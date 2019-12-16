import request from '@/utils/request';

// 顶部
export function getTop(params) {
  return request({
    url: 'agent/chat/top',
    method: 'get',
    params
  })
}
// 聊天列表
export function getUser(params) {
  return request({
    url: 'agent/chat/msg_lists',
    method: 'get',
    params
  })
}
