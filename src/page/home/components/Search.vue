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
            value: res.title
          }
        })
        cb(results)
      } catch (err) {
        console.error(err)
      }
    },
    handleSearch (item) {
      this.$router.push(`/timeline/${item.id}`)
    }
  }
}
</script>
