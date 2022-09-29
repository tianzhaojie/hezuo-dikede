import Layout from '@/layout'
export default {
  path: '/employees',
  meta: { title: '人员管理', icon: 'rygl' },
  component: Layout,
  children: [
    {
      path: 'employees',
      name: 'employees',
      component: () => import('@/views/employees/index.vue'),
      meta: { title: '人员列表' }
    },
    {
      path: 'people',
      name: 'people',
      component: () => import('@/views/employees/people.vue'),
      meta: { title: '人员统计' }
    },
    {
      path: 'work',
      name: 'work',
      component: () => import('@/views/employees/work.vue'),
      meta: { title: '工作量列表' }
    }
  ]
}
