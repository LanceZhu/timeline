<template>
  <div>
    消息管理
    <el-table
    :data="userReqs"
    stripe>
      <el-table-column
      label="处理情况"
      prop="status"
      :filters="[{ text: '未处理', value: '未处理' }, { text: '已处理', value: '已处理' }]"
      :filter-method="statusFilter">
      </el-table-column>
      <el-table-column label="请求时间" prop="timestamp" sortable></el-table-column>
      <el-table-column label="用户id" prop="uid"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="请求类型" prop="type"></el-table-column>
      <el-table-column label="原因" prop="comment"></el-table-column>
      <el-table-column label="时间点">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toTimepoint(scope.row.target_id)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="dealReq(scope.row.target_id, scope.$index)">确认处理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      userReqs: []
    }
  },
  async created () {
    await this.getUserReqs()
  },
  methods: {
    // 获取用户请求信息 删除/举报词条 管理员
    async getUserReqs () {
      const res = await this.$axios.get('/api/admin/getReq')
      let request = res.data.request
      request = await Promise.all(request.map(async req => {
        const formatReq = await this.formatReq(req)
        return formatReq
      }))
      this.userReqs = request
    },
    // 格式化请求数据 用于 直接显示
    async formatReq (req) {
      const { timestamp, type, uid, dealed } = req
      const typeMap = {
        complain: '举报',
        delete: '删除'
      }
      const statusMap = {
        0: '未处理',
        1: '已处理'
      }
      const formatedReq = Object.assign({}, req, {
        timestamp: dayjs(timestamp).format('YYYY/MM/DD'),
        type: typeMap[type],
        username: await this.$api.getNickname(uid),
        status: statusMap[dealed]
      })
      return formatedReq
    },
    toTimepoint (id) {
      this.$router.push(`/timeline/${id}`)
    },
    async dealReq (id, index) {
      this.$message.error('该功能暂未开通，敬请期待！')
      // const res = await this.$axios.post('/api/admin/dealReq', {
      //   id
      // })
      // if (res.data.code !== 100) {
      //   this.$message.error('处理失败！')
      //   return
      // }
      // this.$message({
      //   type: 'success',
      //   message: '处理该请求成功！'
      // })
      // this.userReqs[index].status = '已处理'
    },
    statusFilter (value, row) {
      return value === row.status
    }
  }
}
</script>
