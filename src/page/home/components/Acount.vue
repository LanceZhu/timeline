<template>
    <el-menu-item
      index="login"
      :route="this.$store.state.logged ? '/user' : '/login'"
    >
    <span v-if="!this.$store.state.logged">注册/登录</span>
    <div class="user" v-else>
        <el-badge is-dot class="badge" v-if="hasMsg"></el-badge>
        <i class="el-icon-user"></i>
      </div>
    </el-menu-item>
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
