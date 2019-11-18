<template>
  <div class="container">
    <div class="date">
      <div>时间格式选择</div>
      <el-cascader
        v-model="dateValue"
        :options="dateOptions"
        @change="dateFormatChange"></el-cascader>
      <div v-if="dateCategoryNumber === 100">
        <el-date-picker
          v-model="timepoint"
          :type="selectedTimepointType"
          format="yyyy/MM/dd"
          value-format="yyyy/MM/dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
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
import dayjs from 'dayjs'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  data () {
    return {
      id: 198, // 后端词条 id
      title: '',
      content: '',
      editorOption: {
        placeholder: '请注意格式统一',
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
      dateValue: '', // 时间点显示值
      dateCategoryNumber: 100, // 时间点类别值 计算方法为时间点格式选项 value 求和，默认为精确日期
      dateOptions: [ // 时间点格式选项
        {
          value: 100,
          label: '精确日期'
        },
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
      date_100: 0, // 精确时间
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
      const TIME_FORMAT = 'YYYY/MM/DD'

      let show = ''
      let time = dayjs().format(TIME_FORMAT)

      switch (this.dateCategoryNumber) {
        case 100: {
          show = dayjs(this.date_100).format('YYYY年MM月DD日')
          time = this.date_100
          break
        }
        case 0: {
          show = `${this.date_0}年`
          time = dayjs(new Date(this.date_0, 0, 1)).format(TIME_FORMAT) // 月份 0 开始
          break
        }
        case 1: {
          show = `${this.date_1[0]}年${this.data_1}月`
          time = dayjs(new Date(this.date_1[0], this.date_1[1] - 1, 1)).format(TIME_FORMAT)
          break
        }
        case 10: {
          show = `${this.date_10[0]}世纪${this.date_10[1]}年代`
          time = dayjs(new Date((this.date_10[0] - 1) * 100 + this.date_10[1], 0, 1)).format(TIME_FORMAT)
          break
        }
        case 11: {
          show = `${this.date_11[0]}世纪${this.date_11[1]}年代初`
          time = dayjs(new Date((this.date_11[0] - 1) * 100 + this.date_11[1], 0, 2)).format(TIME_FORMAT)
          break
        }
        case 12: {
          show = `${this.date_12[0]}世纪${this.date_12[1]}年代中`
          time = dayjs(new Date((this.date_12[0] - 1) * 100 + this.date_12[1], 5, 1)).format(TIME_FORMAT)
          break
        }
        case 13: {
          show = `${this.date_13[0]}世纪${this.date_13[1]}年代末`
          time = dayjs(new Date((this.date_13[0] - 1) * 100 + this.date_13[1], 11, 1)).format(TIME_FORMAT)
          break
        }
        case 20: {
          show = `${this.date_20[0]}年 - ${this.date_20[1]}年`
          time = dayjs(new Date(this.date_20[0], 11, 31)).format(TIME_FORMAT)
          break
        }
        default: {}
      }
      this.$axios.post(`/api/post/timepoint/${that.id}`, {
        time,
        title: that.title,
        content: that.content,
        show
      }).then(res => {
        switch (res.data.code) {
          case 100: {
            that.$message({
              message: '添加成功',
              type: 'success'
            })
            setTimeout(() => {
              that.$router.push(`/timeline/${res.data.new_post_id}`)
            }, 1500)
            break
          }
          default: {
            that.$message.error('添加失败')
          }
        }
      })
    },
    // 格式化显示时间
    dateFormatChange () {
      this.dateCategoryNumber = this.dateValue.reduce((acc, cur) => {
        acc += cur
        return acc
      }, 0)
    },
    // 初始化时间点
    dateInitialize () {
      const date = new Date()
      const year = date.getFullYear()
      const nextYear = year + 1
      const years = Math.floor(year % 100) - Math.floor(year % 10)
      const century = Math.floor(year / 100) + 1
      const month = date.getMonth() + 1

      this.date_100 = dayjs().format('YYYY/MM/DD')
      this.date_0 = year // 2020 年
      this.date_1[0] = year // 2020 年
      this.date_1[1] = month // 1 月
      this.date_10[0] = century // 21 世纪
      this.date_10[1] = years // 20 年代
      this.date_11[0] = century
      this.date_11[1] = years
      this.date_12[0] = century
      this.date_12[1] = years
      this.date_13[0] = century
      this.date_13[1] = years
      this.date_20[0] = year
      this.date_20[1] = nextYear
    }
  },
  created () {
    this.dateInitialize()
  }
}
</script>

<style scoped>
.container{
  width: 90%;
  margin: 0 auto;
}
.el-input{
  margin: 10px 0;
}
/* .date{
  float: left;
  text-align: left;
} */
.date .el-input{
  width: 150px;
  height: 40px;
}
.date .el-date-picker{
  width: 150px;
}
</style>
