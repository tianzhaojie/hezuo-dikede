import Layout from '@/layout'
export default {
  path: '/policy',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'salarys',
      component: () => import('@/views/salarys/index.vue'),
      meta: { title: '策略管理', icon: 'dp' }
    }
  ]
}
