<template>
  <div>
    <div v-html="wiki"></div>
    <div>
      <el-date-picker
        v-model="timepoint"
        type="date"
        format="yyyy/MM/dd"
        value-format="yyyy/MM/dd"
        placeholder="选择时间点">
      </el-date-picker>
    </div>
    <el-input placeholder="请输入标题" v-model="title"></el-input>
    <quill-editor v-model="content">
    </quill-editor>
    <el-button type="primary" icon="el-icon-upload2" @click="submit()">添加</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wiki: '',
      title: '',
      content: '',
      timepoint: ''
    }
  },
  methods: {
    submit () {
      const that = this
      this.$axios.post(`/api/post/timepoint/${that.$route.params.id}`, {
        time: that.timepoint,
        title: that.title,
        content: that.content
      }).then(res => {
        switch (res.data.code) {
          case 100: {
            that.$message({
              message: '添加成功',
              type: 'success'
            })
            setTimeout(() => {
              that.$router.push(`/timepoint/view${res.data.new_post_id}`)
            }, 1500)
            break
          }
          default: {
            that.$message.error('添加失败')
          }
        }
      })
    }
  },
  created () {
    const that = this
    this.$axios.get(`/api/show/${this.$route.params.id}`).then(res => {
      that.wiki = res.data.data.post.content
    })
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
