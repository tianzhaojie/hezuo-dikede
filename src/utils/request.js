import axios from 'axios'
import store from '@/store'
// 创造axios实例
const serve = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

serve.interceptors.request.use(config => {
  console.log(config)
  if (store.getters.token) {
    config.headers['Authorization'] = `${store.getters.token}`
  }
  return config // 必须返回
}, error => {
  return Promise.reject(error)
})

export default serve
