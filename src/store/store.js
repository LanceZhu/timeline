import Vue from 'vue'
import Vuex from 'vuex'

const state = {
  userInfo: {
    name: 'f00bar',
    id: 1
  },
  auth: null
}

const mutations = {
  signup (state, auth) {
    state.auth = auth
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})
