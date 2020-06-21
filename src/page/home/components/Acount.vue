<template>
  <div class="account-container">
    <span v-if="!this.$store.state.logged">注册/登录</span>
    <div class="user" v-else>
        <el-badge :is-dot="hasMsg" class="badge">
          <i class="el-icon-user pc"></i>
          <span class="mobile">个人中心</span>
        </el-badge>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default Vue.extend({
  computed: {
    hasMsg: function () {
      return !!this.$store.state.messages.length
    }
  },
  created: async function () {
    try {
      const res: checkLoginResponse = await this.$axios.get('/api/user/checkLogin')
      if (res.data.login) {
        this.$store.commit('signin')
      }
    } catch (err) {
      console.error(err)
    }
    try {
      // 消息通知
      if (this.$store.state.logged) {
        const res = await this.$axios.get('/api/user/getDetail')
        const { msg = [] } = res.data.data.mongo
        this.$store.commit('updateMessages', msg)
      }
    } catch (err) {
      console.error(err)
    }
  }
})
</script>

<style scoped>
@media (min-width: 720px) {
  .account-container {
    display: flex;
    align-items: center;
    height: 60px;
    font-size: 14px;
    color: gray;
  }
  .user {
    position: relative;
    line-height: 1;
  }
}
</style>
