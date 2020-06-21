<template>
  <div>
      <div v-if="this.messages.length === 0">
        暂无消息
      </div>
      <div v-else>
        <el-table :data="messages" @expand-change="expandChange">
          <el-table-column
            label="发件人id"
            prop="from"
            width="80">
          </el-table-column>
          <el-table-column
            label="发件人用户名"
            prop="fromUsername">
          </el-table-column>
          <el-table-column
            label="发送时间"
            prop="sendTimestamp">
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
  name: 'Message',
  data () {
    return {
      messages: []
    }
  },
  async created () {
    const messages = await this.getMessages()
    this.messages = messages
  },
  methods: {
    async getMessages () {
      try {
        let messages = await this.$api.checkMessage()

        this.$store.commit('updateMessages', messages)

        messages = await Promise.all(messages.map(async msg => await this.formatMsg(msg)))
        messages = messages.reverse()

        return messages
      } catch (err) {
        console.error(err)
        return []
      }
    },
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
    },
    async formatMsg (msg) {
      const { read, send_timestamp: sendTimestamp, from } = msg
      const formatedMsg = Object.assign({}, msg, {
        read: read ? '已读' : '未读',
        sendTimestamp: dayjs(sendTimestamp).format('YYYY-MM-DD HH:mm'),
        fromUsername: await this.$api.getNickname(from)
      })
      return formatedMsg
    }
  }
}
</script>
