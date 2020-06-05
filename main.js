import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  // 获取下一个路由的query
  const routeQuery = JSON.stringify(to.query)
  // 获取vuex中下一个路由的query（）
  const routeQueryInRecord = store.state.keepAlive.record[to.name + ':routeQuery']
  // 准备vuex仓库里keepAlive的数据
  const data = {
    name: to.name,
    value: routeQuery
  }
  // 获取下一个路由的父路由
  const parentRouteArr = to.matched.map(e => e.parent ? e.parent.name : '')
  // vuex中的记录与获取下一个路由的query不一致，则表示页面需要重新创建（从keep-alive组件的include属性中移除）
  if (routeQueryInRecord && routeQuery !== routeQueryInRecord) {
    // 通过vuex，改变keep-alive组件的include属性
    store.dispatch('keepAlive/remove', to.name)
    // 父路由需要一起删除
    parentRouteArr.forEach(e => e && store.dispatch('keepAlive/remove', e))
  } else {
    // vuex中的记录与获取下一个路由的query一致，则表示页面需要被缓存（向keep-alive组件的include属性里添加）
    // 通过vuex，改变keep-alive组件的include属性
    store.dispatch('keepAlive/add', data)
    // 父路由需要一起增加
    parentRouteArr.forEach(e => e && store.dispatch('keepAlive/add', e))
  }
  setTimeout(() => {
    // 进入页面后记录这次的路由
    store.dispatch('keepAlive/add', data)
    parentRouteArr.forEach(e => e && store.dispatch('keepAlive/add', e))
  }, 0)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
