<template>
  <div>
    <div v-if="!pendingWikis.length">暂无需审核词条</div>
    <div v-else>
      <el-table
      :data="pendingWikis"
      stripe>
        <el-table-column label="词条标题" prop="title"></el-table-column>
        <el-table-column label="变更原因" prop="reason"></el-table-column>
        <el-table-column label="待审核词条">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toTimepoint(scope.row._id)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              title="确定通过?"
              @onConfirm="confirm(scope.row._id, scope.$index)"
            >
              <el-button slot="reference" type="text" size="small">通过</el-button>
            </el-popconfirm>
            <el-popover
              placement="right"
              width="400"
              trigger="click"
              v-model="rejectForm.visible">
              <el-form label-position="top" :model="rejectForm" :rules="rejectRules" ref="rejectForm">
                <el-form-item label="拒绝原因：" prop="reason">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 5}"
                    placeholder="请简要描述拒绝原因"
                    :maxlength="200"
                    show-word-limit
                    v-model="rejectForm.reason"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="reject(scope.row._id, scope.$index, 'rejectForm')">确定</el-button>
                  <el-button @click="rejectForm.visible = false">取消</el-button>
                </el-form-item>
              </el-form>
              <el-button slot="reference" type="text" size="small" style="color: gray; margin-left: 5px">拒绝</el-button>
            </el-popover>
            <!-- <el-button type="text" size="small" @click="toggleReject(scope.row._id)"></el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pendingWikis: [],
      rejectForm: {
        reason: '',
        visible: false
      },
      rejectRules: {
        reason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    this.pendingWikis = await this.getPendingWikis()
  },
  methods: {
    async getPendingWikis () {
      const res = await this.$axios.get('/api/admin/getPending')
      return res.data.result.pending
    },
    toTimepoint (id) {
      this.$router.push(`/timeline/${id}`)
    },
    async confirm (id, index) {
      const res = await this.$axios.post('/api/admin/dealPending', {
        newid: id,
        accept: true,
        fail_reason: ''
      })
      if (res.data.code === 100) {
        this.pendingWikis.splice(index, 1)
        this.$message({
          type: 'success',
          message: '已通过该词条！'
        })
      } else {
        this.$message.error('操作失败！')
      }
    },
    async reject (id, index, formName) {
      const resBoolean = await this.$refs[formName].validate()
      if (!resBoolean) {
        return false
      }
      const res = await this.$axios.post('/api/admin/dealPending', {
        newid: id,
        accept: false,
        fail_reason: this.rejectForm.reason
      })
      this.rejectForm.visible = false
      if (res.data.code === 100) {
        this.pendingWikis.splice(index, 1)
        this.$message({
          type: 'success',
          message: '已拒绝该词条！'
        })
      } else {
        this.$message.error('操作失败！')
      }
    }
  }
}
</script>
