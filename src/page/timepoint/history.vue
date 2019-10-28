  <template>
    <el-table
      :data="historyList"
      style="width: 100%">
      <el-table-column
        prop="timestamp"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="owner"
        label="修改人">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
    </el-table>
  </template>

<script>
export default {
  data () {
    return {
      historyList: []
    }
  },
  created () {
    const that = this
    this.$axios.get(`/api/history/${this.$route.params.id}`).then(res => {
      that.historyList = res.data.data.data
    })
  }
}
</script>
