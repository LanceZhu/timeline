<template>
<div>
  <div class="title">
    {{title}}
    <router-link :to="'/timepoint/edit/' + id" tag="li">
      <el-tooltip content="编辑词条" popper-class="tooltip">
        <i class="el-icon-edit"></i>
      </el-tooltip>
    </router-link>
    <router-link :to="'/timepoint/history/' + id" tag="li">
      <el-tooltip content="词条历史" popper-class="tooltip">
        <i class="el-icon-time"></i>
      </el-tooltip>
    </router-link>
    <!--
    <router-link :to="'/timepoint/history/'+id" tag="li">
      <i class="el-icon-warning"></i>
    </router-link>
    -->
    <!--
    <router-link>
      <i class="el-icon-chat-line-round"></i>
    </router-link>
    -->
  <el-divider></el-divider>
  </div>
  <div v-html="content" ref="content" class="content"></div>
  <div v-if="hasTag" class="tags">
    <el-tooltip effect="dark" :content="tag.desc">
      <el-tag>{{ tag.label }}</el-tag>
    </el-tooltip>
  </div>
  <div v-if="lastEditedUser !== ''" class="last-edited-user">
    编辑者：<span v-html=lastEditedUser></span>
  </div>
  <div class="footer">
      <div v-if="prev.show" class="prev">
        <router-link :to="prev.route" tag="li">
            <i class="el-icon-back"></i>
            {{prev.desc}}
        </router-link>
      </div>
    <div v-if="next.show" class="next">
      <router-link :to="next.route" tag="li">
        {{next.desc}}
        <i class="el-icon-right"></i>
      </router-link>
    </div>
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
      tagTable: {}, // value -> tag
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
      }
    }
  },
  created () {
    this.tagTable = config.tagTable
    this.updateContent()
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
        const { content, title, _id, owner, tag = '' } = res.data.data.post
        that.content = content
        that.title = title
        that.id = _id
        that.lastEditedUser = owner
        if (tag !== '' && JSON.parse(tag).length !== 0) {
          const tagNumber = JSON.parse(tag).reduce((acc, cur) => {
            acc += cur
            return acc
          }, 0)
          that.tag = that.tagTable[tagNumber]
          that.hasTag = true
        }
        const { timeline = [] } = that.$store.state
        that.prev.show = true
        that.next.show = true

        // 获取当前时间点前后词条
        for (let i = (timeline.length - 1); i >= 0; i--) {
          if (timeline[i]._id === that.id) {
            if (i === 0) {
              that.prev.show = false
            }
            if (i === (timeline.length - 1)) {
              that.next.show = false
            }
            that.prev.desc = i > 0 ? timeline[i - 1].title : '已无时间点'
            that.next.desc = i < (timeline.length - 1) ? timeline[i + 1].title : '已无时间点'
            that.prev.route = i > 0 ? `/timeline/${timeline[i - 1]._id}` : '/timeline'
            that.next.route = i < (timeline.length - 1) ? `/timeline/${timeline[i + 1]._id}` : '/timeline'
            break
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.title{
  position: sticky;
  top: 0;
  background-color: white;
  height: 48px;
  line-height: 48px;
}
.el-divider{
  margin: 0;
}
.content{
  width: 90%;
  margin: 0 auto;
  word-break: break-all;
  box-sizing: border-box;
  padding: 15px 0;
  text-align: left;
}
.tags{
  width: 90%;
  float: left;
  text-align: left
}
.last-edited-user{
  width: 90%;
  margin: 0 auto;
  word-break: break-all;
  box-sizing: border-box;
  padding: 15px 0 40px 0;
  text-align: right;
  color: rgb(254,149,170);
}
.footer{
  width: 90%;
  margin: 0 auto;
  color: rgb(49,151,230);
}
.footer .prev{
  float: left;
}
.footer .next{
  float: right;
}
li{
  display: inline-block;
  cursor: pointer;
}
.el-tooltip{
  margin-left: 10px;
}
.el-tooltip__popper[x-placement^=bottom] .popper__arrow::after {
  border-bottom-color: rgb(160,192,227) !important;
  opacity: 0.8;
}
.el-tooltip__popper[x-placement^=bottom] .popper__arrow{
  border-bottom-color: rgb(160,192,227) !important;
  opacity: 0.8;
}
</style>
