<template>
  <div>
    <el-input placeholder="请输入标题" v-model="title"></el-input>
    <quill-editor
      v-model="content"
      :options="editorOption">
    </quill-editor>
  </div>
</template>

<script>
import { Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  name: 'Editor',
  data () {
    return {
      title: '',
      content: '',
      editorOption: {
        placeholder: '请输入正文',
        modules: {
          ImageExtend: {
            name: 'img', // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: '/api/supplement/upload',
            response: (res) => {
              return res.allowList[0].filepath
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
  props: [
    'defaultTitle',
    'defaultContent'
  ],
  watch: {
    defaultTitle: function (newV, oldV) {
      this.title = newV
    },
    defaultContent: function (newV, oldV) {
      this.content = newV
    }
  },
  methods: {
    getData () {
      return {
        title: this.title,
        content: this.content
      }
    },
    getCurrentState () {
      const { title, content } = this
      return {
        title,
        content
      }
    }
  }
}
</script>

<style>
.el-input {
  margin-bottom: 10px;
}

.ql-container {
  min-height: 400px;
}
</style>
