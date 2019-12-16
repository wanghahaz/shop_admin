import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/get_user_info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
let user = {
  getUser: (params) => {
    return request({
      url: '/users',
      method: 'get',
      params
    })
  },
  setStatus: (id, data) => {
    return request({
      url: `users/status/${id}`,
      method: 'post',
      data
    })
  },
  editUser: (id, pay, data) => {
    return request({
      url: `users/edit/${id}`,
      method: pay,
      data
    })
  },
  delUser: (id, data) => {
    return request({
      url: `users/del/${id}`,
      method: 'post',
      data
    })
  }
}
export {
  user
}
