<template>
  <div>
    <div v-html="wiki"></div>
    <!--
    <div class="timeOption">
      <el-select v-model="selectedTimepointValue" placeholder="时间点格式选择" @change="selectedTimpointTypeChange">
        <el-option
          v-for="timepoint in timepointOptions"
          :key="timepoint.type"
          :value="timepoint.value">
        </el-option>
      </el-select>
    </div>
    -->
    <div v-if="datepickerShow">
      <el-date-picker
        v-model="timepoint"
        :type="selectedTimepointType"
        format="yyyy/MM/dd"
        value-format="yyyy/MM/dd"
        placeholder="选择时间点">
      </el-date-picker>
    </div>
    <div class="time">
      <div v-if="!datepickerShow">
        公元
        <el-select v-model="selectedCenturyValue">
          <el-option v-for="century in centuryOptions" :key="century" :value="century">
          </el-option>
        </el-select>
        <el-input v-model="centuryValue"></el-input>
        世纪
        <el-input v-model="yearValue"></el-input>
        年代
      </div>
    </div>
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
import config from '../../../config'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  data () {
    return {
      timepointOptions: [{
        type: 'date',
        value: '精确时间'
      }, {
        type: 'year',
        value: '年份'
      }, {
        type: 'century',
        value: '模糊时间'
      }],
      selectedTimepointValue: '',
      selectedTimepointType: 'date',
      selectedCenturyValue: '',
      datepickerShow: true,
      centuryOptions: [
        '前',
        '后'
      ],
      yearOptions: [
        '前',
        '中',
        '后'
      ],
      centuryValue: '',
      yearValue: '',
      timepoint: '',
      wiki: '',
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
    selectedTimpointTypeChange: function (val) {
      for (let i = 0; i < this.timepointOptions.length; i++) {
        if (val === '模糊时间') {
          this.datepickerShow = false
        } else {
          this.datepickerShow = true
        }
        if (this.timepointOptions[i].value === val) {
          this.selectedTimepointType = this.timepointOptions[i].type
          break
        }
      }
    },
    submit () {
      const that = this
      if (this.datepickerShow) {
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
                that.$router.push(`/timepoint/view/${res.data.new_post_id}`)
              }, 1500)
              break
            }
            default: {
              that.$message.error('添加失败')
            }
          }
        })
      } else {
        this.$axios.post(`/api/post/timepoint/${that.$route.params.id}`, {
          time: that.timepoint,
          title: that.title,
          content: that.content,
          show: '公元' + that.selectedCenturyValue + that.centuryValue + '世纪' + that.yearValue + '年代'
        }).then(res => {
          switch (res.data.code) {
            case 100: {
              that.$message({
                message: '添加成功',
                type: 'success'
              })
              setTimeout(() => {
                that.$router.push(`/timepoint/view/${res.data.new_post_id}`)
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
  },
  created () {
    const that = this
    this.$axios.get(`/api/show/${this.$route.params.id}`).then(res => {
      that.wiki = res.data.data.post.content
    })
  }
}
</script>

<style scoped>
.timeOption{

}
.time .el-input{
  width: 50px;
}
</style>
