<template>
  <div
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    class="container">
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
        <div class="threads">
          <div class="threads-title">
            <span class="mark">
              历史分析
            </span>
            <router-link v-if="threads.length > 2" :to="{ path: '/discuss', query: { timepointId: this.$route.params.id } }" class="threads-more">
              查看更多
            </router-link>
            <router-link v-if="threads.length === 0" :to="{ name: 'discussAdd', path: '/discuss/add', params: {timepoints: [{
              id: this.$route.params.id,
              title: timepoint.title
            }]}}" class="threads-more">
              前往发表
            </router-link>
          </div>
          <div v-if="threads.length === 0" class="threads-empty">
            暂无文章！
          </div>
          <div v-else>
            <div v-for="(thread, index) in threads.slice(0, 2)" :key="index" class="threads-thread">
              <router-link :to="`/discuss/${thread._id}`">
                <el-card
                  :body-style="{padding: '5px', backgroundColor: 'rgb(250, 250, 250)'}"
                  shadow="hover"
                >
                  <span style="color: #606266;">{{ thread.title }}</span>
                </el-card>
              </router-link>
            </div>
         </div>
       </div>
        <div class="last-edited-user">
          创建者：<span v-html="timepoint.creator"></span>
        </div>
        <div class="last-edited-user">
          最后编辑者：<span v-html="timepoint.lastEditedUser"></span>
        </div>
      </div>
      <PrevAndNext :id="timepoint.id"></PrevAndNext>
    </div>
    <div v-else style="margin-top: 20px;">
      <a href="/">返回首页</a>
    </div>
    <Footer style="margin-top: auto;"/>
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
      loading: true,
      threads: []
    }
  },
  components: {
    Toolbar,
    PrevAndNext,
    Footer,
    Citation,
    Tags
  },
  async created () {
    const timepointId = await this.getTimepointId()
    await this.updateContent()
    const threads = await this.getThreadsByTimepointId(timepointId)
    this.threads = threads
  },
  watch: {
    async $route (to, from) {
      if (to.name !== 'TimelineView') {
        return
      }
      this.updateContent()
      const timepointId = to.params.id
      const threads = await this.getThreadsByTimepointId(timepointId)
      this.threads = threads
    }
  },
  methods: {
    async getTimepointId () {
      return this.$route.params.id
    },
    async updateContent () {
      try {
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
      } catch (err) {
        this.$message.error('资源请求出错！')
        console.error(err)
      }
    },
    async getThreadsByTimepointId (timepointId) {
      const res = await this.$axios.get(`/api/discuss/getThreadsList/${timepointId}`)
      const { threads } = await res.data.data

      const filterdThreads = threads.filter(thread => thread.status === 'publish')

      return filterdThreads
    }
  }
}
</script>

<style scoped>
@media (min-width: 720px) {
  .content {
    width: 90%;
    margin: 0 auto;
    word-break: break-all;
    box-sizing: border-box;
    text-align: left;
    padding: 15px;
  }
}

@media (max-width: 720px) {
  .content {
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

.el-tooltip {
  margin-left: 10px;
}

.title {
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
}

.el-divider {
  margin: 0;
}

.content .last-edited-user {
  text-align: right;
  color: lightgray;
}

.nationality-inventor span {
  padding-right: 10px;
}

.threads {
  border-radius: 10px;
  margin-top: 20px;
}

.threads:not(:hover) {
  opacity: 0.8;
}

.threads-title {
  margin-bottom: 10px;
}

.threads-more {
  font-size: 12px;
}

.threads-empty {
  font-size: 14px;
}

.threads-thread a {
  text-decoration: none;
}

.mark {
  position: relative;
}

.mark::before {
  content: '';
  border-left: 4px solid #409eff;
  position: absolute;
  height: 100%;
  left: -10px;
}
</style>

<style>
.content img {
  max-width: 100%;
}
</style>
