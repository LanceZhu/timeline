<template>
  <div class="container">
    <TimepointSelect ref="TimepointSelect" />
    <Editor ref="Editor" :defaultTitle="discuss.title" :defaultContent="discuss.content"></Editor>
    <div class="submit">
      <el-button type="primary" @click="submit()">提交</el-button>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import TimepointSelect from './components/TimepointSelect'

export default {
  data () {
    return {
      discuss: {
        title: '',
        content: ''
      }
    }
  },
  components: {
    Editor,
    TimepointSelect
  },
  methods: {
    async submit () {
      const { title, content } = this.$refs.Editor.getData()
      const timepointId = this.$refs.TimepointSelect.getData()
      const { postId } = this.discuss
      const discuss = {
        title,
        content,
        post_id: timepointId
      }

      const res = await this.$axios.post('/api/discuss/new', discuss)

      const { thread_id: threadId } = res.data.data
      this.$router.push(`/discuss/${threadId}`)
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
