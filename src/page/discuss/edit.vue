<template>
  <div class="container" v-loading="loading">
    <TimepointSelect ref="TimepointSelect" :defaultTimepoints="thread._timepoints" disabled />
    <Editor ref="Editor" :defaultTitle="thread.title" :defaultContent="thread.content"></Editor>
    <div class="submit">
      <el-button type="primary" @click="editThread(thread.id)">提交</el-button>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import TimepointSelect from './components/TimepointSelect'

export default {
  data () {
    return {
      thread: {
        id: '',
        title: '',
        content: '',
        _timepoints: []
      },
      loading: true
    }
  },
  components: {
    Editor,
    TimepointSelect
  },
  async created () {
    this.loading = true

    const threadId = this.getThreadId()
    const thread = await this.getThread(threadId)

    this.thread = {
      id: threadId,
      ...thread
    }

    this.loading = false
  },
  methods: {
    getThreadId () {
      return this.$route.params.id
    },
    async getThread (threadId) {
      const res = await this.$axios.get(`/api/discuss/getThread/${threadId}`)

      if (res.data.code !== 100) {
        return {
          status: 'deleted'
        }
      }
      const { thread } = res.data.data

      thread._timepoints = await Promise.all(thread.parent_id.map(async id => {
        const timepoint = await this.getTimepoint(id)
        return {
          id,
          title: timepoint.title
        }
      }))
      return thread
    },
    async getTimepoint (timepointId) {
      const res = await this.$axios.get(`/api/timepoint/show/${timepointId}`)
      return res.data.data.post
    },
    async editThread (threadId) {
      const { title, content } = this.$refs.Editor.getData()
      const timepointIdArr = this.$refs.TimepointSelect.getData()

      if (title === '') {
        this.$message.error('请填写标题！')
      }
      if (timepointIdArr.length === 0) {
        this.$message.error('至少选择一个时间点！')
      }

      const { postId } = this.thread
      const newThread = {
        title,
        content,
        post_id: timepointIdArr
      }
      const res = await this.$axios.post(`/api/discuss/modifyThread/${threadId}`, newThread)

      if (res.data.code !== 100) {
        this.$message.error('更新失败！')
      } else {
        this.$message({
          type: 'success',
          message: '更新成功！'
        })
        this.$router.push(`/discuss/${threadId}`)
      }
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
}

.submit {
  margin: 10px 0 20px;
}
</style>
