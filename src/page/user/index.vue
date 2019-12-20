<template>
  <div class="container-user">
    <el-tabs :tab-position="'left'">
      <el-tab-pane label="所有时间点">
        <div v-if="wikis.length">
          <el-table
            :data="wikis"
            style="width: 100%">
            <el-table-column
              prop="timestamp"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题">
            </el-table-column>
            <el-table-column
              prop="status"
              label="所处状态">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="toTimepointView(scope.$index)" type="text" size="small">查看</el-button>
                <!-- <el-button @click="toDelete(scope.$index)" type="text" size="small">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          还没有发布时间点
        </div>
      </el-tab-pane>
      <el-tab-pane label="词条管理" v-if="this.$store.state.userGroup.includes('admin')">
        {{ messages.length === 0 ? "暂无通知" : messages }}
      </el-tab-pane>
      <el-tab-pane label="站内私信">
        <WriteMessage></WriteMessage>
      </el-tab-pane>
      <el-tab-pane label="我的消息">
        <Messages></Messages>
      </el-tab-pane>
      <el-tab-pane label="登出">
        <el-button @click="logout()">登出</el-button>
      </el-tab-pane>
    </el-tabs>
    <div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import WriteMessage from '@/components/WriteMessage'
import Messages from '@/components/Messages'

export default {
  data () {
    return {
      wikis: []
    }
  },
  components: {
    WriteMessage,
    Messages
  },
  methods: {
    getWikis: function () {
      const that = this
      this.$axios.get('/api/user/getPostList').then(res => {
        that.wikis = res.data.data
        that.wikis = that.wikis.map(wiki => {
          // wiki.timestamp = parseDate(wiki.timestamp * 1000) // 单位 s -> ms
          wiki.timestamp = dayjs(wiki.timestamp * 1000).format('YYYY-MM-DD HH:mm')
          return wiki
        })
        // wiki 所处状态 wiki.status delete publish revision
        // that.wikis = that.wikis.filter(wiki => {
        //   return (wiki.status === 'publish' || wiki.status === 'revision')
        // })
        const wikiStatusTable = {
          publish: '发表中',
          delete: '已删除',
          revision: '已更新'
        }
        for (let i = that.wikis.length - 1; i >= 0; i--) {
          const status = that.wikis[i].status
          that.wikis[i].status = wikiStatusTable[status]
        }
        that.wikis = that.wikis.reverse()
      })
    },
    logout () {
      const that = this
      this.$axios.get('/api/user/logout').then(() => {
        that.$store.commit('logout')
        that.$router.push('/timeline')
      })
      this.$message.success('登出成功')
    },
    toTimepointView (index) {
      const id = this.wikis[index]._id
      this.$router.push(`/timeline/${id}`)
    },
    toDelete (index) {
      const id = this.wikis[index]._id
      const that = this
      this.$axios.get(`/api/user/delPost/${id}`).then(res => {
        switch (res.data.code) {
          case 100: {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getWikis()
            break
          }
          default: {
            that.$message.error('删除失败')
          }
        }
      })
    }
  },
  created () {
    this.getWikis()
  },
  computed: {
    messages () {
      return this.$store.state.messages
    }
  }
}
</script>

<style scoped>
.el-menu{
  width: 200px;
}
.container-user{
  min-width: 720px;
}
.messages{
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  margin-top: 10px;
}
.wikis{
  margin-top: 10px;
}
.el-card{
  margin-bottom: 10px;
}
a{
  text-decoration: none;
}
</style>
