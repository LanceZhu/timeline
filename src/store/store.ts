import Vue from 'vue'
import Vuex from 'vuex'

const state: State = {
  logged: false,
  userDetail: {},
  timeline: [],
  messages: [], // 是否有消息通知,
  userGroup: [], // 用户组 user admin
  recomendations: [] // 首页词条推荐
}

const mutations = {
  signin (state: State) {
    state.logged = true
  },
  logout (state: State) {
    state.logged = false
  },
  updateTimeline (state: State, timeline: any) {
    state.timeline = timeline
    // @ts-ignore
    this.commit('updateRecommendations') // this = $store
  },
  updateMessages (state: State, messages: any) {
    state.messages = messages
  },
  updateUserGroup (state: State, userGroup: any) {
    state.userGroup = userGroup
  },
  updateRecommendations (state: State) {
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
