<template>
  <div class="citation">
    <el-button type="text" @click="addCitation()">
      <i class="el-icon-document-add"></i>
      <span class="title">添加参考文献</span>
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
            <a :href="citation.content.url" target="_blank">
              {{ `${citation.content.name} ` }}
              <i class="el-icon-view"></i>
            </a>
            <span>{{citation.content.websiteName}}</span>
            <span
              class="citation-date"
            >{{` [${citation.content.publishDate}](引用日期: ${citation.content.citationDate})`}}</span>
          </div>
        </div>
        <div v-else-if="citation.type === 'bookResource'">
          <!-- <div class="title">著作资源</div> -->
          <div>{{index + 1}}.{{`作者：${citation.content.author} 著作名：${citation.content.paperName} 出版地：${citation.content.publishAddress} 出版社：${citation.content.publishPress} 出版年：${citation.content.publishYear} 引文页码：${citation.content.pageRange}`}}</div>
        </div>
        <div v-else-if="citation.type === 'otherResource'">
          <!-- <div class="title">其他资源</div> -->
          <div>{{index + 1}}.{{`其他：${citation.content.any}`}}</div>
        </div>
        <i class="el-icon-delete" @click="deleteCitation(index)"></i>
        <i class="el-icon-edit" @click="editCitation(index)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import clone from 'lodash/clone'

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
        citationDate: ''
      },
      internetResourceRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输网站链接', trigger: 'blur' }],
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
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
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
  props: {
    defaultCitations: {
      type: Array
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
      if (this.citations.length === 0) {
        const errMsg = '至少添加一个参考文献！'
        this.$message.error(errMsg)
        throw new Error(errMsg)
      }
      return this.citations
    }
  }
}
</script>

<style scoped>
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
.citation-list .title{
  font-weight: bold;
}
.citation-list a{
  text-decoration: none;
}
.citation-item{
  display: flex;
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
