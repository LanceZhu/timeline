  <template>
    <div class="container">
      <el-table
        :data="historyList"
        style="width: 100%">
        <el-table-column
          prop="timestamp"
          label="时间"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="owner"
          label="修改人"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          min-width="400">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="120">
          <template slot-scope="scope">
            <el-button @click="toTimepointView(scope.$index)" type="text" size="small">查看</el-button>
            <el-button @click="toRestore(scope.$index)" type="text" size="small">还原</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>

<script>
import parseDate from '@/utils/parseDate'

export default {
  data () {
    return {
      historyList: []
    }
  },
  created () {
    const that = this
    this.$axios.get(`/api/timepoint/history/${this.$route.params.id}`).then(res => {
      that.historyList = res.data.data
      that.historyList = that.historyList.map(time => {
        time.timestamp = parseDate(time.timestamp * 1000)
        return time
      })
    })
  },
  methods: {
    toTimepointView: function (index) {
      const id = this.historyList[index]._id
      this.$router.push(`/timeline/${id}`)
    },
    toRestore: function (index) {
      const that = this
      const id = this.historyList[index]._id
      this.$axios.post(`/api/timepoint/restore/${that.$route.params.id}`, {
        rev_id: id
      }).then((res) => {
        switch (res.data.code) {
          case 100: {
            that.$message({
              message: '恢复成功',
              type: 'success'
            })
            that.$router.push(`/timeline/${res.data.new_post_id}`)
            that.$axios.get('/api/timepoint/list').then(res => {
              if (res.data.code === 100) {
                let timeline = res.data.data
                timeline = timeline.map(time => {
                  if (typeof time.show === 'object') {
                    const { show } = time.show
                    if (show) {
                      time.show = time.show.show
                    } else {
                      time.show = time.show.date
                    }
                  }
                  return time
                })
                that.$store.commit('updateTimeline', timeline)
              }
            })
            break
          }
          default: {}
        }
      })
    }
  }
}
</script>

<style scoped>
.container{
  width: 90%;
  margin: 0 auto;
}
</style>
