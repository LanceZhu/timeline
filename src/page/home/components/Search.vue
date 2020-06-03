<template>
  <el-autocomplete
    v-model="search"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    @select="handleSearch"
  ></el-autocomplete>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    async querySearch (queryString, cb) {
      try {
        const res = await this.$axios.post('/api/timepoint/search', {
          search: this.search
        })
        const resList = res.data.data
        const results = resList.map(res => {
          return {
            id: res._id,
            value: res.title,
            search: this.search
          }
        })
        cb(results)
      } catch (err) {
        console.error(err)
      }
    },
    handleSearch (item) {
      this.search = item.search // 保持输入框中用户输入内容不变，不然替换为点击项内容
      this.$router.push(`/timeline/${item.id}`)
    }
  }
}
</script>
