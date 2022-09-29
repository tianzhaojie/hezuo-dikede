import Layout from '@/layout'
export default {
  path: '/order',
  component: Layout,

  children: [
    {
      path: 'order',
      name: 'order',
      component: () => import('@/views/setting/index.vue'),
      meta: { title: '订单管理', icon: 'ddjh' }
    }
  ]
}
