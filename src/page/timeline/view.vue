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
      <el-tooltip content="举报该词条" popper-class="tooltip">
        <i class="el-icon-warning-outline" @click="showFeedback = true"></i>
      </el-tooltip>
      <el-dialog title="举报该词条" :visible.sync="showFeedback" :append-to-body="true">
        <el-form>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="feedback.comment"
              maxlength="50"
              show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFeedback()">提交反馈</el-button>
            <el-button @click="showFeedback = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    <el-divider></el-divider>
    </div>
    <div class="content">
      <div v-html="content" ref="content" class="article"></div>
        <div v-if="hasTag" class="tags">
          <el-tooltip :content="tag.desc" popper-class="tooltip" placement="right-start">
            <el-tag>{{ tag.label }}</el-tag>
          </el-tooltip>
        </div>
        <div class="citation-list">
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
          编辑者：<span v-html=lastEditedUser></span>
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
import config from '../../../config'

export default {
  data () {
    return {
      content: '',
      title: '',
      id: '',
      tag: {}, // {label: '名称', desc: '描述'}
      hasTag: false,
      tagTable: config.tagTable, // value -> tag
      lastEditedUser: '', // 最后编辑用户
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
        type: 'complain',
        target_id: '',
        comment: ''
      }
    }
  },
  created () {
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
        const { content, title, _id, owner, tag = '', supplement } = res.data.data.post
        that.content = content
        that.title = title
        that.id = _id
        that.$axios.get(`/api/user/getNickname?uid=${owner}`).then(res => {
          if (res.data.code === 100) {
            that.lastEditedUser = res.data.nickname
          } else {
            that.lastEditedUser = owner
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
    submitFeedback () {
      const that = this
      this.feedback.target_id = this.id
      this.$axios.post('/api/user/makeReq', that.feedback).then(res => {
        if (res.data.code === 100) {
          that.$message({
            type: 'success',
            message: '反馈成功，管理员会及时处理！'
          })
          setTimeout(() => {
            that.showFeedback = false
          }, 1500)
        } else {
          that.$message.error('反馈失败！')
        }
      })
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
</style>
