<template>
  <span>
    <span v-if="!this.showDelete">
      <el-tooltip content="删除该词条" popper-class="tooltip">
        <i
          class="el-icon-delete"
          @click="showFeedback = true; feedback.type='delete'; feedback.title='删除理由：'"
        ></i>
      </el-tooltip>
      <el-tooltip content="举报该词条" popper-class="tooltip">
        <i
          class="el-icon-warning-outline"
          @click="showFeedback = true; feedback.type='complain'; feedback.title='举报理由：'"
        ></i>
      </el-tooltip>
      <el-dialog :title="this.feedback.title" :visible.sync="showFeedback" :append-to-body="true">
        <el-form>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="feedback.comment"
              maxlength="50"
              :autosize="{ minRows: 3, maxRows: 4}"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFeedback()">提交反馈</el-button>
            <el-button @click="showFeedback = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </span>
    <el-tooltip content="删除该词条" popper-class="tooltip" v-if="this.showDelete">
      <i class="el-icon-delete" @click="deleteTimepoint"></i>
    </el-tooltip>
  </span>
</template>

<script>
import updateTimeline from '@/utils/updateTimeline'

export default {
  name: 'feedback',
  data () {
    return {
      feedback: {
        title: '举报该词条',
        type: 'complain',
        target_id: '',
        comment: ''
      },
      showFeedback: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    // 显示管理员删除词条 icon
    showDelete () {
      return this.$store.state.userGroup.includes('admin')
    }
  },
  methods: {
    async submitFeedback () {
      this.feedback.target_id = this.id
      const { type = 'complain', target_id: targetId = '', comment = '' } = this.feedback
      const feedback = {
        type,
        target_id: targetId,
        comment
      }
      try {
        const res = await this.$axios.post('/api/user/makeReq', feedback)
        if (res.data.code === 100) {
          this.$message({
            type: 'success',
            message: '反馈成功，管理员会及时处理！'
          })
          setTimeout(() => {
            this.showFeedback = false
          }, 1500)
        } else {
          this.$message.error('反馈失败！')
        }
      } catch (err) {
        this.$message.error('反馈失败！')
      }
    },
    async deleteTimepoint () {
      try {
        await this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        const res = await this.$axios.get(`/api/admin/delPost/${this.id}`)
        if (res.data.code === 100) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          setTimeout(async () => {
            await updateTimeline()
            this.$router.push('/timeline')
          }, 1000)
        } else {
          this.$message.error('操作失败！')
        }
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    }
  }
}
</script>

<style scoped>
.el-tooltip{
  margin-left: 10px;
}
</style>
