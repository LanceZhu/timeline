import Vue from 'vue'
import Vuex from 'vuex'

const state = {
  logged: false,
  auth: null
}

const mutations = {
  signin (state) {
    state.logged = true
  },
  logout (state) {
    state.logged = false
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})
