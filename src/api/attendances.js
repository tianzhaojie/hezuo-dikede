import request from '@/utils/request'
// 获取区域列表
export const getSearch = (params) => {
  return request({
    url: '/vm-service/region/search',
    params
  })
}
/**
 *  新增区域
 * @param {*} body
 * @returns
 */
export function TheNewArea(data) {
  return request({
    method: 'POST',
    url: '/vm-service/region',
    data
  })
}

/**
 * 修改区域详情
 * @param {*} id 区域id
 * @param {*} data 修改参数
 * @returns
 */
export function modifierSrea(id, data) {
  return request({
    method: 'PUT',
    url: `/vm-service/region/${id}`,
    data
  })
}
/**
 * 获取区域详情
 * @param {*} regionId // id
 * @returns
 */
export function viewDetailss(regionId) {
  return request({
    url: `/vm-service/region/${regionId}`

  })
}
/**
 * 删除区域
 * @param {*} id
 * @returns
 */
export function DeleteArea(id) {
  return request({
    method: 'DELETE',
    url: `/vm-service/region/${id}`
  })
}
/**
 * 获取点位列表
 * @param {*} params 当前页码，每页数据个数，区域名称
 * @returns
 */
export function getNodeListAPI(params, data) {
  return request({
    url: '/vm-service/node/search',
    params,
    data
  })
}
/**
 * 获取合作商列表
 * @param {*} params
 * @returns
 */
export function PartnerSearch(params) {
  return request({
    url: '/user-service/partner/search',
    params
  })
}
/**
 * 商圈列表
 * @returns
 */
export const businessList = () => {
  return request({
    url: '/vm-service/businessType'
  })
}
/**
 * 新增
 * @param {*} data
 * @returns
 */
export function TheNewPoint(data) {
  return request({
    method: 'POST',
    url: '/vm-service/node',
    data
  })
}
/**
 * 修改点位
 * @param {*} id 区域id
 * @param {*} data 修改参数
 * @returns
 */
export function ModifyThePoint(id, data) {
  return request({
    method: 'PUT',
    url: `/vm-service/node/${id}`,
    data
  })
}
/**
* 获取点位详情
* @param {*} regionId
* @returns
*/
export function ItsDetails(id) {
  return request({
    url: `/vm-service/node/vmList/${id}`
  })
}
/**
 * 删除点位
 * @param {*} id
 * @returns
 */
export function DeletePoint(id) {
  return request({
    method: 'DELETE',
    url: `/vm-service/node/${id}`
  })
}
/**
 * 获取合作商列表
 * @param {*} params 当前页码，每页数据个数，区域名称
 * @returns
 */
export function getPartnerListAPI(params) {
  return request({
    url: '/user-service/partner/search',
    params
  })
}
