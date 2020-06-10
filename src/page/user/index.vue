<template>
  <div class="container-user">
    <el-tabs :tab-position="'left'">
      <el-tab-pane label="所有时间点">
        <Wikis></Wikis>
      </el-tab-pane>
      <el-tab-pane label="删除请求" v-if="this.$store.state.userGroup.includes('admin')">
        <Management></Management>
      </el-tab-pane>
      <el-tab-pane label="词条审核" v-if="this.$store.state.userGroup.includes('admin')">
        <PendingWikis></PendingWikis>
      </el-tab-pane>
      <el-tab-pane label="站内私信">
        <WriteMessage></WriteMessage>
      </el-tab-pane>
      <el-tab-pane label="我的消息">
        <Messages></Messages>
      </el-tab-pane>
      <el-tab-pane label="登出">
        <el-button @click="logout()">登出</el-button>
      </el-tab-pane>
    </el-tabs>
    <div>
    </div>
  </div>
</template>

<script>
const WriteMessage = () => import('@/components/WriteMessage')
const Messages = () => import('@/components/Messages')
const Wikis = () => import('./components/Wikis')
const Management = () => import('./components/Management')
const PendingWikis = () => import('./components/PendingWikis')

export default {
  components: {
    WriteMessage,
    Messages,
    Wikis,
    Management,
    PendingWikis
  },
  methods: {
    logout () {
      const that = this
      this.$axios.get('/api/user/logout').then(() => {
        that.$store.commit('logout')
        that.$router.push('/timeline')
      })
      this.$message.success('登出成功')
    }
  }
}
</script>

<style scoped>
.container-user{
  min-width: 720px;
  margin-top: 10px;
}
</style>
