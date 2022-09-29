import Layout from '@/layout'
export default {
  path: '/permission',
  meta: { title: '商品管理', icon: 'spgl' },
  component: Layout,
  children: [
    {
      path: 'permission',
      name: 'permission',
      component: () => import('@/views/permission/index.vue'),
      meta: { title: '商品类型' }
    },
    {
      path: 'CommodityType',
      name: 'CommodityType',
      component: () => import('@/views/permission/CommodityType'),
      meta: { title: '商品管理' }
    }
  ]
}
