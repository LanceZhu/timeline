<template>
  <div>
    <el-input placeholder="请输入标题" v-model="title"></el-input>
    <quill-editor
    v-model="content"
    :options="editorOption">
    </quill-editor>
    <el-button type="primary" icon="el-icon-upload2" @click="submit()">添加</el-button>
  </div>
</template>

<script>
import { Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import config from '../../config'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  name: 'Editor',
  data () {
    return {
      title: '',
      content: '',
      editorOption: {
        modules: {
          ImageExtend: { // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
            name: 'img', // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: '/api/photoUpload', // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
            // 则 return res.data.url
            response: (res) => {
              return config.baseURL + res.allowList[0]
            },
            headers: (xhr) => {
              // xhr.setRequestHeader('myHeader','myValue')
            }, // 可选参数 设置请求头部
            sizeError: () => {}, // 图片超过大小的回调
            start: () => {}, // 可选参数 自定义开始上传触发事件
            end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
            error: () => {}, // 可选参数 上传失败触发的事件
            success: () => {}, // 可选参数  上传成功触发的事件
            change: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue')
              // formData.append('token', 'myToken')
            } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: { // 如果不上传图片到服务器，此处不必配置
            container: container, // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              image: function () { // 劫持原来的图片点击按钮事件
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
  }
}
</script>

<style>
.el-input{
  margin-bottom: 10px;
}
</style>
