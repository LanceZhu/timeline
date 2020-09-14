<template>
  <el-button @click="logout()">登出</el-button>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$axios.get('/api/user/logout')

      this.$store.commit('logout')
      this.$router.push('/timeline')
      this.$message.success('登出成功')
    }
  }
}
</script>
