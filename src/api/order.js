import request from '@/utils/request'
export const getPageAPI = (params) => {
  return request({
    url: '/order-service/order/search',
    params
  })
}
