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
      this.$axios.post('/api/post/word', {
        content: that.$data.content,
        title: that.$data.title
      }).then(res => {
        switch (res.data.code) {
          case 100: {
            that.$router.push(`/wiki/view/${res.data.new_post_id}`)
            break
          }
          default: {
            that.$message.error('发布失败')
          }
        }
      })
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>

<style scoped>
.ql-container{
    min-height: 400px;
}
.el-input{
  margin-bottom: 10px;
}
</style>
