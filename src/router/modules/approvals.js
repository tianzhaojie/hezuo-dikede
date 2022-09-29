import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  meta: { title: '工商管理', icon: 'gdgl' },
  children: [
    {
      path: 'operate',
      name: 'operate',
      component: () => import('@/views/approvals/components/operate.vue'),
      meta: { title: '运营工单' }
    },
    {
      path: 'management',
      name: 'management',
      component: () => import('@/views/approvals/components/management.vue'),
      meta: { title: '运营管理' }

    }
  ]
}
