import Vue from 'vue'
import Vuex from 'vuex'

const state = {
  logged: false,
  auth: null,
  timeline: []
}

const mutations = {
  signin (state) {
    state.logged = true
  },
  logout (state) {
    state.logged = false
  },
  updateTimeline (state, newTimeline) {
    state.timeline = newTimeline
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})
