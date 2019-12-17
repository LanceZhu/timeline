import Vue from 'vue'
import Vuex from 'vuex'

const state = {
  logged: false,
  auth: null,
  timeline: [],
  messages: [], // 是否有消息通知,
  userGroup: [] // 用户组 user admin
}

const mutations = {
  signin (state) {
    state.logged = true
  },
  logout (state) {
    state.logged = false
  },
  updateTimeline (state, timeline) {
    state.timeline = timeline
  },
  updateMessages (state, messages) {
    state.messages = messages
  },
  updateUserGroup (state, userGroup) {
    state.userGroup = userGroup
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})
