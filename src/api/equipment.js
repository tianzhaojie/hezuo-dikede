import request from '@/utils/request'
// 全部售货机列表
export function getListAPI(params) {
  return request({
    url: '/vm-service/vm/search',
    params
  })
}

// 获取类型
export function getTyopeAPI() {
  return request({
    url: '/vm-service/vmType/search',
    params: {
      pageIndex: 1,
      pageSize: 10000
    }
  })
}
// 获取点位
export function getNodeAPI() {
  return request({
    url: '/vm-service/node/search',
    params: {
      pageIndex: 1,
      pageSize: 10000
    }
  })
}
