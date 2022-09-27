import request from '@/utils/request'
// 获取用户基本信息

export const getUserInfo = (id) => {
  return request({
    url: `/user-service/user/${id}`
  })
}

