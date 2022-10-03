import request from '@/utils/request'
/**
 *  对账记录对应获取数据的接口
 * @param {Object} params 表单对象
 * @returns
 */
export const getPageAPI = (params) => {
  return request({
    url: '/order-service/report/partnerCollect',
    params
  })
}
export const getPartnersAPI = (pageIndex, pageSize) => {
  return request({
    url: '/user-service/partner/search',
    params: {
      pageIndex,
      pageSize
    }
  })
}
/**
 *
 * @param {String} start 开始时间
 * @param {String} end 结束时间
 * @returns 销售量
 */
export const getCountAPI = (start, end) => {
  return request({
    url: '/order-service/report/orderCount',
    params: {
      start,
      end
    }
  })
}
/**
 *
 * @param {String} start 开始时间
 * @param {String} end 结束时间
 * @returns 销售额
 */
export const getAmountAPI = (start, end) => {
  return request({
    url: '/order-service/report/orderAmount',
    params: {
      start,
      end
    }
  })
}
/**
 *
 * @param {String} start 开始时间
 * @param {String} end 结束时间
 * @returns 分成
 */
export const getBillAPI = (start, end) => {
  return request({
    url: '/order-service/report/totalBill',
    params: {
      start,
      end
    }
  })
}
