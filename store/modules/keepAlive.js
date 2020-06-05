const state = {
  router: ['Home', 'Doctor'],
  record: {}
}

const actions = {
  add ({ commit }, data) {
    const router = [...state.router]
    const name = typeof data === 'object' ? data.name : data
    if (!router.includes(name)) {
      router.push(name)
      commit('SET_ROUTER', router)
      typeof data === 'object' && commit('SET_RECORD', data)
    }
  },

  remove ({ commit }, data) {
    const name = typeof data === 'object' ? data.name : data
    const router = state.router.filter(e => e !== name)
    commit('SET_ROUTER', router)
  }
}

const mutations = {
  SET_ROUTER: (state, router) => {
    state.router = router
  },

  SET_RECORD: (state, data) => {
    state.record[data.name + ':doctorId'] = data.value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
