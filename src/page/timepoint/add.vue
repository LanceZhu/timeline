<template>
  <div class="container-add">
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
        <div v-if="dateType === 40">
          公元前<el-input v-model="date_40[0]"></el-input>年 - 公元前 <el-input v-model="date_40[1]"></el-input>年
        </div>
      </div>
    </div>
    <el-input placeholder="请输入标题" v-model="title"></el-input>
    <quill-editor
    v-model="content"
    :options="editorOption">
    </quill-editor>
    <div class="submit">
      <el-button type="primary" icon="el-icon-upload2" @click="submit()">添加</el-button>
    </div>
    <div class="tags">
      <div class="desc">添加标签（必填一项）</div>
      <div>
        <el-cascader
        v-model="tagValue"
        :options="tags"></el-cascader>
      </div>
    </div>
    <div class="citation">
      <el-button type="text" @click="addCitation()">
        <i class="el-icon-document-add"></i>
        <span class="title">添加参考文献</span>
        </el-button>
      <el-dialog title="添加参考资料" :visible.sync="dialogFormVisible">
        <el-tabs v-model="activeName">
        <el-tab-pane label="网络资源" name="internetResource">
          <el-form :model="internetResource" label-position="right" :rules="internetResourceRules" ref="internetResource">
            <el-form-item label="文章名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="internetResource.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="网站链接" :label-width="formLabelWidth" prop="url">
              <div class="url-preview">
                <el-input v-model="internetResource.url" autocomplete="off"></el-input>
                <a :href="internetResource.url" target="_blank"><i class="el-icon-view"></i></a>
              </div>
            </el-form-item>
            <el-form-item label="网站名" :label-width="formLabelWidth" prop="websiteName">
              <el-input v-model="internetResource.websiteName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="发表日期" :label-width="formLabelWidth" prop="publishDate">
              <el-input v-model="internetResource.publishDate" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="引用日期" :label-width="formLabelWidth" prop="citationDate">
              <el-input v-model="internetResource.citationDate" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="著作资源" name="bookResource">
          <el-form :model="bookResource" label-position="right" :rules="bookResourceRules" ref="bookResource">
            <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
              <el-input v-model="bookResource.author" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="著作名" :label-width="formLabelWidth" prop="paperName">
              <el-input v-model="bookResource.paperName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版地" :label-width="formLabelWidth" prop="publishAddress">
              <el-input v-model="bookResource.publishAddress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版社" :label-width="formLabelWidth" prop="publishPress">
              <el-input v-model="bookResource.publishPress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="出版年" :label-width="formLabelWidth" prop="publishYear">
              <el-input v-model="bookResource.publishYear" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="引文页码" :label-width="formLabelWidth" prop="pageRange">
              <el-input v-model="bookResource.pageRange" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="其他资源" name="otherResource">
          <el-form :model="otherResource" label-position="right" ref="otherResource">
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
      <div class="citation-list">
        <div v-for="(citation, index) in citations" :key="index" class="citation-item">
          <div v-if="citation.type === 'internetResource'">
            <!-- <div class="title">网络资源</div> -->
            <div>
              {{index + 1}}.
              <a :href="citation.content.url" target="_blank">{{ `${citation.content.name} ` }}<i class="el-icon-view"></i></a>
              <span>{{citation.content.websiteName}}</span>
              <span class="citation-date">{{` [${citation.content.publishDate}](引用日期: ${citation.content.citationDate})`}}</span>
            </div>
          </div>
          <div v-else-if="citation.type === 'bookResource'">
            <!-- <div class="title">著作资源</div> -->
            <div>{{`作者：${citation.content.author} 著作名：${citation.content.paperName} 出版地：${citation.content.publishAddress} 出版社：${citation.content.publishPress} 出版年：${citation.content.publishYear} 引文页码：${citation.content.pageRange}`}}</div>
          </div>
          <div v-else-if="citation.type === 'otherResource'">
            <!-- <div class="title">其他资源</div> -->
            <div>{{`其他：${citation.content.any}`}}</div>
          </div>
          <i class="el-icon-delete" @click="deleteCitation(index)"></i><i class="el-icon-edit" @click="editCitation(index)"></i>
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
// import { clone } from 'lodash'
import clone from 'lodash/clone'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  data () {
    return {
      title: '',
      content: '',
      editorOption: {
        placeholder: '请注意格式统一',
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
        }, {
          value: 40,
          label: '公元前-时间段'
        }
      ],
      date_100: 0, // 精确时间
      date_0: 0,
      date_1: [0, 0],
      date_10: [0, 0],
      date_11: [0, 0],
      date_12: [0, 0],
      date_13: [0, 0],
      date_20: [0, 0],
      date_30: 0, // 公元前
      date_40: [0, 0], // 公元前 0 年 - 公元前 0 年
      tags: config.tags, // 标签选择,
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
      internetResourceRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输网站链接', trigger: 'blur' }
        ],
        websiteName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        publishDate: [
          { required: true, message: '请输入发表日期', trigger: 'blur' }
        ],
        citationDate: [
          { required: true, message: '请输入引用日期', trigger: 'blur' }
        ]
      },
      bookResource: {
        author: '',
        paperName: '',
        publishAddress: '',
        publishPress: '',
        publishYear: '',
        pageRange: ''
      },
      bookResourceRules: {
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        paperName: [
          { required: true, message: '请输入文章名', trigger: 'blur' }
        ],
        publishAddress: [
          { required: true, message: '请输入出版地址', trigger: 'blur' }
        ],
        publishPress: [
          { required: true, message: '请输入出版社', trigger: 'blur' }
        ],
        publishYear: [
          { required: true, message: '请输入出版年份', trigger: 'blur' }
        ],
        pageRange: [
          { required: true, message: '请输入引用页码', trigger: 'blur' }
        ]
      },
      otherResource: {
        any: ''
      },
      activeName: 'internetResource',
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
          month = 1
          year = 1
          break
        }
        case 1: {
          show = `${this.date_1[0]}年${this.date_1[1]}月`
          year = this.date_1[0]
          month = this.date_1[1]
          day = 1
          break
        }
        case 10: {
          show = `${this.date_10[0]}世纪${this.date_10[1]}年代`
          year = Number(this.date_10[0] - 1) * 100 + Number(this.date_10[1])
          month = 1
          day = 1
          break
        }
        case 11: {
          show = `${this.date_11[0]}世纪${this.date_11[1]}年代初`
          year = Number(this.date_11[0] - 1) * 100 + Number(this.date_11[1])
          month = 1
          day = 2
          break
        }
        case 12: {
          show = `${this.date_12[0]}世纪${this.date_12[1]}年代中`
          year = Number(this.date_12[0] - 1) * 100 + Number(this.date_12[1])
          month = 6
          day = 1
          break
        }
        case 13: {
          show = `${this.date_13[0]}世纪${this.date_13[1]}年代末`
          year = Number(this.date_13[0] - 1) * 100 + Number(this.date_13[1])
          month = 12
          day = 1
          break
        }
        case 20: {
          show = `${this.date_20[0]}年 - ${this.date_20[1]}年`
          year = this.date_20[0]
          month = 12
          day = 31
          break
        }
        case 30: {
          show = `公元前${this.date_30}年`
          year = -this.date_30
          month = 1
          day = 1
          break
        }
        case 40: {
          show = `公元前${this.date_40[0]}年 - 公元前${this.date_40[1]}年`
          year = -this.date_40[0]
          month = 1
          day = 1
          break
        }
        default: {}
      }

      // 供编辑时间点时初始化时间点显示使用
      const showObject = {
        type: this.dateValue, // 用于选择器定位 数组
        date: this[`date_${dateType}`], // 用于日期输入框初始化
        show // 用于日期显示 字符串
      }

      if (!this.paramsValidate()) return

      this.$axios.post('/api/post/timepoint/new', {
        title: that.title,
        content: that.content,
        year: Number(year),
        month: Number(month),
        day: Number(day),
        show: showObject,
        tag: JSON.stringify(that.tagValue),
        supplement: that.citations
      }).then(res => {
        switch (res.data.code) {
          case 100: {
            that.$message({
              message: '添加成功',
              type: 'success'
            })
            setTimeout(() => {
              that.$router.push(`/timeline/${res.data.new_post_id}`)
              that.$axios.get('/api/timepoint/list').then(res => {
                if (res.data.code === 100) {
                  let timeline = res.data.data
                  timeline = timeline.map(time => {
                    if (typeof time.show === 'object') {
                      const { show } = time.show
                      if (show) {
                        time.show = time.show.show
                      } else {
                        time.show = time.show.date
                      }
                    }
                    return time
                  })
                  that.$store.commit('updateTimeline', timeline)
                }
              })
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
    dateTypeChange () {
      this.dateType = this.dateValue.reduce((acc, cur) => {
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
      this.date_30 = 0
    },
    citationSubmit () {
      this.$refs[this.activeName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          const newCitation = {
            type: this.activeName,
            content: clone(this[this.activeName])
          }
          if (this.citationOperationType === 'edit') {
            this.citations[this.citationOperationIndex] = newCitation
          } else {
            this.citations.push(newCitation)
          }
        } else {
          this.$message.error('请补全内容！')
          return false
        }
      })
      // switch (this.activeName) {
      //   case 'internetResource': {
      //     newCitation = {
      //       type: 'internetResource',
      //       content: clone(this.internetResource)
      //     }
      //     break
      //   }
      //   case 'bookResource': {
      //     newCitation = {
      //       type: 'bookResource',
      //       content: clone(this.bookResource)
      //     }
      //     break
      //   }
      //   case 'otherResource': {
      //     newCitation = {
      //       type: 'otherResource',
      //       content: clone(this.otherResource)
      //     }
      //     break
      //   }
      //   default: {}
      // }
    },
    addCitation () {
      this.dialogFormVisible = true
      this.citationOperationType = 'add'
    },
    editCitation (index) {
      this.citationOperationType = 'edit'
      this.citationOperationIndex = index
      this.activeName = this.citations[index].type
      this.dialogFormVisible = true
      this[this.activeName] = clone(this.citations[index].content)
    },
    deleteCitation (index) {
      this.citations.splice(index, 1)
    },
    // 提交参数验证，返回布尔值
    paramsValidate () {
      if (this.citations.length === 0) {
        this.$message.error('至少添加一个参考文献！')
        return false
      }
      return true
    }
  },
  created () {
    this.dateInitialize()
  }
}
</script>

<style scoped>
.container-add{
  width: 90%;
  margin: 0 auto;
  min-width: 720px;
}
.el-input{
  margin: 10px 0;
}
.submit{
  margin-top: 10px;
}
.date{
  text-align: left;
}
.date-format{
  display: flex;
  align-items: center;
}
.date .el-cascader{
  margin-right: 20px;
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
.citation .title{
  color: black;
  font-weight: normal;
  font-size: 15px;
}
.citation .url-preview{
  display: flex;
  align-items: center;
}
.citation .url-preview a{
  padding-left: 5px;
}
.citation-list{
  text-align: left;
  color: gray;
}
.citation-list a{
  color: gray;
}
.citation-item{
  display: flex;
}
.citation-item i{
  margin-left: 10px;
}
.citation-list .title{
  font-weight: bold;
}
.citation-list a{
  text-decoration: none;
}
.citation a:hover{
  text-decoration-line: underline;
}
.citation-date{
  font-size: 15px;
  color: gray;
}
.el-dialog{
  margin: 0;
}
</style>
