<template>
  <div>
    <div class="title">
      {{title}}
      <router-link :to="id + '/edit'" tag="li">
        <el-tooltip content="编辑词条" popper-class="tooltip">
          <i class="el-icon-edit"></i>
        </el-tooltip>
      </router-link>
      <router-link :to="id + '/history'" tag="li">
        <el-tooltip content="词条历史" popper-class="tooltip">
          <i class="el-icon-time"></i>
        </el-tooltip>
      </router-link>
      <span v-if="!this.showDelete">
        <el-tooltip content="删除该词条" popper-class="tooltip">
        <i class="el-icon-delete" @click="showFeedback = true; feedback.type='delete'; feedback.title='删除理由：'"></i>
      </el-tooltip>
      <el-tooltip content="举报该词条" popper-class="tooltip">
        <i class="el-icon-warning-outline" @click="showFeedback = true; feedback.type='complain'; feedback.title='举报理由：'"></i>
      </el-tooltip>
      <el-dialog :title="this.feedback.title" :visible.sync="showFeedback" :append-to-body="true">
        <el-form>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="feedback.comment"
              maxlength="50"
              :autosize="{ minRows: 3, maxRows: 4}"
              show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFeedback()">提交反馈</el-button>
            <el-button @click="showFeedback = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      </span>
      <el-tooltip content="删除该词条" popper-class="tooltip" v-if="this.showDelete">
        <i class="el-icon-delete" @click="deleteTimepoint"></i>
      </el-tooltip>
    <el-divider></el-divider>
    </div>
    <div class="content">
      <div v-if="showObject.showNationalityAndInventor" class="nationality-inventor">
        <div>发明人：{{ ruleForm.inventor }}</div>
        <div>发明国家：{{ ruleForm.nationality }}</div>
      </div>
      <div v-html="content" ref="content" class="article"></div>
        <div v-if="hasTag" class="tags">
          <el-tooltip :content="tag.desc" popper-class="tooltip" placement="right-start">
            <el-tag>{{ tag.label }}</el-tag>
          </el-tooltip>
        </div>
        <div class="citation-list">
          <div>文献列表：</div>
          <div v-for="(citation, index) in citations" :key="index">
            <div v-if="citation.type === 'internetResource'">
              <!-- <div class="citation-title">网络资源</div> -->
                <div>
                  {{index + 1}}.<a :href="citation.content.url" target="_blank">{{ ` ${citation.content.name} ` }}<i class="el-icon-view"></i></a>
                  <span>{{citation.content.websiteName}}</span>
                  <span class="citation-date">{{` [${citation.content.publishDate}](引用日期: ${citation.content.citationDate})`}}</span>
                </div>
            </div>
            <div v-else-if="citation.type === 'bookResource'">
              <!-- <div class="citation-title">著作资源</div> -->
                <div>
                  {{index + 1}}.{{`作者：${citation.content.author} 著作名：${citation.content.paperName} 出版地：${citation.content.publishAddress} 出版社：${citation.content.publishPress} 出版年：${citation.content.publishYear} 引文页码：${citation.content.pageRange}`}}</div>
            </div>
            <div v-else-if="citation.type === 'otherResource'">
              <!-- <div class="citation-title">其他资源</div> -->
              <div>
                {{index + 1}}.{{`${citation.content.any}`}}</div>
            </div>
          </div>
        </div>
        <div class="last-edited-user">
          创建者：<span v-html="creator"></span>
        </div>
        <div class="last-edited-user">
          最后编辑者：<span v-html="lastEditedUser"></span>
        </div>
    </div>
    <div class="footer">
      <div v-if="prevUpdated.show" class="prev">
        <router-link :to="prevUpdated.route" tag="li">
            <i class="el-icon-back"></i>
            {{prevUpdated.desc}}
        </router-link>
      </div>
      <div v-if="nextUpdated.show" class="next">
        <router-link :to="nextUpdated.route" tag="li">
          {{nextUpdated.desc}}
          <i class="el-icon-right"></i>
        </router-link>
      </div>
    </div>
    <div class="feedback">
      <el-divider></el-divider>
      遇到问题请联系：ee_chronicle2019@163.com
      <!-- <a href="mailto:ee_chronicle2019@163.com">ee_chronicle2019@163.com</a> -->
    </div>
  </div>
</template>

<script>
import customizeViewByMode from '../../utils/customizeViewByMode'
import config from '../../../config'
import updateTimeline from '../../utils/updateTimeline'

