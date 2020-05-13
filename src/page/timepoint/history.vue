<template>
  <div class="container">
    <el-table
      ref="wikiHistory"
      :data="historyList"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
          <el-button v-if="scope.$index !== historyList.length-1" @click="toRestore(scope.$index)" type="text" size="small">还原</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px; width: auto">
      <el-button @click="historyDiff">版本对比</el-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import updateTimeline from '@/utils/updateTimeline'

export default {
  data () {
    return {
      historyList: [],
      selectedHistory: []
    }
  },
  created () {
    const that = this
    this.$axios.get(`/api/timepoint/history/${this.$route.params.id}`).then(res => {
      that.historyList = res.data.data
      that.historyList = that.historyList.map(time => {
        // time.timestamp = parseDate(time.timestamp * 1000)
        time.timestamp = dayjs(time.timestamp * 1000).format('YYYY-MM-DD HH:mm')
        return time
      })
    })
  },
  methods: {
    toTimepointView: function (index) {
      const id = this.historyList[index]._id
      this.$router.push(`/timeline/${id}`)
    },
    toRestore: async function (index) {
      const that = this
      const id = this.historyList[index]._id
      try {
        const resMsg = await this.$confirm('此操作将该词条回退到所选版本, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        if (resMsg === 'confirm') {
          const res = await this.$axios.post(`/api/timepoint/restore/${that.$route.params.id}`, {
            rev_id: id
          })
          switch (res.data.code) {
            case 100: {
              this.$message({
                type: 'success',
                message: '回退成功！'
              })
              await updateTimeline
              this.$router.push(`/timeline/${res.data.new_post_id}`)
              break
            }
            default: {
              this.$message({
                type: 'error',
                message: '回退失败！'
              })
            }
          }
        }
      } catch (err) {
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        }
      }
    },
    handleSelectionChange: function (val) {
      // 最多选择两项 第三项替代第二项
      if (val.length > 2) {
        this.$refs.wikiHistory.toggleRowSelection(val[1])
        val.splice(1, 1)
      }
      this.selectedHistory = val
    },
    historyDiff: function () {
      if (this.selectedHistory.length !== 2) {
        this.$message({
          type: 'info',
          message: '需选择两项进行对比'
        })
        return
      }
      const id1 = this.selectedHistory[0]._id
      const id2 = this.selectedHistory[1]._id
      this.$router.push(`history/diff/${id1}/${id2}`)
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.el-table {
  flex: none;
}
@media (min-width: 720px) {
  .container{
    width: 90%;
    margin: 0 auto;
    min-width: 720px;
  }
}
@media (max-width: 720px) {
  .container{
    min-width: 720px;
  }
}
</style>
