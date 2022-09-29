import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(), // 不用传值 默认获取键名  获取缓存的token
  userInfo: {},
  userId: '',
  tokenTime: 0
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
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
  },
  SET_USER_ID(state, userId) {
    state.userId = userId
  },
  REMOVE_USER_ID(state) {
    state.userId = null
  },
  SET_TOKEN_TIEM(state, tokenTime) {
    console.log(tokenTime)
    state.tokenTime = tokenTime // 登录第一次获取token时存入时间戳
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

