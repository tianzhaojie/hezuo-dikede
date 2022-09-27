import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(), // 不用传值 默认获取键名  获取缓存的token
  userinfo: {}
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    // 把token存到缓存
    setToken(state.token)
  },
  GET_TOKEN() {
    getToken()
  },
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  },
  GET_USER_INFO(state, userinfo) {
    state.userinfo = userinfo
  }
}

const actions = {
  // user login

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

