<template>
  <div class="container">
    <div class="date">
      <div>时间格式选择</div>
      <div class="date-format">
        <el-cascader
          v-model="dateValue"
          :options="dateOptions"
          @change="dateTypeChange"></el-cascader>
        <div v-if="dateType === 100">
          <el-date-picker
            v-model="date_100"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div v-if="dateType === 0">
          <el-input v-model="date_0"></el-input>年
        </div>
        <div v-if="dateType === 1">
          <el-input v-model="date_1[0]"></el-input>年
          <el-input v-model="date_1[1]"></el-input>月
        </div>
        <div v-if="dateType === 10">
          <el-input v-model="date_10[0]"></el-input>世纪
          <el-input v-model="date_10[1]"></el-input>年代
        </div>
        <div v-if="dateType === 11">
          <el-input v-model="date_11[0]"></el-input>世纪
          <el-input v-model="date_11[1]"></el-input>年代初
        </div>
        <div v-if="dateType === 12">
          <el-input v-model="date_12[0]"></el-input>世纪
          <el-input v-model="date_12[1]"></el-input>年代中
        </div>
        <div v-if="dateType === 13">
          <el-input v-model="date_13[0]"></el-input>世纪
          <el-input v-model="date_13[1]"></el-input>年代末
        </div>
        <div v-if="dateType === 20">
          <el-input v-model="date_20[0]"></el-input>年 - <el-input v-model="date_20[1]"></el-input>年
        </div>
        <div v-if="dateType === 30">
          公元前<el-input v-model="date_30"></el-input>年
        </div>
      </div>
    </div>
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
    <el-button type="primary" icon="el-icon-upload2" @click="submit()">提交</el-button>
    <div class="tags">
      <div class="desc">添加标签（只能一项）</div>
      <div>
        <el-cascader
        v-model="tagValue"
        @change="tagChange"
        :options="tags"></el-cascader>
      </div>
    </div>
    <div class="citation">
      <el-button type="text" @click="dialogFormVisible = true">
        <i class="el-icon-document-add"></i>
        添加参考文献
        </el-button>
      <el-dialog title="添加参考资料" :visible.sync="dialogFormVisible">
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="网络资源" name="first">
          <el-form :model="internetResource" label-position="right">
            <el-form-item label="文章名" :label-width="formLabelWidth">
              <el-input v-model="internetResource.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="URL" :label-width="formLabelWidth">
              <el-input v-model="internetResource.url" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="网站名" :label-width="formLabelWidth">
              <el-input v-model="internetResource.websiteName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="发表日期" :label-width="formLabelWidth">
              <el-input v-model="internetResource.publishDate" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="引用日期" :label-width="formLabelWidth">
              <el-input v-model="internetResource.citationDate" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="著作资源" name="second">
          <el-form :model="bookResource" label-position="right">
            <el-form-item label="作者" :label-width="formLabelWidth">
              <el-input v-model="bookResource.author" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="著作名" :label-width="formLabelWidth">
              <el-input v-model="bookResource.paperName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版地" :label-width="formLabelWidth">
              <el-input v-model="bookResource.publishAddress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版社" :label-width="formLabelWidth">
              <el-input v-model="bookResource.publishPress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版年" :label-width="formLabelWidth">
              <el-input v-model="bookResource.publishYear" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="引文页码" :label-width="formLabelWidth">
              <el-input v-model="bookResource.pageRange" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="其他资源" name="third">
          <el-form :model="otherResource" label-position="right">
            <el-form-item label="*" :label-width="formLabelWidth">
              <el-input v-model="otherResource.any" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="citationSubmit">确定</el-button>
      </span>
      <el-divider></el-divider>
      </el-dialog>
      <div class="citation-added">
        <div class="citation-list">
          <div v-for="(citation, index) in citations" :key="index">
            <div v-if="citation.type === 'internetResource'">
              <div>网络资源</div>
              <div>{{ `文章名：${citation.content.name} 网站名：${citation.content.websiteName} 发表日期：${citation.content.publishDate}`}}</div>
            </div>
            <div v-else-if="citation.type === 'bookResource'">
              <div>著作资源</div>
              <div>{{`作者：${citation.content.author} 著作名：${citation.content.paperName} 出版年${citation.content.publishYear}`}}</div>
            </div>
            <div v-else-if="citation.type === 'otherResource'">
              <div>其他资源</div>
              <div>{{`${citation.content.any}`}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import config from '../../../config'
import dayjs from 'dayjs'
import isJSON from '@/utils/isJSON'
import { clone } from 'lodash'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  data () {
    return {
      title: '',
      content: '',
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
      dateValue: [100], // 时间点显示值
      dateType: 100,
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
        }, {
          value: 30,
          label: '公元前'
        }
      ],
      date_100: '',
      date_0: 0,
      date_1: [0, 0],
      date_10: [0, 0],
      date_11: [0, 0],
      date_12: [0, 0],
      date_13: [0, 0],
      date_20: [0, 0],
      date_30: 0,
      tags: [],
      tagValue: [],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      internetResource: {
        name: '',
        url: '',
        websiteName: '',
        publishDate: '',
        citationDate: ''
      },
      bookResource: {
        author: '',
        paperName: '',
        publishAddress: '',
        publishPress: '',
        publishYear: '',
        pageRange: ''
      },
      otherResource: {
        any: ''
      },
      activeName: 'first',
      citations: []
    }
  },
  methods: {
    submit () {
      const that = this
      let show = ''
      const now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth() // 月份从 0 开始
      let day = now.getDate()
      const { dateType } = this

      switch (dateType) {
        case 100: {
          show = dayjs(this.date_100).format('YYYY年MM月DD日')
          const dateList = this.date_100.split('/')
          year = dateList[0]
          month = dateList[1]
          day = dateList[2]
          break
        }
        case 0: {
          show = `${this.date_0}年`
          year = this.date_0
          month = 0
          year = 1
          break
        }
        case 1: {
          show = `${this.date_1[0]}年${this.data_1}月`
          year = this.date_1[0]
          month = this.date_1[0] - 1
          day = 1
          break
        }
        case 10: {
          show = `${this.date_10[0]}世纪${this.date_10[1]}年代`
          year = (this.date_10[0] - 1) * 100 + this.date_10[1]
          month = 0
          day = 1
          break
        }
        case 11: {
          show = `${this.date_11[0]}世纪${this.date_11[1]}年代初`
          year = (this.date_11[0] - 1) * 100 + this.date_11[1]
          month = 0
          day = 2
          break
        }
        case 12: {
          show = `${this.date_12[0]}世纪${this.date_12[1]}年代中`
          year = (this.date_12[0] - 1) * 100 + this.date_12[1]
          month = 5
          day = 1
          break
        }
        case 13: {
          show = `${this.date_13[0]}世纪${this.date_13[1]}年代末`
          year = (this.date_13[0] - 1) * 100 + this.date_13[1]
          month = 11
          day = 1
          break
        }
        case 20: {
          show = `${this.date_20[0]}年 - ${this.date_20[1]}年`
          year = this.date_20[0]
          month = 11
          day = 31
          break
        }
        default: {}
      }

      // 供编辑时间点时初始化时间点显示使用
      const showJSONFormat = JSON.stringify({
        type: this.dateValue,
        date: this[`date_${dateType}`],
        show
      })

      this.$axios.post(`/api/timepoint/edit/${that.$route.params.id}`, {
        title: that.title,
        content: that.content,
        year: Number(year),
        month: Number(month),
        day: Number(day),
        show: showJSONFormat,
        tag: JSON.stringify(this.tagValue),
        supplement: that.citations
      }).then(res => {
        switch (res.data.code) {
          case 100: {
            that.$message({
              message: '编辑成功',
              type: 'success'
            })
            setTimeout(() => {
              that.$router.push(`/timeline/${res.data.new_post_id}`)
              that.$axios.get('/api/timeline/list').then(res => {
                if (res.data.code === 100) {
                  that.$store.commit('updateTimeline', that.timeline)
                }
              })
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
      this.dateType = this.dateValue.reduce((acc, cur) => {
        acc += cur
        return acc
      }, 0)
    },
    dateInitialize (dateInput) {
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
      this.date_30 = 0

      dateInput = JSON.parse(dateInput)
      this.dateValue = dateInput.type
      const dateType = this.dateValue.reduce((acc, cur) => {
        acc += cur
        return acc
      })
      this[`date_${dateType}`] = dateInput.date
    },
    dateTypeChange () {
      this.dateType = this.dateValue.reduce((acc, cur) => {
        acc += cur
        return acc
      })
    },
    citationSubmit () {
      this.dialogFormVisible = false
      let newCitation = ''
      switch (this.activeName) {
        case 'first': {
          newCitation = {
            type: 'internetResource',
            content: clone(this.internetResource)
          }
          break
        }
        case 'second': {
          newCitation = {
            type: 'bookResource',
            content: clone(this.bookResource)
          }
          break
        }
        case 'third': {
          newCitation = {
            type: 'otherResource',
            content: clone(this.otherResource)
          }
          break
        }
        default: {}
      }
      this.citations.push(newCitation)
    },
    handleClick (tab, event) {
      console.log(this.activeName)
    }
  },
  created () {
    this.tags = config.tags
    const that = this
    this.$axios.get(`/api/timepoint/show/${this.$route.params.id}`).then(res => {
      const { title, content, show, tag } = res.data.data.post
      that.title = title
      that.content = content
      if (tag !== '') {
        this.tagValue = JSON.parse(tag)
      }
      if (isJSON(show)) {
        that.dateInitialize(show)
      } else {
        that.dateInitialize(JSON.stringify({
          type: [100],
          date: show
        }))
      }
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
  margin: 10px 0;
}
.date{
  text-align: left;
}
.date-format{
  display: flex;
  align-items: center;
}
.date .el-date-editor{
  width: 150px !important;
}
.date .el-input{
  width: 80px;
  height: 40px;
  margin: 10px;
}
.tags{
  text-align: left;
}
.tags .desc{
  margin-bottom: 10px;
}
.citation{
  text-align: left;
}
</style>
