<template>
  <div>
    <el-tabs :tab-position="'left'">
      <el-tab-pane label="所有词条">
        <router-link v-for="wiki in wikis" :key="wiki.id" :to="`/wiki/view/${ wiki.id }`" target="_blank">
          <el-card>
            {{ wiki.title }}
          </el-card>
        </router-link>
      </el-tab-pane>
      <el-tab-pane label="所有时间点">时间点</el-tab-pane>
      <el-tab-pane label="登出">
        <el-button @click="logout()">登出</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wikis: [],
      timepoints: []
    }
  },
  methods: {
    getWikis: function () {
      const that = this
      this.$axios.get('/api/user/list').then(res => {
        that.$data.wikis = res.data.data
      })
    },
    logout () {
      // this.$store.commit('signup', null)
      const that = this
      this.$axios.get('/api/logout').then(() => {
        that.$store.commit('logout')
        that.$router.push('/index')
      })
      this.$message.success('登出成功')
    }
  },
  created () {
    this.getWikis()
  }
}
</script>

<style scoped>
.messages{
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  margin-top: 10px;
}
.wikis{
  margin-top: 10px;
}
.timepoints{
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  margin-bottom: 10px;
}
.el-card{
  margin-bottom: 10px;
}
a{
  text-decoration: none;
}
</style>
