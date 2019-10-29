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
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="toTimepointView(scope.$index)" type="text" size="small">查看</el-button>
          <el-button @click="toRestore(scope.$index)" type="text" size="small">还原</el-button>
        </template>
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
  },
  methods: {
    toTimepointView: function (index) {
      const id = this.historyList[index].id
      this.$router.push(`/timpoint/view/${id}`)
    },
    toRestore: function (index) {
      const that = this
      const id = this.historyList[index].id
      this.$axios.post(`/api/restore/${id}`, {
        rev_id: id
      }).then(() => {
        that.$message({
          message: '恢复成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
