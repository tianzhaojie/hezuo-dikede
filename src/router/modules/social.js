import Layout from '@/layout'
export default {
  path: '/report',

  component: Layout,
  children: [
    {
      path: 'report',
      name: 'report',
      component: () => import('@/views/social/index.vue'),
      meta: { title: '对账统计', icon: 'dzgl' }
    }
  ]
}