export default {
  data () {
    return {
      showObject: {},
      ruleForm: {},
      content: '',
      title: '',
      id: '',
      tag: {}, // {label: '名称', desc: '描述'}
      hasTag: false,
      tagTable: config.tagTable, // value -> tag
      lastEditedUser: '', // 最后编辑用户
      creator: '', // 词条最初创建者
      prev: {
        desc: '前一页',
        show: true,
        route: '/timeline'
      },
      next: {
        desc: '后一页',
        show: true,
        route: '/timeline'
      },
      citations: [],
      showFeedback: false,
      feedback: {
        title: '举报该词条',
        type: 'complain',
        target_id: '',
        comment: ''
      }
    }
  },
  created () {
    customizeViewByMode.bind(this)()
    this.updateContent()
  },
  computed: {
    prevUpdated () {
      const { timeline = [] } = this.$store.state
      const prevUpdated = {
        desc: '前一页',
        show: true,
        route: '/timeline'
      }

      // 获取当前时间点前后词条
      for (let i = (timeline.length - 1); i >= 0; i--) {
        if (timeline[i]._id === this.id) {
          if (i === 0) {
            prevUpdated.show = false
          }
          prevUpdated.desc = i > 0 ? timeline[i - 1].title : '已无时间点'
          prevUpdated.route = i > 0 ? `/timeline/${timeline[i - 1]._id}` : '/timeline'
          break
        }
      }
      return prevUpdated
    },
    nextUpdated () {
      const { timeline = [] } = this.$store.state
      const nextUpdated = {
        desc: '后一页',
        show: true,
        route: '/timeline'
      }

      // 获取当前时间点前后词条
      for (let i = (timeline.length - 1); i >= 0; i--) {
        if (timeline[i]._id === this.id) {
          if (i === (timeline.length - 1)) {
            nextUpdated.show = false
          }
          nextUpdated.desc = i < (timeline.length - 1) ? timeline[i + 1].title : '已无时间点'
          nextUpdated.route = i < (timeline.length - 1) ? `/timeline/${timeline[i + 1]._id}` : '/timeline'
          break
        }
      }
      return nextUpdated
    },
    // 显示管理员删除词条 icon
    showDelete: function () {
      return this.$store.state.userGroup.includes('admin')
    }
  },
  watch: {
    $route (to, from) {
      this.updateContent()
    }
  },
  methods: {
    updateContent () {
      const that = this
      that.hasTag = false
      this.$axios.get(`/api/timepoint/show/${this.$route.params.id}`).then(res => {
        const { content, title, _id, owner, tag = '', supplement, create_owner: createOwner, nationality, inventor } = res.data.data.post
        that.content = content
        that.title = title
        that.id = _id
        Object.assign(that.ruleForm, {
          nationality: [null, undefined].includes(nationality) ? '不详' : nationality,
          inventor: [null, undefined].includes(inventor) ? '不详' : inventor
        })
        that.$axios.get(`/api/user/getNickname?uid=${owner}`).then(res => {
          if (res.data.code === 100) {
            that.lastEditedUser = res.data.nickname
          } else {
            that.lastEditedUser = owner
          }
        })
        that.$axios.get(`/api/user/getNickname?uid=${createOwner}`).then(res => {
          if (res.data.code === 100) {
            that.creator = res.data.nickname
          } else {
            that.creator = createOwner
          }
        })
        that.citations = supplement
        if (tag !== '' && JSON.parse(tag).length !== 0) {
          const tagNumber = JSON.parse(tag).reduce((acc, cur) => {
            acc += cur
            return acc
          }, 0)
          that.tag = that.tagTable[tagNumber]
          that.hasTag = true
        }
      })
    },
    async submitFeedback () {
      this.feedback.target_id = this.id
      const { type = 'complain', target_id: targetId = '', comment = '' } = this.feedback
      const feedback = {
        type,
        target_id: targetId,
        comment
      }
      try {
        const res = await this.$axios.post('/api/user/makeReq', feedback)
        if (res.data.code === 100) {
          this.$message({
            type: 'success',
            message: '反馈成功，管理员会及时处理！'
          })
          setTimeout(() => {
            this.showFeedback = false
          }, 1500)
        } else {
          this.$message.error('反馈失败！')
        }
      } catch (err) {
        this.$message.error('反馈失败！')
      }
    },
    async deleteTimepoint () {
      try {
        await this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        const res = await this.$axios.get(`/api/admin/delPost/${this.id}`)
        if (res.data.code === 100) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          setTimeout(async () => {
            await updateTimeline()
            this.$router.push('/timeline')
          }, 1000)
        } else {
          this.$message.error('操作失败！')
        }
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    }
  }
}
</script>

<style scoped>
@media (min-width: 720px) {
  .content{
    width: 90%;
    margin: 0 auto;
    word-break: break-all;
    box-sizing: border-box;
    text-align: left;
    padding: 15px;
  }
}
@media (max-width: 720px) {
  .content{
    width: 100%;
    margin: 0 auto;
    word-break: break-all;
    box-sizing: border-box;
    text-align: left;
    padding: 15px;
  }
}
li{
  display: inline-block;
  cursor: pointer;
}
.el-tooltip{
  margin-left: 10px;
}
.title{
  background-color: white;
  height: 48px;
  line-height: 48px;
}
.title .el-divider{
  margin: 0;
}
.content .article{}
.content .tags{
  display: flex;
  justify-content: flex-start;
}
.content .citation-list{
  margin-top: 20px;
  text-align: left;
  color: gray;
}
.citation-list a{
  color: gray;
  text-decoration: none;
}
.citation-list a:hover{
  text-decoration-line: underline;
}
.citation-title{
  font-weight: bold;
}
.citation-date{
  font-size: 15px;
  color: gray;
}
.content .last-edited-user{
  text-align: right;
  color: lightgray;
}
.footer{
  width: 90%;
  margin: 0 auto;
  color: rgb(49,151,230);
  height: 25px;
  margin-bottom: 15px;
}
.footer .prev{
  float: left;
}
.footer .next{
  float: right;
}
.feedback{
  color: gray;
}
.feedback a{
  color: gray;
}
.nationality-inventor span{
  padding-right: 10px;
}
</style>
