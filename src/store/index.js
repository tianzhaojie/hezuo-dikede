import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState(
    {
      paths: ['user.userId', 'user.userInfo', 'user.tokenTime'],
      key: 'TOUTIAO_USER'
      // reducer(state) {
      //   const { user: { token }} = state
      //   console.log(token)
      //   return {
      //     token
      //   }
      // }
    }
  )],
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
