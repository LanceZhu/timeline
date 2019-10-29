<template>
    <div class="wikis">
        <router-link v-for="wiki in wikis" :key="wiki.id" :to="`/wiki/view/${wiki.id}`">
            <el-card class="text item">{{ wiki.title }}</el-card>
        </router-link>
        <div v-if="!wikis.length">未找到词条</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      wikis: [],
      pageCount: 0
    }
  },
  created () {
    const that = this
    this.$axios.post('/api/search', {
      search: that.$route.query.key
    }).then(res => {
      that.wikis = res.data.data.result
      that.pageCount = Math.ceil(that.wikis.length / 10)
    })
  }
}
</script>

<style scoped>
.wikis{
    padding: 10px 60px;
}
a{
  text-decoration: none;
}
.el-card{
  margin-bottom: 10px;
}
</style>
