const state = {
  routes: ['Home', 'Doctor'],
  record: {}
}

const actions = {
  add ({ commit }, data) {
    const routes = [...state.routes]
    const name = typeof data === 'object' ? data.name : data
    if (!routes.includes(name)) {
      routes.push(name)
      commit('SET_ROUTES', routes)
      typeof data === 'object' && commit('SET_RECORD', data)
    }
  },

  remove ({ commit }, data) {
    const name = typeof data === 'object' ? data.name : data
    const routes = state.routes.filter(e => e !== name)
    commit('SET_ROUTES', routes)
  }
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },

  SET_RECORD: (state, data) => {
    state.record[data.name + ':fullPath'] = data.value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
