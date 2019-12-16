import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: 'agent/user/login',
//     method: 'post',
//     data
//   })
// }

export function getInfo(data) {
  return request({
    url: `agent/setting/info`,
    method: 'get',
    data
  })
}

export function logout(params) {
  return request({
    url: 'agent/logout',
    method: 'get',
    params
  })
}

// 登录接口
export function login(data) {
  return request({
    url: 'agent/login',
    method: 'post',
    data
  })
}
