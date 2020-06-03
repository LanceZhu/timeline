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
      <Feedback :id="id"></Feedback>
    <el-divider></el-divider>
    </div>
    <div class="content" v-loading="loading">
      <div v-if="showObject.showNationalityAndInventor" class="nationality-inventor">
        <div>发明人：{{ ruleForm.inventor }}</div>
        <div>发明国家：{{ ruleForm.nationality }}</div>
      </div>
      <div v-html="content" ref="content" class="article"></div>
        <div v-if="hasTag" class="tags">
          <el-tooltip v-for="tag in tags" v-bind:key="tag.value" :content="tag.value" popper-class="tooltip" placement="right-start">
            <el-tag>{{ tag.label }}</el-tag>
          </el-tooltip>
        </div>
        <div class="citation-list" v-if="!!citations.length">
          <div class="citation-title">文献列表：</div>
          <div v-for="(citation, index) in citations" :key="index">
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
                  <span v-in="citation.content.publishYear !== ''">{{ `出版年：${citation.content.publishYear} ` }}</span>
                  <span v-if="citation.content.pageRange !== ''">{{ `引文页码：${citation.content.pageRange}` }}</span>
                </div>
            </div>
            <div v-else-if="citation.type === 'otherResource'">
              <!-- <div class="citation-title">其他资源</div> -->
              <div v-if="citation.content.any !== ''">
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
    <PrevAndNext :id="id"></PrevAndNext>
    <Footer/>
  </div>
</template>

<script>
import customizeViewByMode from '../../utils/customizeViewByMode'
import config from '../../../config'

const Feedback = () => import('./components/Feedback')
const PrevAndNext = () => import('./components/PrevAndNext')
const Footer = () => import('../../components/Footer')

export default {
  data () {
    return {
      showObject: {},
      ruleForm: {},
      content: '',
      title: '',
      id: '',
      tags: [], // {label: '名称', value: '描述'}
      hasTag: false,
      tagTable: config.tagTable, // value -> tag
      lastEditedUser: '', // 最后编辑用户
      creator: '', // 词条最初创建者
      citations: [],
      loading: true
    }
  },
  components: {
    Feedback,
    PrevAndNext,
    Footer
  },
  created () {
    customizeViewByMode.bind(this)()
    this.updateContent()
  },
  watch: {
    $route (to, from) {
      this.updateContent()
    }
  },
  methods: {
    updateContent () {
      this.loading = true
      const that = this
      that.hasTag = false
      this.$axios.get(`/api/timepoint/show/${this.$route.params.id}`).then(res => {
        const { content, title, _id, owner, tag = [], supplement, create_owner: createOwner, nationality, inventor } = res.data.data.post
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
        try {
          that.tags = tag.reduce((acc, cur) => {
            const { path, pathLabels } = cur
            const tag = {
              label: pathLabels.join('/'),
              value: path[path.length - 1] || ''
            }
            acc.push(tag)
            return acc
          }, [])
          that.hasTag = true
        } catch (err) {
          console.error(err)
        }
      })
      console.log(that.tags)
      this.loading = false
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
  color: #333;
}
.citation-date{
  font-size: 15px;
  color: gray;
}
.content .last-edited-user{
  text-align: right;
  color: lightgray;
}
.nationality-inventor span{
  padding-right: 10px;
}
</style>
