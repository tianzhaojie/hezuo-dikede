import Layout from '@/layout'
export default {
  path: '/attendances',
  meta: { title: '点位管理', icon: 'dwgl' },
  component: Layout,
  children: [
    {
      path: 'area',
      name: 'area',
      component: () => import('@/views/attendances/components/area.vue'),
      meta: { title: '区域管理' }
    },
    {
      path: 'point',
      name: 'point',
      component: () => import('@/views/attendances/components/point.vue'),
      meta: { title: '点位管理' }
    },
    {
      path: 'partners',
      name: 'partners',
      component: () => import('@/views/attendances/components/partners.vue'),
      meta: { title: '合作商管理' }
    }
  ]
}
