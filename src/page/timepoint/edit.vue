<template>
  <div class="container">
    <div>
      <el-date-picker
        v-model="timepoint"
        type="date"
        format="yyyy/MM/dd"
        value-format="yyyy/MM/dd"
        placeholder="选择时间点">
      </el-date-picker>
    </div>
    <!-- <div class="date">
      <div>时间格式选择</div>
      <el-cascader
        v-model="dateValue"
        :options="dateOptions"
        @change="dateFormatChange"></el-cascader>
      <div v-if="dateCategoryNumber === 0">
        <el-input v-model="date_0"></el-input>年
      </div>
      <div v-if="dateCategoryNumber === 1">
        <el-input v-model="date_1[0]"></el-input>年
        <el-input v-model="date_1[1]"></el-input>月
      </div>
      <div v-if="dateCategoryNumber === 10">
        <el-input v-model="date_10[0]"></el-input>世纪
        <el-input v-model="date_10[1]"></el-input>年代
      </div>
      <div v-if="dateCategoryNumber === 11">
        <el-input v-model="date_11[0]"></el-input>世纪
        <el-input v-model="date_11[1]"></el-input>年代初
      </div>
      <div v-if="dateCategoryNumber === 12">
        <el-input v-model="date_12[0]"></el-input>世纪
        <el-input v-model="date_12[1]"></el-input>年代中
      </div>
      <div v-if="dateCategoryNumber === 13">
        <el-input v-model="date_13[0]"></el-input>世纪
        <el-input v-model="date_13[1]"></el-input>年代末
      </div>
      <div v-if="dateCategoryNumber === 20">
        <el-input v-model="date_20[0]"></el-input>年 - <el-input v-model="date_20[1]"></el-input>年
      </div>
    </div> -->
    <el-input placeholder="请输入标题" v-model="title"></el-input>
    <quill-editor v-model="content" :editorOption=editorOption>
    </quill-editor>
    <!--
    <el-button @click="addCition">添加引用文献</el-button>
    <el-form label-position="right" label-width="100px" :model="citionForm">
      <el-form-item v-for="cition in citionForm.citions" :key="cition.index">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    -->
    <el-button type="primary" icon="el-icon-upload2" @click="submit()">编辑</el-button>
  </div>
</template>

<script>
import { Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import config from '../../../config'
// import dayjs from 'dayjs'

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
      },
      citionForm: {
        citions: [
          {
            index: 1
          }
        ]
      },
      dateValue: '', // 时间点显示值
      dateCategoryNumber: 0, // 时间点类别值 计算方法为时间点格式选项 value 求和
      dateOptions: [ // 时间点格式选项
        {
          value: 0,
          label: '年份',
          children: [
            {
              value: 0,
              label: '无月份'
            }, {
              value: 1,
              label: '具体到某月'
            }
          ]
        }, {
          value: 10,
          label: '年代',
          children: [
            {
              value: 0,
              label: '无'
            }, {
              value: 1,
              label: '初期'
            }, {
              value: 2,
              label: '中期'
            }, {
              value: 3,
              label: '后期'
            }
          ]
        }, {
          value: 20,
          label: '时期',
          children: [
            {
              value: 0,
              label: '起止年份'
            }
          ]
        }
      ],
      date_0: 0,
      date_1: [0, 0],
      date_10: [0, 0],
      date_11: [0, 0],
      date_12: [0, 0],
      date_13: [0, 0],
      date_20: [0, 0]
    }
  },
  methods: {
    submit () {
      const that = this
      // const TIME_FORMAT = 'YYYY/MM/DD'

      // let show = ''
      // let time = dayjs().format(TIME_FORMAT)

      // switch (this.dateCategoryNumber) {
      //   case 0: {
      //     show = `${this.date_0}年`
      //     time = dayjs(new Date(this.date_0, 0, 1)).format(TIME_FORMAT) // 月份 0 开始
      //     break
      //   }
      //   case 1: {
      //     show = `${this.date_1[0]}年${this.data_1}月`
      //     time = dayjs(new Date(this.date_1[0], this.date_1[1] - 1, 1)).format(TIME_FORMAT)
      //     break
      //   }
      //   case 10: {
      //     show = `${this.date_10[0]}世纪${this.date_10[1]}年代`
      //     time = dayjs(new Date((this.date_10[0] - 1) * 100 + this.date_10[1], 0, 1)).format(TIME_FORMAT)
      //     break
      //   }
      //   case 11: {
      //     show = `${this.date_11[0]}世纪${this.date_11[1]}年代初`
      //     time = dayjs(new Date((this.date_11[0] - 1) * 100 + this.date_11[1], 0, 2)).format(TIME_FORMAT)
      //     break
      //   }
      //   case 12: {
      //     show = `${this.date_12[0]}世纪${this.date_12[1]}年代中`
      //     time = dayjs(new Date((this.date_12[0] - 1) * 100 + this.date_12[1], 5, 1)).format(TIME_FORMAT)
      //     break
      //   }
      //   case 13: {
      //     show = `${this.date_13[0]}世纪${this.date_13[1]}年代末`
      //     time = dayjs(new Date((this.date_13[0] - 1) * 100 + this.date_13[1], 11, 1)).format(TIME_FORMAT)
      //     break
      //   }
      //   case 20: {
      //     show = `${this.date_20[0]}年 - ${this.date_20[1]}年`
      //     time = dayjs(new Date(this.date_20[0], 11, 31)).format(TIME_FORMAT)
      //     break
      //   }
      //   default: {}
      // }

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
              that.$router.push(`/timeline/${res.data.new_post_id}`)
            })
            break
          }
          default: {
            that.$message.error('编辑失败')
          }
        }
      })
    },
    addCition () {
      this.citionForm.citions.push({
        index: 3
      })
    },
    // 格式化显示时间
    dateFormatChange (value) {
      this.dateCategoryNumber = this.dateValue.reduce((acc, cur) => {
        acc += cur
        return acc
      }, 0)
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

<style scoped>
.container{
  width: 90%;
  margin: 0 auto;
}
.ql-container{
    min-height: 400px;
}
.el-input{
  margin-bottom: 10px;
}
.date .el-input{
  width: 100px;
  height: 40px;
}
</style>
