import Layout from '@/layout'
export default {
  path: '/departments',
  meta: { title: '设备管理', icon: 'sbgl' },
  component: Layout,
  children: [
    {
      path: 'departments',
      name: 'departments',
      component: () => import('@/views/departments/equipment.vue'),
      meta: { title: '设备管理' }
    },
    {
      path: 'state',
      name: 'state',
      component: () => import('@/views/departments/state.vue'),
      meta: { title: '设备状态' }
    },
    {
      path: 'type',
      name: 'type',
      component: () => import('@/views/departments/type.vue'),
      meta: { title: '设备类型管理' }
    }
  ]
}
