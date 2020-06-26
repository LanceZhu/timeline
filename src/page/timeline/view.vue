<template>
  <div v-loading="loading" class="container">
    <el-alert
      v-if="timepoint.status.visible"
      :title="timepoint.status.tip"
      type="info"
      center
      :closable="false"
      show-icon>
    </el-alert>
    <div v-if="timepoint.visible">
      <div class="title">
        <span>{{timepoint.title}}</span>
        <Toolbar :id="timepoint.id"></Toolbar>
      </div>
      <el-divider></el-divider>
      <div class="content">
        <div v-if="this.$view.showNationalityAndInventor" class="nationality-inventor">
          <div>发明人：{{ timepoint.inventor }}</div>
          <div>发明国家：{{ timepoint.nationality }}</div>
        </div>
        <div v-html="timepoint.content" ref="content" class="article"></div>
        <Tags :defaultTagsChoosed="timepoint.tags"></Tags>
        <Citation :defaultCitations="timepoint.citations"></Citation>
        <div class="last-edited-user">
          创建者：<span v-html="timepoint.creator"></span>
        </div>
        <div class="last-edited-user">
          最后编辑者：<span v-html="timepoint.lastEditedUser"></span>
        </div>
      </div>
      <div class="toolbar">
        <el-divider></el-divider>
        <Rating :timepointID="this.$route.params.id"></Rating>
      </div>
      <PrevAndNext :id="timepoint.id"></PrevAndNext>
    </div>
    <div v-else style="margin-top: 20px">
      <a href="/">返回首页</a>
    </div>
    <Footer style="margin-top: auto"/>
  </div>
</template>

<script>
import config from '../../../config'
import TIMEPOINT_STATUS from '@/constant/TimepointStatus'

const Toolbar = () => import('./components/Toolbar')
const PrevAndNext = () => import('./components/PrevAndNext')
const Footer = () => import('../../components/Footer')
const Citation = () => import('@/components/Citation')
const Tags = () => import('@/components/Tags')
const Rating = () => import('@/components/Rating')

export default {
  data () {
    return {
      timepoint: {
        visible: true,
        id: '',
        status: {
          visible: false,
          tip: ''
        },
        title: '',
        content: '',
        tags: [], // ['标签1', '标签2']
        citations: [],
        lastEditedUser: '', // 最后编辑用户
        creator: '' // 词条最初创建者
      },
      loading: true
    }
  },
  components: {
    Toolbar,
    PrevAndNext,
    Footer,
    Citation,
    Tags,
    Rating
  },
  created () {
    this.updateContent()
  },
  watch: {
    $route (to, from) {
      this.updateContent()
    }
  },
  methods: {
    async updateContent () {
      this.loading = true
      const res = await this.$axios.get(`/api/timepoint/show/${this.$route.params.id}`)
      if (res.data.code !== 100) {
        Object.assign(this.timepoint, {
          status: {
            visible: true,
            tip: '该词条不存在'
          },
          visible: false
        })
        this.loading = false
        return
      }
      const { content, title, _id, owner, tag = [], supplement, create_owner: createOwner, nationality, inventor, status } = res.data.data.post

      const statusVisible = (status !== 'publish')
      let statusTip = ''
      if (statusVisible) {
        statusTip = TIMEPOINT_STATUS[status] || '该词条不存在'
      }
      Object.assign(this.timepoint, {
        nationality: [null, undefined].includes(nationality) ? '不详' : nationality,
        inventor: [null, undefined].includes(inventor) ? '不详' : inventor
      })
      const lastEditedUser = await this.$api.getNickname(owner) || owner
      const creator = await this.$api.getNickname(createOwner) || createOwner

      Object.assign(this.timepoint, {
        id: _id,
        title,
        content,
        status: {
          visible: statusVisible,
          tip: statusTip
        },
        nationality: [null, undefined].includes(nationality) ? '不详' : nationality,
        inventor: [null, undefined].includes(inventor) ? '不详' : inventor,
        lastEditedUser,
        creator,
        citations: supplement,
        tags: tag,
        visible: true
      })
      this.loading = false
    }
  }
}
</script>

<style scoped>
@media (min-width: 720px) {
  .content, .toolbar{
    width: 90%;
    margin: 0 auto;
    word-break: break-all;
    box-sizing: border-box;
    text-align: left;
    padding: 15px;
  }
}
@media (max-width: 720px) {
  .content, .toolbar{
    width: 100%;
    margin: 0 auto;
    word-break: break-all;
    box-sizing: border-box;
    text-align: left;
    padding: 15px;
  }
}
.container {
  display: flex;
  flex-direction: column;
}
.el-tooltip{
  margin-left: 10px;
}
.title{
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
}
.el-divider{
  margin: 0;
}
.content .last-edited-user{
  text-align: right;
  color: lightgray;
}
.nationality-inventor span{
  padding-right: 10px;
}
</style>

<style>
.content img {
  max-width: 100%;
}
</style>
