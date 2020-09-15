<template>
  <div class="container">
    <div class="thread" v-loading="loading.thread">
      <div class="title">
        {{ thread.title }}
      </div>
      <div v-html="thread.content" class="content"></div>
      <div class="time">
        <span>
          {{ thread.timestamp }}
        </span>
        <span>
          uid: {{ thread.uid }}
        </span>
      </div>
      <div>
    </div>
    <div class="toolbar">
      <el-button v-if="thread.id === userId" @click="delThread(thread.id)" size="mini">
       删除该贴
     </el-button>
    </div>
    </div>
    <el-divider />
    <div v-loading="loading.replies">
      <div class="reply-box">
        <div class="reply-box-content">
          <el-input
            type="textarea"
            maxlength="400"
            show-word-limit
            placeholder="发表评论"
            v-model="reply">
          </el-input>
        </div>
        <el-button type="primary" @click="replyThread(thread.id)">
          回复该贴
        </el-button>
      </div>
      <el-divider />
      <div class="replies">
        <div v-if="replies.length === 0"></div>
        <div v-else v-for="(reply, index) in replies" :key="index" class="reply">
          <div>
            {{ reply.content.content }}
          </div>
          <div class="reply-toolbar">
            <el-button v-if="Number(reply.content.uid) === userId" type="text" size="mini" @click="delReply(reply.content._id)">删除</el-button>
          </div>
          <el-divider />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import checkLogin from '@/utils/checkLogin'

export default {
  data () {
    return {
      thread: {},
      replies: [],
      reply: '',
      userId: '',
      loading: {
        thread: true,
        replies: true
      }
    }
  },
  async created () {
    const threadId = this.getThreadId()

    const userId = await this.$api.getUserId()
    this.userId = userId

    const thread = await this.getThread(threadId)
    this.thread = {
      id: threadId,
      ...thread
    }
    this.loading.thread = false

    const replies = await this.getThreadReplies(threadId)
    this.replies = replies
    this.loading.replies = false
  },
  methods: {
    getThreadId () {
      return this.$route.params.id
    },
    async getThread (threadId) {
      const res = await this.$axios.get(`/api/discuss/getThread/${threadId}`)

      if (res.data.code !== 100) {
        return []
      }
      const { thread } = res.data.data

      thread.timestamp = dayjs(thread.timestamp * 1000).format('YYYY-MM-DD')
      return thread
    },
    async delThread (threadId) {
      const logged = await this.$api.checkLogin()
      if (!logged) {
        this.$message.error('请登陆后操作！')
        return
      }

      const data = {
        thread_id: threadId
      }
      const res = await this.$axios.post('/api/discuss/delThread', data)
    },
    async getThreadReplies (threadId) {
      const res = await this.$axios.get(`/api/discuss/getReplies/${threadId}`)
      const { replies } = res.data.data
      const filterdReplies = replies.filter(reply => reply.content.status === 'publish')
      return filterdReplies
    },
    async replyThread (threadId) {
      const logged = await this.$api.checkLogin()
      if (!logged) {
        this.$message.error('请登陆后操作！')
        return
      }

      const data = {
        thread_id: threadId,
        content: this.reply,
        at: this.thread.uid
      }
      const res = await this.$axios.post('/api/discuss/reply', data)

      this.reply = ''
      const newReplies = await this.getThreadReplies(threadId)
      this.replies = newReplies
    },
    async delReply (replyId) {
      const data = {
        reply_id: replyId
      }
      const res = await this.$axios.post('/api/discuss/delReply', data)

      const newReplies = await this.getThreadReplies(this.thread.id)
      this.replies = newReplies
    }
  }
}
</script>

<style scoped>
.container {
  box-sizing: border-box;
  width: 50%;
  min-width: 375px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 50px;
  background-color: #fafafa;
  border-radius: 20px;
}

.thread {
  text-align: left;
}

.title {
  position: relative;
  font-size: 20px;
}

.title::before {
  content: '';
  border-left: 4px solid #409eff;
  position: absolute;
  height: 100%;
  left: -10px;
}

.content {
  padding: 10px;
}

.time {
  font-size: 12px;
  color: gray;
  padding: 5px;
}

.reply-box {
  display: flex;
}

.reply-box-content {
  flex: 1;
}

.replies {
  text-align: left;
}

.reply-toolbar {
  text-align: right;
}
</style>
