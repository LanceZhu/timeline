<template>
  <div class="citation">
    <el-button v-if="editable" type="text" @click="addCitation()">
      <span class="title el-icon-caret-right">添加参考文献</span>
      <i class="el-icon-document-add" style="margin-left: 10px"></i>
    </el-button>
    <el-dialog title="添加参考资料" :visible.sync="dialogFormVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="网络资源" name="internetResource">
          <el-form
            :model="internetResource"
            label-position="right"
            :rules="internetResourceRules"
            ref="internetResource"
          >
            <el-form-item label="文章名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="internetResource.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="网站链接" :label-width="formLabelWidth" prop="url">
              <div class="url-preview">
                <el-input v-model="internetResource.url" autocomplete="off"></el-input>
                <a :href="internetResource.url" target="_blank">
                  <i class="el-icon-view"></i>
                </a>
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
          <el-form
            :model="bookResource"
            label-position="right"
            :rules="bookResourceRules"
            ref="bookResource"
          >
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
        <el-tab-pane label="论文资源" name="thesis">
          <el-form
          :model="thesis"
          label-position="right"
          :rules="thesisRules"
          ref="thesis">
            <el-form-item label="论文资源" :label-width="formLabelWidth" prop="content">
              <div>
                <el-input
                  v-model="thesis.content"
                  placeholder="例：常文涛,陈雨薇.人民币汇率对CPI的传递效应及互动关系研究[J/OL].统计与决策,2020(09):129-133[2020-06-07].https://doi.org/10.13546/j.cnki.tjyjc.2020.09.027."></el-input>
                <span style="font-size: 12px; color: gray">填写格式请参阅《文后参考文献著录规则 GB/T 7714-2005》</span>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="其他资源" name="otherResource">
          <el-form
          :model="otherResource"
          label-position="right"
          ref="otherResource"
          :rules="otherResourceRules">
            <el-form-item label="其他资源" :label-width="formLabelWidth" prop="any">
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
    <div class="citation-list" v-if="!!citations.length">
      <div class="citation-title">文献列表：</div>
      <div v-for="(citation, index) in citations" :key="index" class="citation-item">
        <div v-if="citation.type === 'internetResource'">
          <!-- <div class="citation-title">网络资源</div> -->
            <div>
              {{index + 1}}.
              <a v-if="citation.content.name !== ''" :href="citation.content.url" target="_blank">{{ ` ${citation.content.name} ` }}<i class="el-icon-view"></i></a>
              <span v-if="citation.content.websiteName !== ''">{{citation.content.websiteName}}</span>
              <span class="citation-date">
                <span v-if="citation.content.publishDate !== '' ">{{  ` [${citation.content.publishDate}]` }}</span>
                <span v-if="citation.content.citationDate !== ''">{{ `(引用日期: ${citation.content.citationDate})` }}</span>
              </span>
            </div>
        </div>
        <div v-else-if="citation.type === 'bookResource'">
          <!-- <div class="citation-title">著作资源</div> -->
            <div>
              {{index + 1}}.
              <span v-if="citation.content.author !== ''">{{ `作者：${citation.content.author} ` }}</span>
              <span v-if="citation.content.paperName !== ''">{{ `著作名：${citation.content.paperName} ` }}</span>
              <span v-if="citation.content.publishAddress !== ''">{{ `出版地：${citation.content.publishAddress} ` }}</span>
              <span v-if="citation.content.publishPress !== ''">{{ `出版社：${citation.content.publishPress} ` }}</span>
              <span v-if="citation.content.publishYear !== ''">{{ `出版年：${citation.content.publishYear} ` }}</span>
              <span v-if="citation.content.pageRange !== ''">{{ `引文页码：${citation.content.pageRange}` }}</span>
            </div>
        </div>
        <div v-else-if="citation.type === 'otherResource'">
          <!-- <div class="citation-title">其他资源</div> -->
          <div v-if="citation.content.any !== ''">
            {{index + 1}}.{{`${citation.content.any}`}}</div>
          </div>
        <div v-else-if="citation.type === 'thesis'">
          <div v-if="citation.content.content !== ''">
            {{ index + 1 }}.{{ `${citation.content.content}` }}
          </div>
        </div>
        <div v-else>
          <div>格式错误</div>
        </div>
        <i class="el-icon-delete" @click="deleteCitation(index)" v-if="editable"></i>
        <i class="el-icon-edit" @click="editCitation(index)" v-if="editable"></i>
      </div>
    </div>
  </div>
</template>

<script>
import clone from 'lodash/clone'
import dayjs from 'dayjs'

export default {
  name: 'Citation',
  data () {
    return {
      dialogFormVisible: false, // 添加文献模态框
      citationOperationType: 'add', // 文献操作类型 add edit
      citationOperationIndex: undefined, // 进行修改的文献索引
      formLabelWidth: '80px',
      internetResource: {
        name: '',
        url: '',
        websiteName: '',
        publishDate: '',
        citationDate: dayjs().format('YYYY-MM-DD')
      },
      internetResourceRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输网站链接', trigger: 'blur' }],
        websiteName: [
          { required: false, message: '请输入网站名称', trigger: 'blur' }
        ],
        publishDate: [
          { required: false, message: '请输入发表日期', trigger: 'blur' }
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
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        paperName: [
          { required: true, message: '请输入文章名', trigger: 'blur' }
        ],
        publishAddress: [
          { required: false, message: '请输入出版地址', trigger: 'blur' }
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
      otherResourceRules: {
        any: [{
          required: true, message: '请添加相关描述', trigger: 'blur'
        }]
      },
      // 论文资源
      thesis: {
        content: ''
      },
      thesisRules: {
        content: [{
          required: true, message: '请添加所引论文', trigger: 'blur'
        }]
      },
      activeName: 'internetResource',
      citations: []
    }
  },
  props: {
    defaultCitations: {
      type: Array
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    defaultCitations: function (newV, oldV) {
      this.citations = newV
    }
  },
  methods: {
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
    getData () {
      // if (this.citations.length === 0) {
      //   const errMsg = '至少添加一个参考文献！'
      //   this.$message.error(errMsg)
      //   throw new Error(errMsg)
      // }
      return this.citations
    }
  }
}
</script>

<style scoped>
.citation{
  margin-top: 10px;
  text-align: left;
}
.citation .title{
  font-size: 16px;
  color: black;
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
  text-decoration: none;
}
.citation-list .title{
  font-weight: bold;
}
.citation-list a{
  text-decoration: none;
}
.citation-item{
  display: flex;
  align-items: center;
}
.citation-item i{
  margin-left: 10px;
}
.citation-item i:hover{
  cursor: pointer;
}
.citation a:hover{
  text-decoration-line: underline;
}
.citation-date{
  font-size: 15px;
  color: gray;
}
</style>
