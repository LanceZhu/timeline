<template>
  <div>
      <div v-if="this.messages.length === 0">
        暂无消息
      </div>
      <div v-else>
        <el-table :data="messages" @expand-change="expandChange">
          <el-table-column
            label="发件人"
            prop="from">
          </el-table-column>
          <el-table-column
            label="发送时间"
            prop="send_timestamp">
          </el-table-column>
          <el-table-column
            label="标题"
            prop="title">
          </el-table-column>
          <el-table-column
            label="状态"
            prop="read">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              {{props.row.content}}
            </template>
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'WriteMessage',
  data () {
    return {
      messages: []
    }
  },
  async created () {
    try {
      const res = await this.$axios.get('/api/user/checkMessage')
      if (res.data.code === 100) {
        this.messages = res.data.message.map(el => {
          el.read = el.read ? '已读' : '未读'
          el.send_timestamp = dayjs(el.send_timestamp).format('YYYY-MM-DD HH:mm')
          return el
        })
        this.messages.reverse()
      } else {
        this.$message.error('发送失败！')
      }
    } catch (err) {
      this.$message.error('请求失败！')
    }
  },
  methods: {
    async expandChange (row, expandRows) {
      const { _id: msgId } = row
      try {
        const res = await this.$axios.get(`/api/user/readMessage/${msgId}`)
        if (res.data.code === 100) {
          row.read = '已读'
        } else {
          console.error('阅读消息失败')
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
