// 设置路由前置首位
import router from '@/router'
import store from '@/store'

// 白名单  用户没有登录的情况下 如果要跳往白名单则可以跳转 否则跳往登录页
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/') // 用户有token说明登录了 如果他要跳往登录页则那他跳到主页
    } else {
      next() // 如果不是去登录页则放行
    }
  } else {
    if (whiteList.includes(to.path)) { // 数组方法存在就返回true
      next() // 跳往白名单就放行
    } else {
      next('/login')
    }
  }
})
