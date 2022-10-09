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

// 获取搜索售货机类型列表
export function getTypeAPI(params) {
  return request({
    url: '/vm-service/vmType/search',
    params
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
// 新增设备
export function getAddAPI(data) {
  return request({
    method: 'POST',
    url: '/vm-service/vm',
    data
  })
}
// 策略列表
export function getPolicyList() {
  return request({
    url: '/vm-service/policy'
  })
}
// 应用策略
export function getApplicationAPI(innerCodeList, policyId) {
  return request({
    method: 'PUT',
    url: '/vm-service/vm/applyPolicy',
    data: {
      innerCodeList,
      policyId
    }
  })
}
// 获取售货机货道详情
export function getChannelDetailAPI(innerCode) {
  return request({
    url: `/vm-service/channel/channelList/${innerCode}`
  })
}
// 查询售货机策略
export function getStrategyAPI(innerCode) {
  return request({
    url: `/vm-service/policy/vmPolicy/${innerCode}`
  })
}
// 取消策略
export function delStrategyAPI(innerCode, policyId) {
  return request({
    method: 'PUT',
    url: `/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`
  })
}
// // 应用策略
// export function getSelectAPI() {
//   return request({
//     method: 'PUT',
//     url: '/vm-service/vm/applyPolicy',
//     data:{

//     }
//   })
// }

// 修改点位
export function ChangeNameAPI(id, nodeId) {
  return request({
    method: 'PUT',
    url: `/vm-service/vm/${id}/${nodeId}`
  })
}
// 获取售货机商品销量
export function getSalesAPI(innerCode, start, end) {
  return request({
    url: `/order-service/report/skuCollect/${innerCode}/${start}/${end}`
  })
}

// 获取捕获次数
export function getReplenishmentAPI(innerCode, start, end) {
  return request({
    url: `/task-service/task/supplyCount/${innerCode}/${start}/${end}`
  })
}

// 售货机类型修改
export function getChangeTypeAPI(typeId, data) {
  return request({
    method: 'PUT',
    url: `/vm-service/vmType/${typeId}`,
    data
  })
}
// 新增售货机类型
export function getAddTypeAPI(data) {
  return request({
    method: 'POST',
    url: '/vm-service/vmType',
    data
  })
}

// / 售货机类型查询
export function getVmtype(typeId) {
  return request({
    url: `/vm-service/vmType/${typeId}`
  })
}
