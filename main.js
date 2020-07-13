import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'

router.beforeEach((to, from, next) => {

  if (!to.meta.notKeepAlive) {
    const fullPath = to.fullPath
    const fullPathInRecord = store.state.keepAlive.record[to.name + ':fullPath']
    const data = {
      name: to.name,
      value: fullPath
    }
    const parentRouteArr = to.matched.map(e => e.parent ? e.parent.name : '')
    // vuex中的记录与获取下一个路由的query不一致，则表示页面需要重新创建（从keep-alive组件的include属性中移除）
    if (fullPathInRecord && fullPath !== fullPathInRecord) {
      NProgress.start()
      // 通过vuex，改变keep-alive组件的include属性
      store.dispatch('keepAlive/remove', to.name)
      // 父路由的记录需要一起改变
      parentRouteArr.map(e => e && store.dispatch('keepAlive/remove', e))
    } else {
      store.dispatch('keepAlive/add', data)
      parentRouteArr.map(e => e && store.dispatch('keepAlive/add', e))
    }
    setTimeout(() => {
      // next()之后记录这次的路由
      store.dispatch('keepAlive/add', data)
      parentRouteArr.map(e => e && store.dispatch('keepAlive/add', e))
    }, 0)
  } else {
    NProgress.start()
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
