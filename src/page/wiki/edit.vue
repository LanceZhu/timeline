<template>
  <div>
    <el-input placeholder="请输入标题" v-model="title"></el-input>
    <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                >
    </quill-editor>
    <el-button type="primary" icon="el-icon-upload2" @click="submit()">提交</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      content: '',
      editorOption: {
        // some quill options
      }
    }
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill.getText())
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      // console.log('editor change!', quill, html, text)
      this.content = html
    },
    submit () {
      const that = this
      const date = new Date()
      const year = date.getFullYear()
      const month = ('00' + (date.getMonth() + 1)).slice(-2)
      const day = ('00' + date.getDate()).slice(-2)
      this.$axios.post(`/api/edit/${that.$route.params.id}`, {
        title: that.title,
        content: that.content,
        time: `${year}/${month}/${day}`
      }).then(res => {
        switch (res.data.code) {
          case 100: {
            that.$message({
              message: '编辑成功',
              type: 'success'
            })
            setTimeout(() => {
              that.$router.push(`/wiki/view/${res.data.new_post_id}`)
            })
            break
          }
          default: {
            that.$message.error('编辑失败')
          }
        }
      })
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  created () {
    const that = this
    if ('id' in this.$route.params) {
      this.$axios.get(`/api/show/${this.$route.params.id}}`).then(res => {
        that.content = res.data.data.post.content
        that.title = res.data.data.post.title
      })
    }
  }
}
</script>

<style>
.ql-container{
    min-height: 400px;
}
.el-input{
  margin-bottom: 10px;
}
</style>
