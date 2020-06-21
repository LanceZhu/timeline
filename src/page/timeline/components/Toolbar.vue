<template>
  <span>
    <el-tooltip content="编辑词条" popper-class="tooltip">
      <i class="el-icon-edit" @click="toEdit(id)"></i>
    </el-tooltip>
    <router-link :to="id + '/history'" tag="li">
      <el-tooltip content="词条历史" popper-class="tooltip">
        <i class="el-icon-time"></i>
      </el-tooltip>
    </router-link>
    <span v-if="!this.$store.state.userGroup.includes('admin')">
      <el-tooltip content="删除该词条" popper-class="tooltip">
        <i
          class="el-icon-delete"
          @click="toDelete(id)"
        ></i>
      </el-tooltip>
      <!-- <el-tooltip content="举报该词条" popper-class="tooltip">
        <i
          class="el-icon-warning-outline"
          @click="feedback.visible = true; feedback.type='complain'; feedback.title='举报理由：'"
        ></i>
      </el-tooltip> -->
      <el-dialog :title="this.feedback.title" :visible.sync="feedback.visible" :append-to-body="true">
        <el-form>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="feedback.comment"
              maxlength="50"
              :autosize="{ minRows: 3, maxRows: 4 }"
              show-word-limit
              placeholder="请简要描述理由，以便管理员审核。"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFeedback(id)">提交反馈</el-button>
            <el-button @click="feedback.visible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </span>
    <el-tooltip content="删除该词条" popper-class="tooltip" v-if="this.$store.state.userGroup.includes('admin')">
      <i class="el-icon-delete" @click="deleteTimepoint"></i>
    </el-tooltip>
  </span>
</template>

<script>
import updateTimeline from '@/utils/updateTimeline'

export default {
  name: 'toolbar',
  data () {
    return {
      feedback: {
        title: '举报该词条',
        type: 'complain',
        target_id: '',
        comment: '',
        visible: false
      }
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    async submitFeedback (id) {
      this.feedback.target_id = id
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
        } else {
          this.$message.error('反馈失败！')
        }
      } catch (err) {
        this.$message.error('反馈失败！')
      }
      setTimeout(() => {
        this.feedback.visible = false
      }, 1500)
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
    },
    async toEdit (id) {
      const editable = await this.checkEditable(id)
      if (!editable) {
        return
      }
      this.$router.push(`${id}/edit`)
    },
    async toDelete (id) {
      const editable = await this.checkEditable(id)
      if (!editable) {
        return
      }
      const logged = await this.checkLogin()
      if (!logged) {
        return
      }
      this.feedback.visible = true
      this.feedback.type = 'delete'
      this.feedback.title = '删除理由：'
    },
    async checkEditable (id) {
      const res = await this.$axios.get(`/api/timepoint/editable/${id}`)
      let editable = false
      if (res.data.code === 100 && res.data.result.editable) {
        editable = true
      }
      if (!editable) {
        this.$message.error('当前词条有新版本审核中，请稍后再试~')
      }
      return editable
    },
    async checkLogin () {
      const logged = await this.$api.checkLogin()
      if (!logged) {
        this.$message.error('请登录!')
      }
      return logged
    }
  }
}
</script>

<style scoped>
.el-tooltip{
  margin-left: 10px;
}
li{
  display: inline-block;
  cursor: pointer;
}
</style>
