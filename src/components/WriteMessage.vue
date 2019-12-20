<template>
  <el-form label-position="right" v-model="messageForm">
    <el-form-item label="收信人ID">
      <el-input v-model="messageForm.to" placeholder="请输入收信人ID"></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="messageForm.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <el-input v-model="messageForm.content" placeholder="请输入内容" type="textarea" :autosize="{ minRows: 3, maxRows: 10}"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit" type="primary">发送</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'WriteMessage',
  data () {
    return {
      messageForm: {
        to: '',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    async submit () {
      try {
        const res = await this.$axios.post('/api/user/sendMessage', this.messageForm)
        if (res.data.code === 100) {
          this.$message({
            type: 'success',
            message: '发送成功！'
          })
        } else {
          this.$message.error('发送失败！')
        }
      } catch (err) {
        console.error(err)
        this.$message.error('发送失败！')
      }
    }
  }
}
</script>
