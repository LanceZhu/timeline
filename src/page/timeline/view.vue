<template>
  <div>
    <div class="title">
      <span>{{title}}</span>
      <Toolbar :id="id"></Toolbar>
    </div>
    <el-divider></el-divider>
    <div class="content" v-loading="loading">
      <div v-if="this.$view.showNationalityAndInventor" class="nationality-inventor">
        <div>发明人：{{ ruleForm.inventor }}</div>
        <div>发明国家：{{ ruleForm.nationality }}</div>
      </div>
      <div v-html="content" ref="content" class="article"></div>
        <Tags :defaultTagsChoosed="tags"></Tags>
        <Citation :defaultCitations="this.citations"></Citation>
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
import config from '../../../config'

const Toolbar = () => import('./components/Toolbar')
const PrevAndNext = () => import('./components/PrevAndNext')
const Footer = () => import('../../components/Footer')
const Citation = () => import('@/components/Citation')
const Tags = () => import('@/components/Tags')

export default {
  data () {
    return {
      ruleForm: {},
      content: '',
      title: '',
      id: '',
      tags: [], // ['标签1', '标签2']
      hasTag: false,
      lastEditedUser: '', // 最后编辑用户
      creator: '', // 词条最初创建者
      citations: [],
      loading: true
    }
  },
  components: {
    Toolbar,
    PrevAndNext,
    Footer,
    Citation,
    Tags
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
          // that.tags = tag.reduce((acc, cur) => {
          //   const { path, pathLabels } = cur
          //   const tag = {
          //     label: pathLabels.join('/'),
          //     value: path[path.length - 1] || ''
          //   }
          //   acc.push(tag)
          //   return acc
          // }, [])
          that.tags = tag
          that.hasTag = true
        } catch (err) {
          console.error(err)
        }
      })
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
