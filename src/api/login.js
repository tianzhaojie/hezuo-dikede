import request from '@/utils/request'

export function loginCode(random) {
  return request({
    url: `/user-service/user/imageCode/${random}`,
    responseType: 'blob'
  })
}

// 登录
export const loginAPI = (data) => {
  return request({
    method: 'POST',
    url: '/user-service/user/login',
    data
  })
}

