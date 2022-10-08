import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
// import { Message } from 'element-ui'
// token失效问题主动处理 定义函数
const tokenFailureTime = 3600000 // 定义token失效时间 时间戳 单位s
const isTokentime = () => {
  const currenTTime = Date.now()
  const stamp = (currenTTime - store.state.user.tokenTime) / 1000
  return stamp > tokenFailureTime // 真为过期
}

// 创造axios实例
const serve = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
serve.interceptors.request.use(config => {
  //  console.log(router)
  console.log(config)
  if (store.getters.token) {
    if (isTokentime()) {
      // 登出处理  业务没有封装在vuex中所以需要 重新写
      store.commit('user/REMOVE_TOKEN')
      store.commit('user/REMOVE_USER_INFO')
      store.commit('user/REMOVE_USERID')
      router.push(`/login`)
      // Message.error(('token, 超时'))  响应拦截器提醒
      return Promise.reject(new Error('token, 超时'))
    }
    config.headers['Authorization'] = `${store.getters.token}`
  }
  return config // 必须返回
}, error => {
  return Promise.reject(error)
})

// token过期被动处理
serve.interceptors.response.use(response => {
  if (response.status === 200) { // 一般200为成功
    return response
  }
  return response // 防止响应其他状态
}, error => {
  if (error.response?.status === 401) {
    // 一般token失效为401
    console.log(222)
    Message.error('token,失效')
    // 清空信息
    store.commit('user/REMOVE_TOKEN')
    store.commit('user/REMOVE_USER_INFO')
    store.commit('user/REMOVE_USERID')
    router.push(`/login`)
  }
  return Promise.reject(error)
})
export default serve
