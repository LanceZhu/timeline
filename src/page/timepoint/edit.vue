<template>
  <div>
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
    <quill-editor v-model="content" :editorOption=editorOption>
    </quill-editor>
    <el-button type="primary" icon="el-icon-upload2" @click="submit()">编辑</el-button>
  </div>
</template>

<script>
import { Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import config from '../../../config'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  data () {
    return {
      title: '',
      content: '',
      timepoint: '',
      editorOption: {
        modules: {
          ImageExtend: {
            name: 'img', // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: '/api/photoUpload',
            response: (res) => {
              return config.baseURL + res.allowList[0]
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image: function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  methods: {
    submit () {
      const that = this
      this.$axios.post(`/api/edit/${that.$route.params.id}`, {
        time: that.timepoint,
        title: that.title,
        content: that.content
      }).then(res => {
        switch (res.data.code) {
          case 100: {
            that.$message({
              message: '编辑成功',
              type: 'success'
            })
            setTimeout(() => {
              that.$router.push(`/timepoint/view/${res.data.new_post_id}`)
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
  created () {
    const that = this
    this.$axios.get(`/api/show/${this.$route.params.id}`).then(res => {
      that.title = res.data.data.post.title
      that.content = res.data.data.post.content
      that.timepoint = res.data.data.post.date_data
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
