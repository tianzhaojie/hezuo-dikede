import request from '@/utils/request'
// 获取用户基本信息

export const getUserInfo = (id) => {
  return request({
    url: `/user-service/user/${id}`
  })
}

/**
 * 获取用户信息
 * @param {*} id 用户id
 * @returns
 */
export function getUserInfoApi(id) {
  return request({
    url: `/user-service/user/${id}`
  })
}
/**
 * 人员搜索（列表页）
 * @param {*} data
 * @returns
 */
export function getUserSearchApi(data) {
  return request({
    url: '/user-service/user/search',
    data
  })
}
