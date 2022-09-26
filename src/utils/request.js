import axios from 'axios'

// 创造axios实例
const serve = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

export default serve
