import Vue from 'vue'
import Vuex from 'vuex'

const state = {
  logged: false,
  timeline: [],
  filteredTimeline: [], // 用户筛选后的时间轴, 例如 标签筛选
  messages: [], // 是否有消息通知,
  userGroup: [], // 用户组 user admin
  recomendations: [] // 首页词条推荐
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
    this.commit('updateRecommendations') // this = $store
  },
  updateFilteredTimeline (state, filteredTimeline) {
    state.filteredTimeline = filteredTimeline
  },
  updateMessages (state, messages) {
    state.messages = messages
  },
  updateUserGroup (state, userGroup) {
    state.userGroup = userGroup
  },
  updateRecommendations (state) {
    // 随机四个
    const timeline = state.timeline.slice()
    for (let i = timeline.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      const tmp = timeline[i]
      timeline[i] = timeline[randomIndex]
      timeline[randomIndex] = tmp
    }
    state.recomendations = timeline.slice(0, 4)
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})
