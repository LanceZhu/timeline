<template>
  <div class="container">
    <el-table
      ref="wikiHistory"
      :data="historyList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :header-cell-class-name="disableCheckAll">
      <el-table-column
        type="selection"
        width="80">
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
          <el-button v-if="scope.$index !== historyList.length-1" @click="showHistoryRestoreForm(scope.row._id)" type="text" size="small">还原</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="版本还原" :visible.sync="historyRestoreFormVisible">
      <el-form :model="historyRestoreForm">
        <el-form-item label="修改原因">
          <el-input
            v-model="historyRestoreForm.reason"
            type="textarea"
            maxlength="50"
            :autosize="{ minRows:3, maxRows: 4 }"
            show-word-limit
            placeholder="请简要描述理由，以便管理员审核。"
           ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="historyRestoreFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="historyRestore">确 定</el-button>
      </div>
    </el-dialog>
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
      selectedHistory: [],
      historyRestoreFormVisible: false,
      historyRestoreForm: {
        targetId: undefined,
        reason: ''
      }
    }
  },
  async created () {
    const historyList = await this.getHistory(this.$route.params.id)
    this.historyList = historyList
  },
  methods: {
    async getHistory (id) {
      const res = await this.$axios.get(`/api/timepoint/history/${id}`)
      if (res.data.code !== 100) {
        this.$message('获取词条历史失败！')
        return []
      }
      let historyList = res.data.data
      historyList = historyList.map(time => {
        time.timestamp = dayjs(time.timestamp * 1000).format('YYYY-MM-DD HH:mm')
        return time
      })
      return historyList
    },
    toTimepointView: function (index) {
      const id = this.historyList[index]._id
      this.$router.push(`/timeline/${id}`)
    },
    showHistoryRestoreForm (restoreWikiId) {
      this.historyRestoreFormVisible = true
      this.historyRestoreForm.targetId = restoreWikiId
    },
    async historyRestore () {
      const currentId = this.$route.params.id
      const { targetId } = historyRestoreForm
      reason = historyRestoreForm.reason === '' ? '未填写理由' : historyRestoreForm.reason
      const res = await this.$axios.post(`/api/timepoint/restore/${currentId}`, {
        rev_id: targetId,
        reason
      })
      if (res.data.code !== 100) {
        this.$message.error('版本还原失败！')
        return
      }
      this.$message({
        type: 'success',
        message: '版本回退成功！'
      })
      await updateTimeline()
      const restoredWikiId = res.data.new_post_id
      this.$router.push(`/timeline/${restoredWikiId}`)
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
    },
    disableCheckAll: function (row) {
      if (row.columnIndex === 0) {
        return 'disable-checkall'
      }
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

<style>
/* 去掉全选按钮 */
.el-table .disable-checkall .cell .el-checkbox__inner{
    display: none !important;
}

.el-table .disable-checkall .cell::before{
    content: '选择';
    text-align: center;
    line-height: 37px;
}
</style>
