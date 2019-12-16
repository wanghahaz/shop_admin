import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'
import {
  Message
} from 'element-ui'
const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const data = response
        commit('SET_TOKEN', data.data)
        setToken(data.data)
        resolve(data)
        // }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getInfo({}).then(response => {
        const {
          data
        } = response
        if (!data) {
          reject('请您重新登录')
        }
        const {
          store_name,
          store_thumb
        } = data
        commit('SET_NAME', store_name)
        commit('SET_AVATAR', store_thumb)
        // commit('SET_AVATAR', `http://www.lyjp.shop/${store_thumb}`)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout().then((res) => {
        if (res.code == 200) {
          commit('SET_TOKEN', '')
          removeToken()
          location.reload()
        } else {
          Message({
            message: res.msg || '网络出错',
            type: 'error',
            duration: 2 * 1000
          })
        }
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
