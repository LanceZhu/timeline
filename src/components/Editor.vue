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
          ImageExtend: {
            name: 'img', // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: config.quillEditorOptions.imageUploadAPI,
            response: (res) => {
              return config.baseURL + res.allowList[0].filepath
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
    }
  }
}
</script>

<style>
.el-input{
  margin-bottom: 10px;
}
.ql-container{
    min-height: 400px;
}
</style>
