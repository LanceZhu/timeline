<template>
    <div class="wikis">
        <router-link v-for="wiki in wikis" :key="wiki.id" :to="`/wiki/view/${wiki.id}`">
            <el-card class="text item">{{ wiki.title }}</el-card>
        </router-link>
        <div v-if="!wikis.length">目前还没有内容！</div>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-count="pageCount"
            @current-change="currentChange">
        </el-pagination>
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
  created: function () {
    this.updatePage()
  },
  methods: {
    currentChange: function (e) {
      this.updatePage(e)
    },
    updatePage: function (page = 1, pn = 10) {
      const _this = this
      this.$axios.get(`/api/list?page=${page}&?pn=${pn}`).then(res => {
        _this.$data.wikis = res.data.data.currentPage
        _this.$data.pageCount = res.data.data.totalPages
      })
    }
  }
}
</script>

<style scoped>
.wikis{
    width: 100%;
}
a{
  text-decoration: none;
}
.el-card{
  margin-bottom: 10px;
}
.text {
font-size: 14px;
}
.item {
padding: 18px 0;
}
.el-pagination{
    margin-top: 20px;
}
</style>
