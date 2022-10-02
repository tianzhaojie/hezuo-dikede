import request from '@/utils/request.js'
// 获取排名前几的商品
export function getProductRank(start, end) {
  return request({
    url: `/order-service/report/skuTop/10/${start}/${end}`
  })
}

// 获取销售额统计
export function getSales(collectType, start, end) {
  return request({
    url: `/order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}

// 获取销售额分布
export function getDistribution(start, end) {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`
  })
}

// 获取合作商点位
export function getPartners() {
  return request({
    url: '/vm-service/node/nodeCollect'
  })
}
